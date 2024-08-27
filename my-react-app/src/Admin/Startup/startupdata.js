import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import EditStartup from '../Startup/editstartup'; 
import DeleteStartup from '../Startup/deletestartup'; 
import { FaDownload } from 'react-icons/fa';
import * as API from "../../User/Endpoints/Endpoints" 

function Viewstartup() {
  const [bot, setChatbots] = useState([]);

  const fetchbot = async () => {
    try {
      const response = await axios.get(API.GET_STARTUP_API);
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

    yPosition = addHeading(`Business Canvas:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.startupcanvamodel, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Addressable Market Area:`, 10, yPosition);
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
      <h1 className="text-3xl font-bold mb-6">Startup References</h1>
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
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Technology Architect</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Technology Tool</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Schedule</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Business Canvas</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Addressable Market Area</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Revenue Model</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Valuation Report</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Impact</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Recommended Technologies</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">STEAM Theory</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Vision Mission</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Actions</th> 
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bot.length > 0 ? (
                bot.map((item, index) => (
                  <tr key={item.startupid} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="px-6 py-4 w-1/9 align-top">{index + 1}</td>
                    <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.useremail}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.organizationname}</p>
                  </td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startupdescription}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startuptitle}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startupproblem}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startupsolution}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startuparchitect}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startuptool}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startupschedule}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startupcanvamodel}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startupmarketarea}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startuprevenuemodel}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startupreport}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startupimpact}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startuptechnologies}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startupsteam}</td>
                    <td className="px-6 py-4 w-1/9 align-top">{item.startupvision}</td>
                    <td className="px-6 py-4 w-1/9 align-top">
                      <div className="block">
                        <div className="mb-2">
                          <EditStartup startup={item} onEdit={refreshList} />
                        </div>
                        <div className="mb-2">
                          <DeleteStartup itemId={item.startupid} onDeleteSuccess={refreshList} />
                        </div>
                        <div className="ml-2 text-blue-500 hover:text-blue-700">
                          <button onClick={() => handleImport(item)}>
                            <FaDownload />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="17" className="px-6 py-4 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Viewstartup;
