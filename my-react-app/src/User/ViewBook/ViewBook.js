import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ViewBook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5002/research-api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to fetch books');
      }
    };
    fetchBooks();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">View Books</h1>
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
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="px-6 py-4">{book.category}</td>
                <td className="px-6 py-4">{book.themes}</td>
                <td className="px-6 py-4">{book.publishername}</td>
                <td className="px-6 py-4">{book.month}</td>
                <td className="px-6 py-4">{book.year}</td>
                <td className="px-6 py-4">{book.volume}</td>
                <td className="px-6 py-4">{book.issn}</td>
                <td className="px-6 py-4">
                  <a href={book.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline cursor-auto mr-2">
                    View
                  </a>
                  <a href={book.fileUrl} download={book.fileName} className="text-blue-500 cursor-auto hover:underline">
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {books.length === 0 && <p className="mt-4 text-center">No books found</p>}
    </div>
  );
}

export default ViewBook;
