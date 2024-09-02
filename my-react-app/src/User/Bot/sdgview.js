import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import EdituserSDG from '../Bot/addeditsdg/editsdg'; 
import DeleteuserSDG from '../Bot/addeditsdg/deletesdg'; 
import { FaDownload } from 'react-icons/fa'; 
import * as API from "../Endpoints/Endpoints";

function Viewsdgbot() {
  const [bot, setChatbots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchbot = async () => {
    try {
      const response = await axios.get(API.GET_SDG_API);
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

  const filteredBots = bot.filter((item) => {
    return (
      item.useremail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organizationname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgdescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgproblem?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgsolution?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgframework?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgbenificiaries?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgstakeholder?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgsoftware?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgalignment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgschedule?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgimpact?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgtechnologies?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sdgsteam?.toLowerCase().includes(searchQuery.toLowerCase())     
    );
  });


  const handleImport = (item) => {
    const doc = new jsPDF();
    let yPosition = 20; 
    const lineHeight = 10;
    const maxWidth = 180; 
    const pageHeight = doc.internal.pageSize.height;

    const addText = (text, x, y) => {
      const splitText = doc.splitTextToSize(text, maxWidth);
      doc.text(splitText, x, y);
      return splitText.length * lineHeight; 
    };

    const checkAndAddPage = (currentYPosition) => {
      if (currentYPosition + lineHeight > pageHeight) {
        doc.addPage();
        return 20; 
      }
      return currentYPosition;
    };

    const addHeading = (heading, x, y) => {
      doc.setFont('helvetica', 'bold');
      y += addText(heading, x, y);
      doc.setFont('helvetica', 'normal');
      return y;
    };

    yPosition = addHeading(`Organization name:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.organizationname, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`User name:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.useremail, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Title:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgtitle, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Description:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgdescription, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Problems:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgproblem, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Solution:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgsolution, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Logical Framework:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgframework, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Beneficiaries:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgbenificiaries, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Stakeholder:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgstakeholder, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Software Recommendation:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgsoftware, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`SDG Goal Alignment:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgalignment, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Schedule:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgschedule, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Impact:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgimpact, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Recommended Technologies:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgtechnologies, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`STEAM Theory:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgsteam, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    doc.save(`${item.sdgtitle}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 mt-10">
     <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">SDG References</h1>
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
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Actions</th> {/* Added Actions column */}
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sr no</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">User Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Organization Name</th>
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
          <tbody>
            {filteredBots.map((item, index) => (
              <tr key={item.sdgid} className="border-b">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                  <div> <EdituserSDG bot={item} refreshList={refreshList} /> </div> 
                  <div> <DeleteuserSDG sdgid={item.sdgid} refreshList={refreshList} /></div>
                  <div> <button onClick={() => handleImport(item)} className="text-blue-600 hover:text-blue-800">
                      <FaDownload />
                    </button> </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.useremail}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.organizationname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgdescription}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgtitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgproblem}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgsolution}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgframework}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgbenificiaries}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgstakeholder}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgsoftware}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgalignment}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgschedule}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgimpact}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgtechnologies}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sdgsteam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Viewsdgbot;
