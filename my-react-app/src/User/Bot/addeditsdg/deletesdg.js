import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../../Endpoints/Endpoints"

function DeleteuserSDG({ sdgid, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      await axios.delete(API.DELETE_VC_API(sdgid));
      toast.success('VC deleted successfully');
      onDeleteSuccess(); // Refresh the list after successful delete
    } catch (error) {
      console.error('Error deleting VC:', error);
      toast.error('Failed to delete VC');
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

export default DeleteuserSDG;
