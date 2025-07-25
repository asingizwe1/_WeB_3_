// voucherRoutes.js
const express = require('express');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const router = express.Router();
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

function convertUGXtoSats(ugx) {
    return Math.floor(ugx * 0.5);
}

router.post('/create-voucher', async (req, res) => {
    console.log('[CREATE-VOUCHER] method:', req.method);
    console.log('[CREATE-VOUCHER] body:', req.body);

    const { amountUGX, phoneNumber, customerEmail: rawEmail } = req.body;
    const customerEmail = rawEmail?.trim()
        ? rawEmail.trim()
        : process.env.DEFAULT_CUSTOMER_EMAIL || 'no-reply@afrirdeem.com';

    if (!phoneNumber || !amountUGX) {
        return res
            .status(400)
            .json({ error: 'phoneNumber and amountUGX are required' });
    }

    if (!customerEmail) {
        return res
            .status(400)
            .json({ error: 'customerEmail is required or DEFAULT_CUSTOMER_EMAIL must be set' });
    }

    // sanitize & fetch agent wallet
    const sanitizedPhone = phoneNumber.replace(/^(\+)?256/, '256');
    const { data: agent, error: agentErr } = await supabase
        .from('agent_wallets')
        .select('agent_phone, balance_ugx')
        .eq('agent_phone', sanitizedPhone)
        .single();

    if (agentErr || !agent) {
        return res.status(404).json({ error: 'Agent wallet not found' });
    }

    if (agent.balance_ugx < amountUGX) {
        return res.status(400).json({ error: 'Insufficient float balance' });
    }

    // deduct float first
    const originalBalance = agent.balance_ugx;
    const newBalance = originalBalance - amountUGX;
    const { error: dErr } = await supabase
        .from('agent_wallets')
        .update({ balance_ugx: newBalance, updated_at: new Date() })
        .eq('agent_phone', sanitizedPhone);

    if (dErr) {
        return res.status(500).json({ error: 'Failed to deduct float' });
    }

    try {
        // log exactly what we send to Bitnob
        console.log('[BITNOB REQUEST BODY]', {
            chain: 'bitcoin',
            customerIdentifier: sanitizedPhone,
            customerEmail,
            label: `AfriRedeem-${sanitizedPhone.slice(-4)}`,
        });

        const { data } = await axios.post(
            'https://sandboxapi.bitnob.co/api/v1/addresses/generate',
            {
                chain: 'bitcoin',
                customerIdentifier: sanitizedPhone,
                customerEmail,
                label: `AfriRedeem-${sanitizedPhone.slice(-4)}`,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.BITNOB_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const onChainAddr = data.data.address;
        const expirySecs = data.data.expiry;
        const sats = convertUGXtoSats(amountUGX);
        const voucherHash = crypto.randomBytes(16).toString('hex');

        // insert voucher
        await supabase.from('vouchers').insert({
            phone: sanitizedPhone,
            hash: voucherHash,
            sats,
            amount_ugx: amountUGX,
            status: 'pending',
            expiry: new Date(Date.now() + expirySecs * 1000),
        });

        return res.status(200).json({ address: onChainAddr, voucherHash, sats });
    } catch (err) {
        // log Bitnob error details
        console.error(
            '[BITNOB ERROR]',
            err.response?.status,
            err.response?.data || err.message
        );

        // refund the float deduction
        await supabase
            .from('agent_wallets')
            .update({ balance_ugx: originalBalance, updated_at: new Date() })
            .eq('agent_phone', sanitizedPhone);

        return res
            .status(500)
            .json({ error: 'Could not create voucher; see server logs for details' });
    }
});

router.get('/create-voucher', (_req, res) => {
    res
        .status(405)
        .json({ error: 'GET not supported; use POST /api/create-voucher with JSON body' });
});

module.exports = router;
