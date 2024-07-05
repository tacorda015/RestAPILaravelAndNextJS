import React, { useState } from 'react';
import Link from "next/link";
import {Box, Collapse, Divider, Toolbar, ListItemText, ListItemButton, ListItem, List, Paper, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import profilePic from '../img/sample.jpg'


const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    flexGrow: 1,
  }));

const links = [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/About' },
    { text: 'Dashboard', url: '/Dashboard' },
    { text: 'Product', url: '/Product' }
];

const drawer = () => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>

            <Box display="flex" flexDirection="column" alignItems="center">
                <Image
                src={profilePic}
                width={50}
                height={50}
                alt="Picture of the author"
                />
                <Typography variant="subtitle1">Logo Name</Typography>
            </Box>

            <Divider />

            <List>
                {links.map((link, index) => (
                    <Link key={index} href={link.url}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary={link.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>

            <Divider />

            <List>
                <ListItem onClick={handleClick}> 
                    <Box>Message</Box>
                    {open ? "Open" : "Close"}
                </ListItem>

                <Collapse in={open} timeout="auto" unmountOnExit sx={{padding: "0 15%"}}>
                    <List component="div" >
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <div key={text}>
                                    <ListItemText primary={text} />
                            </div>
                            ))}
                    </List>
                </Collapse>

            </List>

        </div>
    )
}

  export default drawer