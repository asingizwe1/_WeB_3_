
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  status: 'For Sale' | 'For Rent';
  description: string;
}

const AddPropertyForm: React.FC = () => {
  const { toast } = useToast();
  const [isNftMinting, setIsNftMinting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    
    // Mock successful submission
    toast({
      title: "Property Added Successfully",
      description: "Your property has been listed on Nymuba Track.",
    });
    
    // If NFT minting is enabled, show minting toast
    if (isNftMinting) {
      toast({
        title: "NFT Minting Initiated",
        description: "The property deed NFT is being minted on the blockchain.",
      });
    }
    
    reset();
  };
  
  return (
    <Card className="glass-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-nymuba-primary to-nymuba-orange">
          Add New Property
        </CardTitle>
        <CardDescription>
          List a new property on the Nymuba Track marketplace
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                {...register('title', { required: "Property title is required" })}
                placeholder="Enter property title"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Property Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="condo">Condominium</SelectItem>
                  <SelectItem value="office">Office Space</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Property Address</Label>
            <Input
              id="address"
              {...register('address', { required: "Address is required" })}
              placeholder="Enter complete address"
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                {...register('price', { 
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" }
                })}
                placeholder="Enter price"
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Listing Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select listing status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="For Rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                {...register('bedrooms', { 
                  required: "Required",
                  min: { value: 0, message: "Cannot be negative" }
                })}
                placeholder="Bedrooms"
                className={errors.bedrooms ? "border-red-500" : ""}
              />
              {errors.bedrooms && (
                <p className="text-red-500 text-sm">{errors.bedrooms.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                {...register('bathrooms', { 
                  required: "Required",
                  min: { value: 0, message: "Cannot be negative" }
                })}
                placeholder="Bathrooms"
                className={errors.bathrooms ? "border-red-500" : ""}
              />
              {errors.bathrooms && (
                <p className="text-red-500 text-sm">{errors.bathrooms.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="area">Area (sq ft)</Label>
              <Input
                id="area"
                type="number"
                {...register('area', { 
                  required: "Required",
                  min: { value: 0, message: "Cannot be negative" }
                })}
                placeholder="Area"
                className={errors.area ? "border-red-500" : ""}
              />
              {errors.area && (
                <p className="text-red-500 text-sm">{errors.area.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Property Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Enter property details, features, etc."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Property Images</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 mx-auto text-muted-foreground"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop images here or click to browse
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Choose Files
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="nft-minting"
              checked={isNftMinting}
              onCheckedChange={setIsNftMinting}
            />
            <Label htmlFor="nft-minting" className="text-sm cursor-pointer">
              Mint property deed as NFT on blockchain
            </Label>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-nymuba-primary hover:bg-nymuba-primary/90"
          >
            Add Property
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPropertyForm;
