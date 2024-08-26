import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function JournalUpload() {
  const [formState, setFormState] = useState({
    category: '',
    themes: '',
    publishername: '',
    month: '',
    year: '',
    volume: '',
    issn: '',
    link: 'https://drive.google.com/drive/folders/1MIgVkTVNg-F4QfcFvzIrDo6utn2VIBro?usp=sharing', // Default link
    journalFile: null,
  });

  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFileName(file ? file.name : '');
    setFormState((prevState) => ({ ...prevState, journalFile: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('category', formState.category);
    formData.append('themes', formState.themes);
    formData.append('publishername', formState.publishername);
    formData.append('month', formState.month);
    formData.append('year', formState.year);
    formData.append('volume', formState.volume);
    formData.append('issn', formState.issn);
    formData.append('link', formState.link);
    formData.append('journalFile', formState.journalFile);
  
    try {
      await axios.post('http://localhost:5002/research-api/createjournal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Reset form state after successful submission
      setFormState({
        category: '',
        themes: '',
        publishername: '',
        month: '',
        year: '',
        volume: '',
        issn: '',
        link: '', 
        journalFile: null,
      });
      setUploadedFileName('');
      toast.success('Journal uploaded successfully');
    } catch (error) {
      console.error('Error uploading journal:', error);
      const errorMessage = error.response?.data?.error || 'Failed to upload journal';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-6">Upload Journals</h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formState.category}
                onChange={handleInputChange}
                className="border border-gray-800 rounded px-3 py-2"
              >
                <option value="">Select Category</option>
                <option value="Hardware IT">Hardware IT</option>
                <option value="Software IT">Software IT</option>
                <option value="Records">Records</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="themes">Themes</label>
              <input
                type="text"
                id="themes"
                name="themes"
                value={formState.themes}
                onChange={handleInputChange}
                className="border border-gray-800 rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="publishername">Publisher Name</label>
              <input
                type="text"
                id="publishername"
                name="publishername"
                value={formState.publishername}
                onChange={handleInputChange}
                className="border border-gray-800 rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="month">Month</label>
              <input
                type="text"
                id="month"
                name="month"
                value={formState.month}
                onChange={handleInputChange}
                className="border border-gray-800 rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="year">Year</label>
              <input
                type="text"
                id="year"
                name="year"
                value={formState.year}
                onChange={handleInputChange}
                className="border border-gray-800 rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="volume">Volume</label>
              <input
                type="text"
                id="volume"
                name="volume"
                value={formState.volume}
                onChange={handleInputChange}
                className="border border-gray-800 rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="issn">ISSN Number</label>
              <input
                type="text"
                id="issn"
                name="issn"
                value={formState.issn}
                onChange={handleInputChange}
                className="border border-gray-800 rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="link">Link</label>
              <input
                type="text"
                id="link"
                name="link"
                value={formState.link}
                onChange={handleInputChange}
                className="border border-gray-800 rounded px-3 py-2 mb-2"
              />
              <a 
                href={formState.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline"
              >
                Open Link
              </a>
            </div>

            <div className="col-span-2 flex items-center">
              <label htmlFor="journalUpload" className="text-sm font-semibold mr-4">Upload Journal:</label>
              <input type="file" id="journalUpload" className="hidden" onChange={handleFileChange} />
              <label htmlFor="journalUpload" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
                Choose File
              </label>
              {uploadedFileName && <p className="ml-4">{uploadedFileName}</p>}
            </div>
            <div className="col-span-2 flex justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JournalUpload;