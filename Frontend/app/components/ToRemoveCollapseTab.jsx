import React from 'react'; 
import List from '@material-ui/core/List'; 
import ListItem from '@material-ui/core/ListItem'; 
import Collapse from '@material-ui/core/Collapse';

export default function CollapsibleList() { 
  const [open, setOpen] = React.useState(false);

const handleToggle = () => { setOpen(!open); 
  };

  return ( 
    <List>
      <ListItem button onClick={handleToggle}> 
        {open ? 'Hide' : 'Show'} 
      </ListItem> 
      <Collapse in={open}> 
         <List component="div" disablePadding> 
            <ListItem button> 
              Nested List Item 
            </ListItem> 
         </List> 
      </Collapse> 
     </List> 
  ); 
}