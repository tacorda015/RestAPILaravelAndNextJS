import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const ProductCards = ({ products }) => {
  // Count the number of products for each type
  const typeCounts = products.reduce((acc, product) => {
    acc[product.type] = (acc[product.type] || 0) + 1;
    return acc;
  }, {});

  // Determine the maximum count among all types
  const maxCount = Math.max(...Object.values(typeCounts));

  return (
    <Grid container spacing={1}>
      {Object.entries(typeCounts).map(([type, count]) => (
        <Grid key={type} item xs={6} sm={3} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: '100%', height: '96px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardContent style={{ textAlign: 'center' }}>
              <Typography component="div">
                {type}
              </Typography>
              <Typography color="textSecondary">
                {count}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCards;
