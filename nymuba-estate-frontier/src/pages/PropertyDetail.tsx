
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PropertyDetails from '@/components/PropertyDetails';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { type Property } from '@/components/PropertyCard';

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, fetch property data from API based on ID
  // For now, we'll use mock data
  const mockProperties: Record<string, Property> = {
    '1': {
      id: '1',
      title: 'Modern Downtown Apartment',
      address: '123 Main St, Anytown, USA',
      price: 250000,
      image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      status: 'For Sale',
      type: 'Apartment'
    },
    '2': {
      id: '2',
      title: 'Luxury Beachfront Villa',
      address: '456 Ocean Dr, Seaside, USA',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      status: 'For Rent',
      type: 'Villa'
    }
  };
  
  const property = id ? mockProperties[id] : null;
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  if (!property) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={handleBackClick}>Go Back</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={handleBackClick}
          className="flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          Back
        </Button>
        
        <PropertyDetails property={property} />
      </div>
    </Layout>
  );
};

export default PropertyDetail;
