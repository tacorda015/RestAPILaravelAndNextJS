import { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableBody, TableContainer, Paper, Divider, TextField, Button } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import CustomModal from '../components/TableModal';
import TypeSelect from '../Dashboard/BasicTable/TypeSelect';
import Swal from 'sweetalert2';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const TableList = ({ data }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!modalOpen) {
            setSelectedRow(null);
        }
    }, [modalOpen]);

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleUpdateRow = async () => {
        setLoading(true);
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/samplefoods/${selectedRow.id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedRow),
            });
        
            if (response.ok) {
                setModalOpen(false);
                Swal.fire('Success', 'Row updated successfully', 'success');
            } else {
                console.error('Failed to update row:', response.statusText);
                Swal.fire('Error', 'Failed to update row', 'error');
            }
            } catch (error) {
            console.error('Error updating row:', error.message);
            Swal.fire('Error', 'Failed to update row', 'error');
            } finally {
            setLoading(false);
            }
        };
        
        const handleDeleteRow = async (id) => {
            setLoading(true);
        
            try {
            const response = await fetch(`http://127.0.0.1:8000/api/samplefoods/${id}`, {
                method: 'DELETE',
            });
        
            if (response.ok) {
                setModalOpen(false);
                console.log('Delete Successful');
                Swal.fire('Success', 'Row deleted successfully', 'success');
            } else {
                console.error('Failed to delete row:', response.statusText);
                Swal.fire('Error', 'Failed to delete row', 'error');
            }
            } catch (error) {
            console.error('Error deleting row:', error.message);
            Swal.fire('Error', 'Failed to delete row', 'error');
            } finally {
            setLoading(false);
            }
        };

    return (
        <div>
            <h2>Product Table</h2>
            <div style={{borderRadius: '50px'}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                                <StyledTableCell align="right">Calories</StyledTableCell>
                                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Type</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((product, index) => (
                                // <TableRow key={index}>
                                <TableRow
                                    key={index}
                                    onClick={() => handleRowClick(product)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell align="right">{product.calories}</TableCell>
                                    <TableCell align="right">{product.fat}</TableCell>
                                    <TableCell align="right">{product.carbs}</TableCell>
                                    <TableCell align="right">{product.protein}</TableCell>
                                    <TableCell align="right">{product.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <CustomModal open={modalOpen} onClose={handleCloseModal}>
                {selectedRow && (
                <div style={{ padding: '5%', width: '500px' }}>
                    <h2>{selectedRow.name}</h2>
                    <Divider style={{ margin: '.5rem' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                        id="calories"
                        size="small"
                        label="Calories"
                        variant="outlined"
                        value={selectedRow.calories}
                        onChange={(e) => setSelectedRow({ ...selectedRow, calories: e.target.value })}
                    />
                    <TextField
                        id="fat"
                        size="small"
                        label="Fat"
                        variant="outlined"
                        value={selectedRow.fat}
                        onChange={(e) => setSelectedRow({ ...selectedRow, fat: e.target.value })}
                    />
                    <TextField
                        id="carbs"
                        size="small"
                        label="Carbs"
                        variant="outlined"
                        value={selectedRow.carbs}
                        onChange={(e) => setSelectedRow({ ...selectedRow, carbs: e.target.value })}
                    />
                    <TypeSelect
                        value={selectedRow.type}
                        onChange={(e) => setSelectedRow({ ...selectedRow, type: e.target.value })}
                        showAllOption={false}
                    />
                    </div>
                    <Divider style={{ margin: '.5rem' }} />
                    <div style={{ display: "flex", justifyContent: 'flex-end', gap: '.5rem' }}>
                    <Button variant="contained" onClick={() => handleDeleteRow(selectedRow.id)} color='error'>Delete</Button>
                    <Button variant="contained" onClick={handleUpdateRow}>Update</Button>
                    </div>
                </div>
                )}
            </CustomModal>
        </div>
    );
}

export default TableList;
