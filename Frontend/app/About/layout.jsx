"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import TopNav from '../components/TopNav';

const drawerWidth = 240;

const RootLayout = ({children}) => {
    return (
        <Box sx={{ display: 'flex' }}>
            
            <CssBaseline />

            <TopNav />

            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, height: '100vh' }}>
                
                <Toolbar />

                {children}

            </Box>
        
        </Box>
    )
}

export default RootLayout