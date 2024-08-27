
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../../User/Endpoints/Endpoints"

function DeleteStartup({ itemId, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      await axios.delete(API.DELETE_STARTUP_API(itemId));
      toast.success('startup deleted successfully');
      onDeleteSuccess(); 
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
