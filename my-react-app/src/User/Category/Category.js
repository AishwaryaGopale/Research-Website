import React from 'react';

function Category() {
  const categoryOptions = [
    { id: 1, name: "Category Master" },
    { id: 2, name: "Software IT" },
    { id: 3, name: "Hardware IT" },
    { id: 4, name: "Records" } // Fixed the duplicate id
  ];

  return (
    <div>
      {/* Category Upload */}
      <div>
        <h2 className="text-xl font-bold mb-4">Category</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1" htmlFor="category">Category </label>
            <select id="category" className="border rounded px-3 py-2">
              {categoryOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
