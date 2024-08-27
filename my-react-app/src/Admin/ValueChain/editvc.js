// EditResearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../../User/Endpoints/Endpoints"

function EditPatent({ item, onEditSuccess }) {
  const [formData, setFormData] = useState(item);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    try {
      await axios.put(API.UPDATE_VC_API(item), formData);
      toast.success('vc updated successfully');
      onEditSuccess(); // Refresh the list after successful edit
    } catch (error) {
      console.error('Error updating vc:', error);
      toast.error('Failed to update vc');
    }
  };

  return (
    <div>
      <button
        onClick={() => handleEdit()}
        className="text-blue-500 hover:underline"
      >
        Edit
      </button>
    </div>
  );
}

export default EditPatent;
