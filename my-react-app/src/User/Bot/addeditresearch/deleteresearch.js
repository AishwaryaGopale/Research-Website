// DeleteResearch.js
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../../Endpoints/Endpoints"

function DeleteuserResearch({ itemId, onDeleteSuccess }) {
  
  const handleDelete = async () => {
    try {
      await axios.delete(API.DELETE_RESEARCH_API(itemId));
      toast.success('Research deleted successfully');
      onDeleteSuccess(); // Refresh the list after successful delete
    } catch (error) {
      console.error('Error deleting research:', error);
      toast.error('Failed to delete research');
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

export default DeleteuserResearch;
