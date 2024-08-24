import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Viewsdgbot() {
  const [bot, setChatbots] = useState([]);

  useEffect(() => {
    const fetchbot = async () => {
      try {
        const response = await axios.get('http://localhost:5002/research-api/sdgbot');
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
      <h1 className="text-3xl font-bold mb-6">Research References</h1>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-gray-300 shadow-md rounded-md">
  <thead className="bg-gray-800 text-white">
    <tr>
    <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sr no</th>
    <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">User Email</th>
    <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">organization name</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Description</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Title</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Problems</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Solution</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Logical Framework</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Beneficiaries</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Stakeholder</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Software Recommendation</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">SDG Goal Alignment</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Schedule</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Impact</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Recommended Technologies</th>
      <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">STEAM Theory</th>
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
            <p className="leading-relaxed whitespace-normal">{item.sdgdescription}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgtitle}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgproblem}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgsolution}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgframework}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgbenificiaries}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgstakeholder}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgsoftware}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgalignment}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgschedule}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgimpact}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgtechnologies}</p>
          </td>
          <td className="px-6 py-4 w-1/9 align-top">
            <p className="leading-relaxed whitespace-normal">{item.sdgsteam}</p>
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

export default Viewsdgbot;
