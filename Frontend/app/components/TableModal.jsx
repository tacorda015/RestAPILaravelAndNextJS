// Modal.js
import React from 'react';
import Modal from '@mui/material/Modal';

const CustomModal = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', borderRadius: '.5rem', outline: 'none'}}>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
