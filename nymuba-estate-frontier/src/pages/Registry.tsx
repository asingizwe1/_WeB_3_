
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock registry data
const registryData = [
  {
    id: '1',
    propertyId: 'prop-001',
    tokenId: '#1342',
    title: 'Modern Downtown Apartment',
    owner: '0x7c3A12C9D9cD60632D6a28F61fc63dd5cdFC8C4D',
    registered: '2023-06-15',
    status: 'Active'
  },
  {
    id: '2',
    propertyId: 'prop-002',
    tokenId: '#1343',
    title: 'Luxury Beachfront Villa',
    owner: '0x61fc63dd5cdFC8C4D7c3A12C9D9cD60632D6a28F',
    registered: '2023-08-22',
    status: 'Active'
  },
  {
    id: '3',
    propertyId: 'prop-003',
    tokenId: '#1344',
    title: 'Modern Office Space',
    owner: '0xD6a28F61fc63dd5cdFC8C4D7c3A12C9D9cD60632',
    registered: '2023-09-30',
    status: 'Inactive'
  },
  {
    id: '4',
    propertyId: 'prop-004',
    tokenId: '#1345',
    title: 'Urban Loft Apartment',
    owner: '0xcdFC8C4D7c3A12C9D9cD60632D6a28F61fc63dd5',
    registered: '2023-11-05',
    status: 'Pending'
  },
];

const Registry: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Property Registry</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Registered</p>
                <h3 className="text-3xl font-bold text-nymuba-primary">4</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Active NFT Deeds</p>
                <h3 className="text-3xl font-bold text-nymuba-blue">2</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Average Value</p>
                <h3 className="text-3xl font-bold">$345,000</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nymuba-primary to-nymuba-blue">
                Property Registry Ledger
              </CardTitle>
              <Button className="bg-nymuba-primary hover:bg-nymuba-primary/90 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                Register New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token ID</TableHead>
                    <TableHead>Property Name</TableHead>
                    <TableHead className="hidden md:table-cell">Owner Address</TableHead>
                    <TableHead className="hidden md:table-cell">Registered</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registryData.map(record => (
                    <TableRow key={record.id} className="animate-hover">
                      <TableCell className="font-mono text-sm">{record.tokenId}</TableCell>
                      <TableCell>{record.title}</TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-sm truncate max-w-[150px]">
                        {record.owner}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(record.registered).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={
                            record.status === 'Active' ? 'bg-green-600' : 
                            record.status === 'Pending' ? 'bg-amber-600' : 
                            'bg-gray-600'
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nymuba-primary to-nymuba-orange">
              Blockchain Registry Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Blockchain activity visualization coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Registry;
