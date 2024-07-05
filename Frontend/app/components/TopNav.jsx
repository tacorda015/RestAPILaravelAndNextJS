import * as React from 'react';
import UserAvatar from './UserAvatar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import DrawerTab from './DrawerTab';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;

const TopNav = () => {

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    // const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    return (
        
        <Box>
            <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <Box display="flex" justifyContent={matches ? 'space-between' : 'flex-end'} paddingY={1} width={"100%"}>
                    <Box
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' }, cursor: 'pointer', }}>
                        X
                    </Box>
                    <UserAvatar />
                </Box>
                
            </Toolbar>
        </AppBar>

        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            <DrawerTab />

        </Drawer>

        
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
        >

          <DrawerTab />

        </Drawer>
      </Box>
    </Box>
        
    )
}

export default TopNav