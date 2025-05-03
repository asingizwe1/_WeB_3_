
import React from 'react';
import Layout from '@/components/Layout';
import OccupancyLog, { OccupancyRecord } from '@/components/OccupancyLog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock occupancy data
const occupancyRecords: OccupancyRecord[] = [
  {
    id: '1',
    propertyId: '1',
    propertyName: 'Modern Downtown Apartment',
    tenantName: 'John Smith',
    tenantId: '0x125DAB',
    startDate: '2024-01-15',
    endDate: null,
    isActive: true
  },
  {
    id: '2',
    propertyId: '2',
    propertyName: 'Luxury Beachfront Villa',
    tenantName: 'Emma Johnson',
    tenantId: '0x392FCA',
    startDate: '2023-11-01',
    endDate: '2024-04-30',
    isActive: true
  },
  {
    id: '3',
    propertyId: '3',
    propertyName: 'Modern Office Space',
    tenantName: 'TechStart Inc.',
    tenantId: '0x762BDE',
    startDate: '2023-07-01',
    endDate: '2023-12-31',
    isActive: false
  },
  {
    id: '4',
    propertyId: '4',
    propertyName: 'Urban Loft Apartment',
    tenantName: 'Michael Brown',
    tenantId: '0x984FDC',
    startDate: '2023-03-15',
    endDate: '2023-09-15',
    isActive: false
  },
  {
    id: '5',
    propertyId: '5',
    propertyName: 'Suburban Family Home',
    tenantName: 'Williams Family',
    tenantId: '0x546AED',
    startDate: '2022-12-01',
    endDate: '2023-11-30',
    isActive: false
  }
];

const Occupancy: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Occupancy Tracking</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Active Occupancies</p>
                <h3 className="text-3xl font-bold text-nymuba-primary">2</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Properties</p>
                <h3 className="text-3xl font-bold">5</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Avg. Occupancy Duration</p>
                <h3 className="text-3xl font-bold">6.2 months</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium">Occupancy Log</h2>
            <Button variant="outline" className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export
            </Button>
          </div>
          
          <OccupancyLog occupancyRecords={occupancyRecords} />
        </div>
      </div>
    </Layout>
  );
};

export default Occupancy;
