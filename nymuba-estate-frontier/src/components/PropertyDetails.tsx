
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Building, Key, Calendar, DollarSign, User, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type Property } from './PropertyCard';

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  
  const handlePurchase = () => {
    toast({
      title: "Purchase Request Initiated",
      description: "Your request to purchase this property has been submitted.",
    });
  };
  
  const handleRent = () => {
    toast({
      title: "Rental Request Initiated",
      description: "Your request to rent this property has been submitted.",
    });
  };
  
  const statusColor = () => {
    switch(property.status) {
      case 'For Sale': return 'bg-nymuba-blue text-white';
      case 'For Rent': return 'bg-nymuba-primary text-white';
      case 'Sold': return 'bg-nymuba-dark text-white';
      case 'Rented': return 'bg-nymuba-orange text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <Badge className={`${statusColor()} mb-2 self-start`}>{property.status}</Badge>
          <h1 className="text-3xl font-bold text-white mb-2">{property.title}</h1>
          <p className="text-white/90">{property.address}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden glass-card">
            <Tabs defaultValue="details" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid grid-cols-3 bg-muted/30">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="ownership">Ownership</TabsTrigger>
                <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-card/50">
                      <p className="text-muted-foreground text-sm">Bedrooms</p>
                      <p className="text-2xl font-bold">{property.bedrooms}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-card/50">
                      <p className="text-muted-foreground text-sm">Bathrooms</p>
                      <p className="text-2xl font-bold">{property.bathrooms}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-card/50">
                      <p className="text-muted-foreground text-sm">Area</p>
                      <p className="text-2xl font-bold">{property.area} sq ft</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    This magnificent property offers modern living spaces combined with beautiful architecture. 
                    Perfect location with easy access to amenities and transportation.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-medium mb-2">Features</h3>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-nymuba-primary" />
                      Central Air Conditioning
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-nymuba-primary" />
                      Modern Kitchen
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-nymuba-primary" />
                      Hardwood Floors
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-nymuba-primary" />
                      High Ceilings
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-nymuba-primary" />
                      Laundry Room
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-nymuba-primary" />
                      Private Terrace
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="ownership" className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Ownership Information</h2>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-muted/10">
                    <div className="flex items-center gap-3 mb-3">
                      <Tag size={20} className="text-nymuba-primary" />
                      <h3 className="font-medium">NFT Deed</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      This property's ownership is tokenized as an NFT on the blockchain, 
                      providing secure and transparent proof of ownership.
                    </p>
                    <div className="bg-muted/20 p-3 rounded text-sm font-mono break-all">
                      0x7c3A12C9D9cD60632D6a28F61fc63dd5cdFC8C4D
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Ownership History</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span>0x61fc...8C4D</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Since Jun 2024</div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span>0x3b42...9F1A</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Jan 2023 - Jun 2024</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="occupancy" className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Occupancy History</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Key size={18} className="text-nymuba-primary" />
                      <h3 className="font-medium">Current Status</h3>
                    </div>
                    <p className="text-muted-foreground">
                      {property.status === 'Rented' ? 'Currently Occupied' : 'Currently Vacant'}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Recent Occupancy</h3>
                    <div className="divide-y">
                      <div className="py-3 flex justify-between">
                        <div>
                          <p className="font-medium">John D.</p>
                          <p className="text-sm text-muted-foreground">Tenant #0x78E3</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Jul 2023 - Dec 2023</p>
                          <p className="text-sm text-muted-foreground">6 months</p>
                        </div>
                      </div>
                      <div className="py-3 flex justify-between">
                        <div>
                          <p className="font-medium">Maria S.</p>
                          <p className="text-sm text-muted-foreground">Tenant #0x14A9</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Jan 2023 - Jun 2023</p>
                          <p className="text-sm text-muted-foreground">6 months</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                {property.status === 'For Sale' || property.status === 'Sold' ? (
                  <>
                    <DollarSign size={24} className="text-nymuba-primary" />
                    <h2 className="text-2xl font-bold">${property.price.toLocaleString()}</h2>
                  </>
                ) : (
                  <>
                    <Key size={24} className="text-nymuba-primary" />
                    <h2 className="text-2xl font-bold">${property.price.toLocaleString()}/month</h2>
                  </>
                )}
              </div>
              
              {(property.status === 'For Sale' || property.status === 'For Rent') && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    {property.status === 'For Sale' 
                      ? 'Interested in purchasing this property?' 
                      : 'Interested in renting this property?'}
                  </p>
                  
                  {property.status === 'For Sale' ? (
                    <Button 
                      className="w-full bg-nymuba-blue hover:bg-nymuba-blue/90 gap-2"
                      onClick={handlePurchase}
                    >
                      <Tag size={16} />
                      Purchase Property
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-nymuba-primary hover:bg-nymuba-primary/90 gap-2"
                      onClick={handleRent}
                    >
                      <Key size={16} />
                      Rent Property
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-nymuba-primary text-nymuba-primary hover:bg-nymuba-primary/10 gap-2"
                  >
                    <Calendar size={16} />
                    Schedule Viewing
                  </Button>
                </div>
              )}
              
              {(property.status === 'Sold' || property.status === 'Rented') && (
                <div className="bg-muted/20 p-4 rounded-lg">
                  <p className="text-center font-medium">
                    This property is currently not available.
                  </p>
                </div>
              )}
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="font-medium">Property Information</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year Built:</span>
                    <span>2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blockchain:</span>
                    <span>Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Token ID:</span>
                    <span>#1342</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-medium">Property Location</h3>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img 
                  src="https://miro.medium.com/v2/resize:fit:1400/1*qYUvh-EtES8dtgKiBRiLsA.png" 
                  alt="Map Location" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <p className="text-white font-medium">Interactive map coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
