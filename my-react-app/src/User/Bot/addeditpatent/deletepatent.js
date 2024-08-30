import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../../Endpoints/Endpoints"

function DeleteuserPatent({ itemId, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      await axios.delete(API.DELETE_PATENT_API(itemId));
      toast.success('Startup deleted successfully');
      onDeleteSuccess(); // Refresh the list after successful delete
    } catch (error) {
      console.error('Error deleting startup:', error);
      toast.error('Failed to delete startup');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:underline"
    >
      Delete
    </button>
  );
}

export default DeleteuserPatent;
