
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

export interface OccupancyRecord {
  id: string;
  propertyId: string;
  propertyName: string;
  tenantName: string;
  tenantId: string;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
}

interface OccupancyLogProps {
  occupancyRecords: OccupancyRecord[];
}

const OccupancyLog: React.FC<OccupancyLogProps> = ({ occupancyRecords }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredRecords = occupancyRecords.filter(record => 
    record.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.tenantId.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    // Calculate the difference in days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      return `${months} month${months > 1 ? 's' : ''}${remainingDays > 0 ? `, ${remainingDays} days` : ''}`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
    }
  };
  
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nymuba-primary to-nymuba-orange">
          Property Occupancy Log
        </CardTitle>
        <div className="relative mt-2">
          <Input
            placeholder="Search by property or tenant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Property</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-center">Duration</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record.id} className="animate-hover">
                    <TableCell className="font-medium">{record.propertyName}</TableCell>
                    <TableCell>
                      <div>
                        {record.tenantName}
                        <div className="text-xs text-muted-foreground">ID: {record.tenantId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span>{formatDate(record.startDate)}</span>
                        <span>→</span>
                        <span>{record.endDate ? formatDate(record.endDate) : 'Present'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {calculateDuration(record.startDate, record.endDate)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={record.isActive ? 'bg-green-600' : 'bg-muted'}
                      >
                        {record.isActive ? 'Active' : 'Past'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No matching occupancy records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyLog;
