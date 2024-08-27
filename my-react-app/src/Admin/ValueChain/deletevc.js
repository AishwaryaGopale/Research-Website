import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../../User/Endpoints/Endpoints"

function DeleteValueChain({ itemId, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      await axios.delete(API.DELETE_VC_API(itemId));
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
