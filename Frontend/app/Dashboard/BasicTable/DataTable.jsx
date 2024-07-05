import React, { useState, useEffect } from 'react';
import CustomModal from '@/app/components/TableModal';
import TypeSelect from './TypeSelect';
import fetchData from '@/app/utils/api';
import Swal from 'sweetalert2';
import LoadingIndicator from '@/app/components/LoadingIndicator';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const DataTable = ({ data, searchQuery, selectedType, currentPage, rowsPerPage, onPageChange, onUpdate }) => {
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
        const updatedData = await fetchData('http://127.0.0.1:8000/api/samplefoods');
        const updatedRow = updatedData.find(row => row.id === selectedRow.id);
        setSelectedRow(updatedRow);
        setModalOpen(false);
        onUpdate(updatedData);
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
        const updatedData = data.filter(row => row.id !== id);
        onUpdate(updatedData);
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

  const filteredRows = data.filter(row =>
    (row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.calories.toString().includes(searchQuery) ||
      row.fat.toString().includes(searchQuery) ||
      row.carbs.toString().includes(searchQuery) ||
      row.protein.toString().includes(searchQuery) ||
      row.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedType === '' || row.type.toLowerCase() === selectedType.toLowerCase())
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const numPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <div>
      <LoadingIndicator open={loading} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
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
            {filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No matching data found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRows.slice(startIndex, endIndex).map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <span style={{ fontSize: '.85rem' }}>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredRows.length)} of {filteredRows.length} entries
        </span>
        <Pagination
          count={numPages}
          page={currentPage}
          onChange={onPageChange}
          variant="outlined"
          shape="rounded"
        />
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
};

export default DataTable;
