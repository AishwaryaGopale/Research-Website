import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditVc from '../ValueChain/editvc'; 
import DeleteVc from '../ValueChain/deletevc'; 

function ViewVc() {
  const [bot, setChatbots] = useState([]);

  const fetchbot = async () => {
    try {
      const response = await axios.get('http://localhost:5002/research-api/vcbot');
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
      <h1 className="text-3xl font-bold mb-6">Valuechain References</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-md rounded-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sr no</th> 
    <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Description</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Valuechain</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sub Valuechain</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Technology</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sub Technology</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Related Terms</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Actions</th> 
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bot.length > 0 ? (
              bot.map((item, index) => (
                <tr key={item.valuechainid} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-4 w-1/9 align-top">{index + 1}</td> {/* Serial number */}
                  <td className="px-6 py-4 w-1/9 align-top">{item.valuechaindescription}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.valuechain}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.subvaluechain}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.valuechaintechnology}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.valuechainsubtechnology}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.valuechainrelatedterms}</td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <EditVc item={item} onEditSuccess={refreshList} />
                    <DeleteVc itemId={item.valuechainid} onDeleteSuccess={refreshList} />
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

export default ViewVc;
