import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import EdituserStartup from '../Bot/addeditstartup/editstartup'; 
import DeleteuserStartup from '../Bot/addeditstartup/deletestartup'; 
import { FaDownload } from 'react-icons/fa'; 
import * as API from "../Endpoints/Endpoints";

function ViewStartupBot() {
  const [bot, setChatbots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchbot = async () => {
    try {
      const response = await axios.get(API.GET_STARTUP_API);
      setChatbots(response.data);
    } catch (error) {
      console.error('Error fetching startups:', error);
      toast.error('Failed to fetch startups');
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
      item.startuptitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startupdescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startupproblem?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startupsolution?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startuparchitect?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startuptool?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startupschedule?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startupcanvamodel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startupmarketarea?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startuprevenuemodel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startupreport?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startupimpact?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startuptechnologies?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startupsteam?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.startupvision?.toLowerCase().includes(searchQuery.toLowerCase())     
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
    yPosition += addText(item.startuptitle, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Description:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupdescription, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Problems:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupproblem, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Solution:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupsolution, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Technology Architect:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startuparchitect, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Technology Tool:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startuptool, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Schedule:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupschedule, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Business Canva:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupcanvamodel, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Market Area:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupmarketarea, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Revenue Model:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startuprevenuemodel, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Valuation Report:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupreport, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Impact:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupimpact, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Recommended Technologies:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startuptechnologies, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`STEAM Theory:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupsteam, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Vision Mission:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupvision, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    doc.save(`${item.startuptitle}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 mt-10">
     <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Startup References</h1>
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
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Technology Architect</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Technology Tool</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Schedule</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Business Canva</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Market Area</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Revenue Model</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Valuation Report</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Impact</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Recommended Technologies</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">STEAM Theory</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Vision Mission</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredBots.map((item, index) => (
              <tr key={item.startupid}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleImport(item)}
                  >
                    <FaDownload className="inline-block mr-1" /> 
                  </button>
                  <EdituserStartup startupid={item.startupid} refreshList={refreshList} /> {/* Pass refreshList */}
                  <DeleteuserStartup startupid={item.startupid} refreshList={refreshList} /> {/* Pass refreshList */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.useremail}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.organizationname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startupdescription}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startuptitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startupproblem}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startupsolution}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startuparchitect}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startuptool}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startupschedule}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startupcanvamodel}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startupmarketarea}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startuprevenuemodel}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startupreport}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startupimpact}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startuptechnologies}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startupsteam}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.startupvision}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStartupBot;
