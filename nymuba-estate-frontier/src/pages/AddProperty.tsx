
import React from 'react';
import Layout from '@/components/Layout';
import AddPropertyForm from '@/components/AddPropertyForm';

const AddProperty: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Add New Property</h1>
        <AddPropertyForm />
      </div>
    </Layout>
  );
};

export default AddProperty;
