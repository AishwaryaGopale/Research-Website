import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function DeleteValueChain({ itemId, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5002/research-api/valuechaindb/${itemId}`);
      toast.success('Value Chain deleted successfully');
      onDeleteSuccess(); // Refresh the list after successful delete
    } catch (error) {
      console.error('Error deleting Value Chain:', error);
      toast.error('Failed to delete Value Chain');
    }
  };

  return (
    <button
      onClick={() => handleDelete()}
      className="text-red-500 hover:underline"
    >
      Delete
    </button>
  );
}

export default DeleteValueChain;
