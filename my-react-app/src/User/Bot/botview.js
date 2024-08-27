import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../Endpoints/Endpoints"

function ViewChatbot() {
  const [bot, setChatbots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchbot = async () => {
      try {
        const response = await axios.get(API.GET_RESEARCH_API);
        console.log(response.data);  // Log the response to check the structure
        setChatbots(response.data);
      } catch (error) {
        console.error('Error fetching chatbots:', error);
        toast.error('Failed to fetch chatbots');
      }
    };
    
    fetchbot();
  }, []);

  // Filter the bots based on the search query
  const filteredBots = bot.filter((item) => {
    return (
      item.useremail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organizationname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.resdescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.themes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.researchtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.objectives?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.introduction?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.abstraction?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bibliography?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.methodology?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hypothesis?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.likertscale?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dataset?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stattesting?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inferences?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.conclusion?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Research References</h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-md rounded-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Sr no</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">User Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Organization Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Industry</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Themes</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Research Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Objectives</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Introduction</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Abstraction</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Bibliography</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Methodology</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Hypothesis</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Likert Scale</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Dataset</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Stat Testing</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Inferences</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Conclusion</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredBots.length > 0 ? (
              filteredBots.map((item, index) => (
                <tr key={item.researchid} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-4 w-1/12 align-top">{index + 1}</td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.useremail}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.organizationname}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.resdescription}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.industry}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.themes}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.researchtitle}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.objectives}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.introduction}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.abstraction}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.bibliography}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.methodology}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.hypothesis}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.likertscale}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.dataset}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.stattesting}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.inferences}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.conclusion}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="18" className="text-center py-4">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewChatbot;
