
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Key, DollarSign } from 'lucide-react';

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // square feet
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Rented';
  type: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { id, title, price, image, status, type, bedrooms, bathrooms, area } = property;
  
  const statusColor = () => {
    switch(status) {
      case 'For Sale': return 'bg-nymuba-blue text-white';
      case 'For Rent': return 'bg-nymuba-primary text-white';
      case 'Sold': return 'bg-nymuba-dark text-white';
      case 'Rented': return 'bg-nymuba-orange text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <Link to={`/property/${id}`} className="block">
      <Card className="overflow-hidden property-card h-full">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
          />
          <Badge className={`absolute top-2 right-2 ${statusColor()}`}>{status}</Badge>
          <div className="absolute bottom-0 left-0 right-0 p-2 blur-bg">
            <p className="text-white font-medium text-sm truncate">{type}</p>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate mb-1">{title}</h3>
          
          <div className="flex items-center gap-1 text-nymuba-primary">
            {status === 'For Sale' || status === 'Sold' ? (
              <DollarSign size={16} />
            ) : (
              <Key size={16} />
            )}
            <p className="font-bold">
              {status === 'For Sale' || status === 'Sold' 
                ? `$${price.toLocaleString()}` 
                : `$${price.toLocaleString()}/month`}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4 text-sm text-muted-foreground">
            <div className="flex flex-col items-center justify-center border rounded-md py-2">
              <p className="font-bold text-foreground">{bedrooms}</p>
              <p>Beds</p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md py-2">
              <p className="font-bold text-foreground">{bathrooms}</p>
              <p>Baths</p>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-md py-2">
              <p className="font-bold text-foreground">{area}</p>
              <p>Sq Ft</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-3 border-t bg-muted/20">
          <div className="flex items-center gap-2 text-sm">
            <Building size={14} className="text-muted-foreground" />
            <p className="truncate text-muted-foreground">NFT-Backed Property</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
