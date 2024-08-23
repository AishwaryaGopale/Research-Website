import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const JournalView = () => {
  const [journal, setJournal] = useState(null);
  const { journalid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/journalget/${journalid}`);
        setJournal(response.data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [journalid]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this journal?')) {
      try {
        await axios.delete(`http://localhost:5002/api/journal/${journalid}`);
        console.log('Journal deleted successfully');
        // Redirect to home page or any other page after deletion
      } catch (error) {
        console.error('Error deleting journal:', error);
      }
    }
  };

 
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <p>Journal Details</p>
        </div>
        <div className="p-6">
          {journal && (
            <>
              <div className="mb-4">
                <strong>ID:</strong>
                <span className="ml-2">{journalid}</span>
              </div>
              <div className="mb-4">
                <strong>themes:</strong>
                <span className="ml-2">{journal.themes}</span>
              </div>
              <div className="mb-4">
                <strong>month:</strong>
                <span className="ml-2">{journal.month}</span>
              </div>
              <div className="mb-4">
                <strong>volume:</strong>
                <span className="ml-2">{journal.volume}</span>
              </div>
              <div className="mb-4">
                <strong>publishername:</strong>
                <span className="ml-2">{journal.publishername}</span>
              </div>
              <div className="mb-4">
                <strong>Acknowledgement:</strong>
                <span className="ml-2">{journal.acknowledgement}</span>
              </div>
              <div className="mb-4">
                <strong>Publisher Name:</strong>
                <span className="ml-2">{journal.publishername}</span>
              </div>
              <div className="mb-4">
                <strong>year:</strong>
                <span className="ml-2">{journal.year}</span>
              </div>
              
              <div className="mb-4">
                <strong>issn:</strong>
                <span className="ml-2">{journal.issn}</span>
              </div>
             
              
              <div className="flex space-x-2 mt-6">
                <Link to={`/journalupdate/${journalid}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">Edit</button>
                </Link>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
               
                <Link to="/jtable">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded">Go Back</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalView;
