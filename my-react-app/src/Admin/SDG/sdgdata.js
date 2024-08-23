import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditSDG from '../SDG/editsdg'; 
import DeleteSDG from '../SDG/deletesdg'; 

function ViewSDG() {
  const [bot, setChatbots] = useState([]);

  const fetchbot = async () => {
    try {
      const response = await axios.get('http://localhost:5002/research-api/sdgbot');
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
    <h1 className="text-3xl font-bold mb-6">SDG References</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-gray-300 shadow-md rounded-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold w-16">Sr no</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-72">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-72">Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-96">Problems</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-96">Solution</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-96">Logical Framework</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-96">Beneficiaries</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-72">Stakeholder</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-72">Software Recommendation</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-72">SDG Goal Alignment</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-72">Schedule</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-72">Impact</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-72">Recommended Technologies</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-72">STEAM Theory</th>
            <th className="px-6 py-3 text-left text-sm font-semibold w-28">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {bot.length > 0 ? (
            bot.map((item, index) => (
              <tr key={item.sdgid} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="px-6 py-4 w-16 align-top">{index + 1}</td>
                <td className="px-6 py-4 w-72 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgdescription}</p>
                </td>
                <td className="px-6 py-4 w-72 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgtitle}</p>
                </td>
                <td className="px-6 py-4 w-96 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgproblem}</p>
                </td>
                <td className="px-6 py-4 w-96 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgsolution}</p>
                </td>
                <td className="px-6 py-4 w-96 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgframework}</p>
                </td>
                <td className="px-6 py-4 w-96 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgbenificiaries}</p>
                </td>
                <td className="px-6 py-4 w-72 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgstakeholder}</p>
                </td>
                <td className="px-6 py-4 w-72 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgsoftware}</p>
                </td>
                <td className="px-6 py-4 w-72 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgalignment}</p>
                </td>
                <td className="px-6 py-4 w-72 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgschedule}</p>
                </td>
                <td className="px-6 py-4 w-72 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgimpact}</p>
                </td>
                <td className="px-6 py-4 w-72 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgtechnologies}</p>
                </td>
                <td className="px-6 py-4 w-72 align-top">
                  <p className="leading-relaxed whitespace-normal">{item.sdgsteam}</p>
                </td>
                <td className="px-6 py-4 w-28 align-top">
                  <EditSDG item={item} onEditSuccess={refreshList} />
                  <DeleteSDG itemId={item.sdgid} onDeleteSuccess={refreshList} />
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

export default ViewSDG;
