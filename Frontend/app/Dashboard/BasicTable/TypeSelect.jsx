import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const TypeSelect = ({ value, onChange, showAllOption }) => {
  return (
    <FormControl variant="outlined" size="small" style={{ marginBottom: '1rem', minWidth: '100px' }}>
      <InputLabel>Type</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label="Type"
      >
        {showAllOption  && <MenuItem value="" selected>All</MenuItem>}
        <MenuItem value="Dessert">Dessert</MenuItem>
        <MenuItem value="Main Course">Main Course</MenuItem>
        <MenuItem value="Starter">Starter</MenuItem>
        <MenuItem value="Soup">Soup</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TypeSelect;
