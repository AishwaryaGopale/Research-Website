import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ViewVcbot() {
  const [bot, setChatbots] = useState([]);

  useEffect(() => {
    const fetchbot = async () => {
      try {
        const response = await axios.get('http://localhost:5002/research-api/vcbot');
        setChatbots(response.data);
      } catch (error) {
        console.error('Error fetching chatbots:', error);
        toast.error('Failed to fetch chatbots');
      }
    };
    fetchbot();
  }, []);

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">Valuechain References</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-gray-300 shadow-md rounded-md">
  <thead className="bg-gray-800 text-white">
    <tr>
    <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sr no</th>
    <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">User Email</th>
    <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">organization name</th>
    <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Description</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Valuechain</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sub valuechain</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Technology</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sub Technology</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Related Terms</th>
    </tr>
  </thead>
  <tbody className="text-gray-700">
    {bot.length > 0 ? (
      bot.map((item, index) => (
        <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-100">
          <td className="px-6 py-4 w-1/9 align-top">{index + 1}</td>
          <td className="px-6 py-4 w-1/12 align-top">
           <p className="leading-relaxed whitespace-normal">{item.useremail}</p>
           </td>
           <td className="px-6 py-4 w-1/12 align-top">
           <p className="leading-relaxed whitespace-normal">{item.organizationname}</p>
           </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.valuechaindescription}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.valuechain}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.subvaluechain}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.valuechaintechnology}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.valuechainsubtechnology}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.valuechainrelatedterms}</p>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="15" className="px-6 py-4 text-center">No chatbots found</td>
      </tr>
    )}
  </tbody>
</table>
      </div>
    </div>
  );
}

export default ViewVcbot;
