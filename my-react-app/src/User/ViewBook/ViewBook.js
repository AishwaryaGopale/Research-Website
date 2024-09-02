import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../Endpoints/Endpoints";

function ViewBook() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API.GET_BOOK_API);
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to fetch books');
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const searchLowercased = searchQuery.toLowerCase();
    const filtered = books.filter(book =>
      Object.values(book).some(value =>
        value.toString().toLowerCase().includes(searchLowercased)
      )
    );
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

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
        <h1 className="text-3xl font-bold">View Books</h1>
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
              <th className="px-6 py-3 text-left text-sm font-semibold">Book File</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-4">{highlightText(book.category)}</td>
                  <td className="px-6 py-4">{highlightText(book.themes)}</td>
                  <td className="px-6 py-4">{highlightText(book.publishername)}</td>
                  <td className="px-6 py-4">{highlightText(book.month)}</td>
                  <td className="px-6 py-4">{highlightText(book.year)}</td>
                  <td className="px-6 py-4">{highlightText(book.volume)}</td>
                  <td className="px-6 py-4">{highlightText(book.issn)}</td>
                  <td className="px-6 py-4">
                    <a href={book.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline cursor-auto mr-2">
                      View
                    </a>
                    <a href={book.fileUrl} download={book.fileName} className="text-blue-500 cursor-auto hover:underline">
                      Download
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewBook;
