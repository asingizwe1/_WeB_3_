'use client';

import React, { useState, useEffect } from 'react';
import { countries, getUniversalLink } from "@selfxyz/core";
import {
  SelfQRcodeWrapper,
  SelfAppBuilder,
  type SelfApp,
} from "@selfxyz/qrcode";
import { ethers } from "ethers";
import { count } from 'console';

function VerificationPage() {
  const [selfApp, setSelfApp] = useState<SelfApp | null>(null);
  const [universalLink, setUniversalLink] = useState("");
  const [userId] = useState(ethers.ZeroAddress);

  useEffect(() => {
    try {
      const app = new SelfAppBuilder({
        version: 2,
        appName: process.env.NEXT_PUBLIC_SELF_APP_NAME || "Self Workshop",
        scope: process.env.NEXT_PUBLIC_SELF_SCOPE || "self-workshop",
        endpoint: `${process.env.NEXT_PUBLIC_SELF_ENDPOINT}`,
        logoBase64: "https://i.postimg.cc/mrmVf9hm/self.png",
        userId: userId,
        endpointType: "staging_https",
        userIdType: "hex",
        userDefinedData: "Bonjour Cannes!",
        disclosures: {
          minimumAge: 18,
          ofac: false,
          excludedCountries: [countries.BELGIUM, 
            countries.NIGERIA,
          ],
          nationality: true,
          gender: true,
        }
      }).build();

      setSelfApp(app);
      setUniversalLink(getUniversalLink(app));
    } catch (error) {
      console.error("Failed to initialize Self app:", error);
    }
  }, [userId]);

  const handleSuccessfulVerification = () => {
    console.log("Verification successful!");
    // Handle success - redirect, update UI, etc.
  };

  return (
    <div className="verification-container">
      <h1>Verify Your Identity</h1>
      <p>Scan this QR code with the Self app</p>
      
      {selfApp ? (
        <SelfQRcodeWrapper
          selfApp={selfApp}
          onSuccess={handleSuccessfulVerification}
          onError={() => {
            console.error("Error: Failed to verify identity");
          }}
        />
      ) : (
        <div>Loading QR Code...</div>
      )}
    </div>
  );
}

export default VerificationPage;