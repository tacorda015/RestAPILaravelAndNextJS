import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import profilePic from '../img/sample.jpg';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChangePasswordModal from './ChangePasswordModal';
import { Divider } from '@mui/material';

export default function ImageAvatars() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <Avatar alt="Remy Sharp">
                <Image src={profilePic} alt="Profile Picture" width={50} height={50} />
            </Avatar>
        </Button>

        {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        > */}
         <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0.5,
            ml: -2,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
            <MenuItem>Hello, Name of User</MenuItem>
            <Divider />
            <MenuItem>
                <ChangePasswordModal />
            </MenuItem>
            <MenuItem>
                <Button sx={{ textTransform: 'none' }}>
                    Logout
                </Button>
            </MenuItem>
        </Menu>
        </>
        
    );
}
