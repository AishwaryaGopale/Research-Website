// DeleteSDG.js
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function DeleteSDG({ itemId, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5002/research-api/sdgdb/${itemId}`);
      toast.success('SDG deleted successfully');
      onDeleteSuccess(); // Refresh the list after successful delete
    } catch (error) {
      console.error('Error deleting SDG:', error);
      toast.error('Failed to delete SDG');
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

export default DeleteSDG;
