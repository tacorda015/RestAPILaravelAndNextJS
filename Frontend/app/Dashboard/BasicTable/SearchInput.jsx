// SearchInput.js
import React from 'react';
import TextField from '@mui/material/TextField';

const SearchInput = ({ value, onChange }) => {
  return (
    <TextField
      label="Search"
      type="search"
      variant="outlined"
      value={value}
      size="small"
      onChange={onChange}
      style={{ marginBottom: '1rem' }}
    />
  );
};

export default SearchInput;
