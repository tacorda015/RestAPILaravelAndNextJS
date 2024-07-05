import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import TypeSelect from './TypeSelect';
import DataTable from './DataTable';
import { Button, Divider, TextField, Grid, Skeleton } from '@mui/material';
import CustomModal from '@/app/components/TableModal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import fetchData from '@/app/utils/api';
import Swal from 'sweetalert2';
import LoadingIndicator from '@/app/components/LoadingIndicator';

const BasicTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // State variables to manage input fields for new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    calories: '',
    fat: '',
    carbs: '',
    protein: '',
    type: '',
  });

  const fetchDataAndUpdateState = async () => {
    try {
      const updatedData = await fetchData('http://127.0.0.1:8000/api/samplefoods');
      setData(updatedData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setCurrentPage(1);
  };

  const handleUpdateData = (updatedData) => {
    setData(updatedData);
  };

  const handleRowClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to handle changes in input fields for new product
  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddRow = async () => {
    setLoading(true);
    try {
      const requiredFields = ['name', 'calories', 'fat', 'carbs', 'protein', 'type'];
      if (requiredFields.some((field) => !newProduct[field])) {
        throw new Error('Please fill in all fields.');
      }

      if (requiredFields.slice(1, 5).some((field) => isNaN(parseFloat(newProduct[field])))) {
        throw new Error('Please enter numeric values for Calories, Fat, Carbs, and Protein.');
      }

      const response = await fetch('http://127.0.0.1:8000/api/samplefoods', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product: ${response.statusText}`);
      }

      await fetchDataAndUpdateState();
      setModalOpen(false);
      setNewProduct({
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: '',
        type: '',
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product added successfully.',
      });
    } catch (error) {
      console.error('Error adding product:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <LoadingIndicator open={loading} />}
      {loading ? ( 
        <Grid container spacing={2}>
          <Grid item>
            <Skeleton variant="rectangular" width={500} height={50} animation="wave" />
          </Grid>
          <Grid item width={'100%'}>
            <Skeleton variant="rectangular" width={'100%'} height={500} animation="wave" />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container spacing={2}>

            <Grid item>
              <SearchInput value={searchQuery} onChange={handleSearchChange} />
            </Grid>

            <Grid item>
              <TypeSelect value={selectedType} onChange={handleTypeChange} showAllOption={true} />
            </Grid>

            <Grid item>
              <Button variant="contained" onClick={handleRowClick}>Add</Button>
            </Grid>
            
          </Grid>

          <DataTable
            data={data}
            searchQuery={searchQuery}
            selectedType={selectedType}
            currentPage={currentPage}
            rowsPerPage={10}
            onPageChange={handlePageChange}
            onUpdate={handleUpdateData}
          />
        </>
      )}
      <CustomModal open={modalOpen} onClose={handleCloseModal}>
        {(
          <div style={{ padding: '5%', width: '500px' }}>
            <h2>Add Product</h2>
            <Divider style={{ margin: '.5rem' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextField id="name" name="name" size="small" label="Name" variant="outlined" value={newProduct.name} onChange={handleNewProductChange} />

              <TextField id="calories" name="calories" size="small" label="Calories" variant="outlined" value={newProduct.calories} onChange={handleNewProductChange} />

              <TextField id="fat" name="fat" size="small" label="Fat" variant="outlined" value={newProduct.fat} onChange={handleNewProductChange} />

              <TextField id="protein" name="protein" size="small" label="Protein" variant="outlined" value={newProduct.protein} onChange={handleNewProductChange} />

              <TextField id="carbs" name="carbs" size="small" label="Carbs" variant="outlined" value={newProduct.carbs} onChange={handleNewProductChange} />

              <FormControl variant="outlined" style={{ marginBottom: '1rem', minWidth: '100px' }}>
                <InputLabel>Type</InputLabel>
                <Select value={newProduct.type} onChange={handleNewProductChange} label="Type" name="type">
                  <MenuItem value="Dessert">Dessert</MenuItem>
                  <MenuItem value="Main Course">Main Course</MenuItem>
                  <MenuItem value="Starter">Starter</MenuItem>
                  <MenuItem value="Soup">Soup</MenuItem>
                </Select>
              </FormControl>


            </div>
            <Divider style={{ margin: '.5rem' }} />
            <div style={{ display: "flex", justifyContent: 'flex-end', gap: '.5rem' }}>
              <Button variant="contained" onClick={handleAddRow} color='success'>Save</Button>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default BasicTable;
