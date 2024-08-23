
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function DeleteStartup({ itemId, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5002/research-api/startupbot/${itemId}`);
      toast.success('Research deleted successfully');
      onDeleteSuccess(); // Refresh the list after successful delete
    } catch (error) {
      console.error('Error deleting startup:', error);
      toast.error('Failed to delete startup');
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

export default DeleteStartup;
