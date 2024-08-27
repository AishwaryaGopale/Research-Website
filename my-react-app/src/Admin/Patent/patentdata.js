import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import EditPatent from '../Patent/editpatent'; 
import DeletePatent from '../Patent/deletepatent'; 
import { FaDownload } from 'react-icons/fa';
import * as API from "../../User/Endpoints/Endpoints" 

function ViewPatent() {
  const [bot, setChatbots] = useState([]);

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

  const handleImport = (item) => {
    const doc = new jsPDF();
    const lineHeight = 10;
    const maxWidth = 180;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;
  
    const addText = (text, x, y) => {
      const splitText = doc.splitTextToSize(text, maxWidth);
      doc.text(splitText, x, y);
      return splitText.length * lineHeight;
    };
  
    const checkAndAddPage = (currentYPosition) => {
      if (currentYPosition + lineHeight > pageHeight - 20) {
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
  
    yPosition = addHeading(`Patent Description:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.patentdescription || '', 10, yPosition);
  
    yPosition = addHeading(`Patent Number and Claims:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.patentnumber || '', 10, yPosition);
  
    yPosition = addHeading(`Inventors:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.inventors || '', 10, yPosition);
  
    yPosition = addHeading(`Value Chain and Patent Value Chain:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.patentvaluechain || '', 10, yPosition);
  
    yPosition = addHeading(`Technology and Patent Technology:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.patenttechnology || '', 10, yPosition);
  
    yPosition = addHeading(`Related Terms:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.patentrelatedterms || '', 10, yPosition);
  
    doc.save(`${item.patentdescription || 'Patent'}.pdf`);
  };
  
  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">Patent References</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-md rounded-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sr no</th> 
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">User Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">organization name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Patent Number and Claims</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Inventors</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Value Chain and Patent Value Chain</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Technology and Patent Technology</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Related Terms</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Actions</th> 
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bot.length > 0 ? (
              bot.map((item, index) => (
                <tr key={item.patentid} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-4 w-1/9 align-top">{index + 1}</td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.useremail}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.organizationname}</p>
                  </td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.patentdescription}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.patentnumber}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.inventors}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.patentvaluechain}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.patenttechnology}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.patentrelatedterms}</td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <div className="block">
                      <div className="mb-2">
                        <EditPatent item={item} onEditSuccess={refreshList} />
                      </div>
                      <div className="mb-2">
                        <DeletePatent itemId={item.patentid} onDeleteSuccess={refreshList} />
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
                <td colSpan="16" className="px-6 py-4 text-center">No research references found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewPatent;
