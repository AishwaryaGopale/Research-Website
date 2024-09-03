import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import EdituserVC from '../Bot/addeditvc/editvc';
import DeleteuserVC from '../Bot/addeditvc/deletevc';
import { FaDownload } from 'react-icons/fa';
import * as API from "../Endpoints/Endpoints";

function ViewVcbot() {
  const [bot, setChatbots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchbot = async () => {
    try {
      const response = await axios.get(API.GET_VALUECHAIN_API);
      setChatbots(response.data);
    } catch (error) {
      console.error('Error fetching valuechain data:', error);
      toast.error('Failed to fetch valuechain data');
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
      item.valuechaindescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.valuechain?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subvaluechain?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.valuechaintechnology?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.valuechainsubtechnology?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.valuechainrelatedterms?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.taxonomy?.toLowerCase().includes(searchQuery.toLowerCase())
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

    // Adding details to the PDF
    yPosition = addHeading(`Organization Name:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.organizationname, 10, yPosition);

    yPosition = addHeading(`User Email:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.useremail, 10, yPosition);

    yPosition = addHeading(`Valuechain:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.valuechain, 10, yPosition);

    yPosition = addHeading(`Sub Valuechain:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.subvaluechain, 10, yPosition);

    yPosition = addHeading(`Technology:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.valuechaintechnology, 10, yPosition);

    yPosition = addHeading(`Sub Technology:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.valuechainsubtechnology, 10, yPosition);

    yPosition = addHeading(`Related Terms:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.valuechainrelatedterms, 10, yPosition);

    yPosition = addHeading(`Taxonomy:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.taxonomy, 10, yPosition);

    doc.save(`${item.valuechain}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Valuechain References</h1>
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
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Valuechain</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sub Valuechain</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Technology</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sub Technology</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Related Terms</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Taxonomy</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredBots.length > 0 ? (
              filteredBots.map((item, index) => (
                <tr key={item.valuechainid} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-4 w-1/12 align-top">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleImport(item)}
                    >
                      <FaDownload className="inline-block mr-1" /> 
                    </button>
                    <EdituserVC valuechainid={item.valuechainid} refreshList={refreshList} />
                    <DeleteuserVC valuechainid={item.valuechainid} refreshList={refreshList} />
                  </td>
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
                  <td className="px-6 py-4 w-1/9 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.taxonomy}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No Valuechain References found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewVcbot;
