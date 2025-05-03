
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PropertyCard, { Property } from '@/components/PropertyCard';
import { Building, Plus, Key, Tag, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for dashboard
const featuredProperties: Property[] = [
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
];

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="relative bg-card rounded-xl overflow-hidden h-64 md:h-80">
          <div className="absolute inset-0 bg-gradient-to-r from-nymuba-dark/80 to-transparent z-10"></div>
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=1200&q=80" 
              alt="Nymuba Track" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="relative z-20 h-full flex flex-col justify-center p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-xl">
              Welcome to <span className="glow-text">Nymuba Track</span>
            </h1>
            <p className="text-white/90 max-w-xl mb-6">
              The next generation blockchain-powered real estate marketplace. 
              Buy, sell, and track property ownership with secure NFT deeds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-nymuba-primary hover:bg-nymuba-primary/90">
                <Link to="/properties">Browse Properties</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/20">
                <Link to="/add-property">List Property</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-nymuba-primary/20 p-3 rounded-full">
                <Building size={24} className="text-nymuba-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Properties</p>
                <h3 className="text-2xl font-bold">248</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-nymuba-blue/20 p-3 rounded-full">
                <Tag size={24} className="text-nymuba-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">NFT Deeds</p>
                <h3 className="text-2xl font-bold">187</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-nymuba-orange/20 p-3 rounded-full">
                <Key size={24} className="text-nymuba-orange" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Rentals</p>
                <h3 className="text-2xl font-bold">56</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-green-500/20 p-3 rounded-full">
                <User size={24} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User Accounts</p>
                <h3 className="text-2xl font-bold">1,452</h3>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Featured Properties */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Featured Properties</h2>
            <Button asChild variant="ghost" className="text-nymuba-primary hover:text-nymuba-primary/80 hover:bg-nymuba-primary/10 -mr-4">
              <Link to="/properties">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
        
        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={20} className="text-nymuba-primary" />
                Add New Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                List your property on Nymuba Track marketplace and create an NFT deed for secure ownership tracking.
              </p>
              <Button asChild className="bg-nymuba-primary hover:bg-nymuba-primary/90 w-full">
                <Link to="/add-property">Add Property</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key size={20} className="text-nymuba-orange" />
                Track Occupancy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Monitor who is occupying your properties and for how long with our blockchain-powered tracking system.
              </p>
              <Button asChild className="bg-nymuba-orange hover:bg-nymuba-orange/90 w-full">
                <Link to="/occupancy">View Occupancy Log</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
