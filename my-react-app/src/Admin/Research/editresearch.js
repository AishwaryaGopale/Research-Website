// EditResearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditResearch({ item, onEditSuccess }) {
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
      await axios.put(`http://localhost:5002/research-api/researchbot/${item.researchid}`, formData);
      toast.success('Research updated successfully');
      onEditSuccess(); // Refresh the list after successful edit
    } catch (error) {
      console.error('Error updating research:', error);
      toast.error('Failed to update research');
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
      {/* You can add more UI elements to edit fields if needed */}
    </div>
  );
}

export default EditResearch;
