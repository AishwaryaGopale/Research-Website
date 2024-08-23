import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditPatent from '../Patent/editpatent'; 
import DeletePatent from '../Patent/deletepatent'; 

function ViewPatent() {
  const [bot, setChatbots] = useState([]);

  const fetchbot = async () => {
    try {
      const response = await axios.get('http://localhost:5002/research-api/patentbot');
      setChatbots(response.data);
    } catch (error) {
      console.error('Error fetching chatbots:', error);
      toast.error('Failed to fetch chatbots');
    }
  };

  useEffect(() => {
    fetchbot();
  }, []);

  const refreshList = () => {
    fetchbot();
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">Patent References</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-md rounded-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sr no</th> 
    <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Description</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Patent Number and claims</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Inventors</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">valuechain and patentvaluechain</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Technology and patenttechnology</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Related Terms</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Actions</th> 
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bot.length > 0 ? (
              bot.map((item, index) => (
                <tr key={item.patentid} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-4 w-1/9 align-top">{index + 1}</td> {/* Serial number */}
                  <td className="px-6 py-4 w-1/9 align-top">{item.patentdescription}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.patentnumber}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.inventors}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.patentvaluechain}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.patenttechnology}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.patentrelatedterms}</td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <EditPatent item={item} onEditSuccess={refreshList} />
                    <DeletePatent itemId={item.patentid} onDeleteSuccess={refreshList} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="px-6 py-4 text-center">No research references found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewPatent;
