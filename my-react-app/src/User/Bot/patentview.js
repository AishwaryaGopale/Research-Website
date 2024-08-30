import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from "../Endpoints/Endpoints";
import jsPDF from 'jspdf';
import EdituserPatent from '../Bot/addeditpatent/editpatent'; 
import DeleteuserPatent from '../Bot/addeditpatent/deletepatent'; 
import { FaDownload } from 'react-icons/fa'; 

function ViewPatentbot() {
  const [bot, setChatbots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchbot = async () => {
    try {
      const response = await axios.get(API.GET_PATENT_API);
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
      item.patentdescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patentnumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inventors?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patentvaluechain?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patenttechnology?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patentrelatedterms?.toLowerCase().includes(searchQuery.toLowerCase())  
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

    yPosition = addHeading(`Description:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.patentdescription, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Patent Number:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.patentnumber, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Inventors:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.inventors, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Patent Valuechain:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.patentvaluechain, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Patent Technology:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.patenttechnology, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Patent Related Terms:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.patentrelatedterms, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    doc.save(`${item.patentdescription}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patent References</h1>
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
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Actions</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sr no</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">User Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Organization Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Patent Number and Claims</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Inventors</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Value Chain and Patent Value Chain</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Technology and Patent Technology</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Related Terms</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredBots.length > 0 ? (
              filteredBots.map((item, index) => (
                <tr key={item.startupid} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-4 w-1/12 align-top">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleImport(item)}
                    >
                      <FaDownload className="inline-block mr-1" />
                    </button>
                    <EdituserPatent item={item.patentid} refreshList={refreshList} />
                    <DeleteuserPatent itemId={item.patentid} refreshList={refreshList} />
                  </td>
                  <td className="px-6 py-4 w-1/9 align-top">{index + 1}</td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.useremail}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.organizationname}</p>
                  </td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.patentdescription}</p>
                  </td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.patentnumber}</p>
                  </td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.inventors}</p>
                  </td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.patentvaluechain}</p>
                  </td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.patenttechnology}</p>
                  </td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.patentrelatedterms}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewPatentbot;
