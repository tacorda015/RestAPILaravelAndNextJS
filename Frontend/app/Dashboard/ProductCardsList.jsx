import React, { useState, useEffect } from 'react';
import ProductCards from './ProductCard';
import fetchData from '../utils/api';
import { Skeleton } from '@mui/material';

const ParentComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when component mounts
    fetchData('http://127.0.0.1:8000/api/samplefoods')
      .then(data => {
        // Update state with fetched data
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{width: '100%'}} >
       <h1>Product List</h1>
       {loading ? (
         <Skeleton variant="rectangular" width={'100%'} height={100} animation="wave" />
       ) : (
         <ProductCards products={products} />
       )}
     </div>
  );
};

export default ParentComponent;