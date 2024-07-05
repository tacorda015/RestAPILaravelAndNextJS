"use client";

import * as React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import BasicTable from './BasicTable/BasicTable';
import ProductCardsList from './ProductCardsList';
import { Grid } from '@mui/material';

const Dashpage = () => {

    return (
        <StyledEngineProvider injectFirst>
            <Grid container spacing={2}>

                <Grid item width={'100%'}>
                  
                    <ProductCardsList/>

                </Grid>

                <Grid item width={'100%'}>
                   
                    <BasicTable/>

                </Grid>
            </Grid>  
        </StyledEngineProvider>
    );
}

export default Dashpage;
