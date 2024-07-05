"use client";
import * as React from 'react';
import TopNav from '../components/TopNav';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';



const RootLayout = ({ children }) => {

    const drawerWidth = 240;
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex' }}>

            <CssBaseline />

            <TopNav />

            <Box
                component="main"
                sx={{
                flexGrow: 1,
                p: 3,
                width: '100%', // Set width to 100% by default
                [theme.breakpoints.up('sm')]: {
                    width: `calc(100% - ${drawerWidth}px)`, // Adjust width for larger screens
                },
                }}
            >

            <Toolbar />

                {children}

            </Box>
            
        </Box>
    )
}

export default RootLayout;

