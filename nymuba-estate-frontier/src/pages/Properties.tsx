
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import PropertyCard, { Property } from '@/components/PropertyCard';

// Mock data for properties
const properties: Property[] = [
  {
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
  {
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
  },
  {
    id: '3',
    title: 'Modern Office Space',
    address: '789 Business Ave, Downtown, USA',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
    bedrooms: 0,
    bathrooms: 2,
    area: 3500,
    status: 'For Sale',
    type: 'Commercial'
  },
  {
    id: '4',
    title: 'Urban Loft Apartment',
    address: '101 Urban St, Metropolis, USA',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1200&q=80',
    bedrooms: 1,
    bathrooms: 1,
    area: 950,
    status: 'For Rent',
    type: 'Apartment'
  },
  {
    id: '5',
    title: 'Suburban Family Home',
    address: '555 Family Rd, Suburbs, USA',
    price: 485000,
    image: 'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&w=1200&q=80',
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    status: 'For Sale',
    type: 'House'
  },
  {
    id: '6',
    title: 'Mountain View Cabin',
    address: '777 Mountain Pass, Highland, USA',
    price: 375000,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1200&q=80',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    status: 'For Sale',
    type: 'Cabin'
  },
];

const Properties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [propertyStatus, setPropertyStatus] = useState<string | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  
  // Filter properties based on search and filter criteria
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           property.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriceRange = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    const matchesType = propertyType ? property.type === propertyType : true;
    
    const matchesStatus = propertyStatus ? property.status === propertyStatus : true;
    
    const matchesBedrooms = bedrooms ? property.bedrooms === bedrooms : true;
    
    return matchesSearch && matchesPriceRange && matchesType && matchesStatus && matchesBedrooms;
  });
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 1000000]);
    setPropertyType(null);
    setPropertyStatus(null);
    setBedrooms(null);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h1 className="text-3xl font-bold">Properties</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="p-4 border rounded-lg glass-card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search by name or location"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Select value={propertyType || undefined} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Cabin">Cabin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={propertyStatus || undefined} onValueChange={setPropertyStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="For Rent">For Rent</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={bedrooms !== null ? bedrooms.toString() : undefined} onValueChange={(value) => setBedrooms(value === 'all' ? null : parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 px-4">
            <div className="flex justify-between mb-2">
              <span>Price Range:</span>
              <span>${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              defaultValue={[0, 1000000]}
              value={[priceRange[0], priceRange[1]]}
              max={1000000}
              step={10000}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              className="py-4"
            />
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {propertyType && propertyType !== 'all' && (
              <Badge variant="outline" className="flex items-center gap-1">
                Type: {propertyType}
                <button 
                  onClick={() => setPropertyType(null)}
                  className="ml-1 rounded-full hover:bg-muted p-1"
                >
                  ✕
                </button>
              </Badge>
            )}
            {propertyStatus && propertyStatus !== 'all' && (
              <Badge variant="outline" className="flex items-center gap-1">
                Status: {propertyStatus}
                <button 
                  onClick={() => setPropertyStatus(null)}
                  className="ml-1 rounded-full hover:bg-muted p-1"
                >
                  ✕
                </button>
              </Badge>
            )}
            {bedrooms && (
              <Badge variant="outline" className="flex items-center gap-1">
                Bedrooms: {bedrooms}
                <button 
                  onClick={() => setBedrooms(null)}
                  className="ml-1 rounded-full hover:bg-muted p-1"
                >
                  ✕
                </button>
              </Badge>
            )}
          </div>
        </div>
        
        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
            <Button onClick={resetFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Properties;
