// DeleteResearch.js
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function DeleteSDG({ itemId, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5002/research-api/sdgbot/${itemId}`);
      toast.success('Patent deleted successfully');
      onDeleteSuccess(); 
    } catch (error) {
      console.error('Error deleting sdg:', error);
      toast.error('Failed to delete sdg');
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
