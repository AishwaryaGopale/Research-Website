import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ViewJournal() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get('http://localhost:5002/research-api/journals');
        setJournals(response.data);
      } catch (error) {
        console.error('Error fetching journals:', error);
        toast.error('Failed to fetch journals');
      }
    };
    fetchJournals();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">View Journals</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-md rounded-md">
          <thead className="bg-gray-800 text-white">
            <tr>
            
              <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Themes</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Publisher Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Month</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Year</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Volume</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">ISSN</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Journal Link</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">journalFile</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {journals.map((journal) => (
              <tr key={journal.id} className="border-b border-gray-300 hover:bg-gray-100">
               
                <td className="px-6 py-4">{journal.category}</td>
                <td className="px-6 py-4">{journal.themes}</td>
                <td className="px-6 py-4">{journal.publishername}</td>
                <td className="px-6 py-4">{journal.month}</td>
                <td className="px-6 py-4">{journal.year}</td>
                <td className="px-6 py-4">{journal.volume}</td>
                <td className="px-6 py-4">{journal.issn}</td>
                <td className="px-6 py-4">{journal.link}</td>
                <td className="px-6 py-4">
                  <a href={journal.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline cursor-auto mr-2">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {journals.length === 0 && <p className="mt-4 text-center">No journals found</p>}
    </div>
  );
}

export default ViewJournal;
