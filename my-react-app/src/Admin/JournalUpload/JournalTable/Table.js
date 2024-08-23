import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 500;

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/journalget");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteJournal = async (journalid) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`http://localhost:5002/api/journal/${journalid}`);
        console.log('Success: Deleted successfully');
        // Remove the deleted item from the data array
        setData(data.filter(item => item.journalid !== journalid));
      } catch (error) {
        console.error('Error deleting journal:', error);
      }
    }
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <Link to="/addjournal">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Journal</button>
        </Link>
       
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">No</th>
              <th className="px-4 py-2 border-b">category</th>
              <th className="px-4 py-2 border-b">themes</th>
              <th className="px-4 py-2 border-b">month</th>
              <th className="px-4 py-2 border-b">volume</th>
              <th className="px-4 py-2 border-b">publishername</th>
              <th className="px-4 py-2 border-b">year</th>
              <th className="px-4 py-2 border-b">issn</th>
              
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.journalid} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{item.category}</td>
                <td className="px-4 py-2 border-b">{item.themes}</td>
                <td className="px-4 py-2 border-b">{item.month}</td>
                <td className="px-4 py-2 border-b">{item.volume}</td>
                <td className="px-4 py-2 border-b">{item.publishername}</td>
                <td className="px-4 py-2 border-b">{item.year}</td>
                <td className="px-4 py-2 border-b">{item.issn}</td>
                <td className="px-4 py-2 border-b flex space-x-2">
                  <Link to={`/journalupdate/${item.journalid}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                  </Link>
                  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => deleteJournal(item.journalid)}>Delete</button>
                  <Link to={`/journalview/${item.journalid}`}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
      </div>
    </div>
  );
};

export default Table;
