
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Marketplace: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">NFT Marketplace</h1>
        
        <Card className="glass-card p-12 text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nymuba-primary to-nymuba-orange">
              NFT Marketplace Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">
              Our NFT marketplace for trading property deeds is under development.
            </p>
            <p className="text-muted-foreground">
              Check back soon for the ability to buy, sell, and trade property NFTs.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Marketplace;
