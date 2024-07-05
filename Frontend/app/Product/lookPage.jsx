import React from 'react';
import { Grid, Button, Divider, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from 'react';
import CustomModal from '@/app/components/TableModal';
import LoadingIndicator from '@/app/components/LoadingIndicator';
import Swal from 'sweetalert2';

const LookPage = ({ onProductAdded }) => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [newProduct, setNewProduct] = useState({
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: '',
        type: '',
    });

    const handleRowClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

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

            // Notify the parent component about the added product
            onProductAdded(newProduct);

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
        <>
            {loading && <LoadingIndicator open={loading} />}
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={handleRowClick}>Add</Button>
                </Grid>
                <Grid item xs={3}>
                    Type
                </Grid>
                <Grid item xs={7} display={'flex'} justifyContent={'end'}>
                    Search
                </Grid>
            </Grid>
        
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
    </>
    );
}

export default LookPage;