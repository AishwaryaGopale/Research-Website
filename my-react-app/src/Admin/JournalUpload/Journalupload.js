import React, { useState } from 'react';

function JournalUpload() {
  const categoryOptions = [
    { id: 1, name: "Category Master" },
    { id: 2, name: "Software IT" },
    { id: 3, name: "Hardware IT" },
    { id: 4, name: "Records" } // Fixed the duplicate id
  ];

  const [uploadedFileName, setUploadedFileName] = useState("");

  // Function to handle file input change
  const handleFileChange = (event) => {
    const fileName = event.target.files[0].name;
    setUploadedFileName(fileName);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-6"></h1>
        
        {/* Journal Upload */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Upload Journals</h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Category Dropdown */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="category">Category</label>
              <select id="category" className="border border-gray-800 rounded px-3 py-2">
                {categoryOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          {/* Themes */}
<div className="flex flex-col">
  <label className="text-sm font-semibold mb-1" htmlFor="themes">Themes</label>
  <input type="text" id="themes" className="border border-gray-800 rounded px-3 py-2" />
</div>

            {/* Publisher Name */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="publisher">Publisher Name</label>
              <input type="text" id="publisher" className="border border-gray-800 rounded px-3 py-2" />
            </div>
            {/* Month */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="month">Month</label>
              <input type="text" id="month" className="border border-gray-800 rounded px-3 py-2" />
            </div>
            {/* Year */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="year">Year</label>
              <input type="text" id="year" className="border border-gray-800 rounded px-3 py-2" />
            </div>
            {/* Volume */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="volume">Volume</label>
              <input type="text" id="volume" className="border border-gray-800 rounded px-3 py-2" />
            </div>
            {/* ISSN Number */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1" htmlFor="issn">ISSN Number</label>
              <input type="text" id="issn" className="border border-gray-800 rounded px-3 py-2" />
            </div>
            {/* Upload Button */}
            <div className="col-span-2 flex items-center">
              <label htmlFor="journalUpload" className="text-sm font-semibold mr-4">Upload Journal:</label>
              <input type="file" id="journalUpload" className="hidden" onChange={handleFileChange} />
              <label htmlFor="journalUpload" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">Choose File</label>
              {uploadedFileName && <p className="ml-4">{uploadedFileName}</p>}
            </div>
            {/* Submit Button */}
            <div className="col-span-2 flex justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">Submit</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default JournalUpload;
