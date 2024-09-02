import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../Endpoints/Endpoints";

function ViewJournal() {
  const [journals, setJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJournals, setFilteredJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get(API.GET_JOURNAL_API);
        setJournals(response.data);
        setFilteredJournals(response.data);
      } catch (error) {
        console.error('Error fetching journals:', error);
        toast.error('Failed to fetch journals');
      }
    };
    fetchJournals();
  }, []);

  useEffect(() => {
    const searchLowercased = searchQuery.toLowerCase();
    const filtered = journals.filter(journal =>
      Object.values(journal).some(value =>
        value.toString().toLowerCase().includes(searchLowercased)
      )
    );
    setFilteredJournals(filtered);
  }, [searchQuery, journals]);

  const highlightText = (text) => {
    if (!searchQuery) return text;
    const parts = text.toString().split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">View Journals</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md px-3 py-2"
        />
      </div>
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
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredJournals.length > 0 ? (
              filteredJournals.map((journal, index) => (
                <tr
                  key={journal.id}
                  className={`border-b border-gray-300 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                >
                  <td className="px-6 py-4">{highlightText(journal.category)}</td>
                  <td className="px-6 py-4">{highlightText(journal.themes)}</td>
                  <td className="px-6 py-4">{highlightText(journal.publishername)}</td>
                  <td className="px-6 py-4">{highlightText(journal.month)}</td>
                  <td className="px-6 py-4">{highlightText(journal.year)}</td>
                  <td className="px-6 py-4">{highlightText(journal.volume)}</td>
                  <td className="px-6 py-4">{highlightText(journal.issn)}</td>
                  <td className="px-6 py-4">
                    <a href={journal.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View File
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">No journals found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewJournal;
