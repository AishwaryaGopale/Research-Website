// DeleteResearch.js
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function DeletePatent({ itemId, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5002/research-api/patentbot/${itemId}`);
      toast.success('Patent deleted successfully');
      onDeleteSuccess(); // Refresh the list after successful delete
    } catch (error) {
      console.error('Error deleting patent:', error);
      toast.error('Failed to delete patent');
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

export default DeletePatent;
