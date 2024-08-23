// EditResearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditSDG({ item, onEditSuccess }) {
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
      await axios.put(`http://localhost:5002/research-api/sdgbot/${item.sdgid}`, formData);
      toast.success('SDG updated successfully');
      onEditSuccess(); 
    } catch (error) {
      console.error('Error updating SDG:', error);
      toast.error('Failed to update SDG');
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

export default EditSDG;
