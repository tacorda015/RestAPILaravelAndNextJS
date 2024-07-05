'use client';
import { useState, useEffect } from "react";
import CardList from "./cardContainer";
import TableList from "./table";
import LookPage from "./lookPage";
import { StyledEngineProvider, Grid, Skeleton } from "@mui/material";
import LoadingIndicator from '@/app/components/LoadingIndicator';

const ProductList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDataAndUpdateState = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/samplefoods');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataAndUpdateState();
    }, []);
    
    // Calculate count of each type
    const typeCounts = {};
    data.forEach(product => {
        if (typeCounts[product.type]) {
            typeCounts[product.type]++;
        } else {
            typeCounts[product.type] = 1;
        }
    });

    // Convert typeCounts object to an array of objects with type name and count
    const typeCountArray = Object.keys(typeCounts).map(type => ({
        typeName: type,
        count: typeCounts[type]
    }));

    // Function to update the state with the newly added product
    const handleProductAdded = (newProduct) => {
        // setData(prevData => [...prevData, newProduct]);
        setData(prevData => [newProduct, ...prevData]);
    };

    return (

        <StyledEngineProvider injectFirst>
            {loading && <LoadingIndicator open={loading} />}
            <Grid container spacing={2} width={'100%'}>


                {loading ? (
                    <Grid item width={'100%'}>
                        <Skeleton variant="rectangular" width={'100%'} height={96} animation="wave" />
                    </Grid>
                ):(
                    <Grid item width={'100%'}>
                        <CardList typeCounts={typeCountArray} />
                    </Grid>
                )}

                {loading ? (
                    <Grid item width={'100%'}>
                        <Skeleton variant="rectangular" width={'100%'} height={45} animation="wave" />
                    </Grid>
                ):(
                    <Grid item width={'100%'}>
                        <LookPage onProductAdded={handleProductAdded} />
                    </Grid>
                )}


                {loading ? (
                    <Grid item width={'100%'}>
                        <Skeleton variant="rectangular" width={'100%'} height={440} animation="wave" />
                    </Grid>
                ):(
                    <Grid item width={'100%'}>
                        <TableList data={data} />
                    </Grid>
                )}

            </Grid>  
        </StyledEngineProvider>
    );
}

export default ProductList;
