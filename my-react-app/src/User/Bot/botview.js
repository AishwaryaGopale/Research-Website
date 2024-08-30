import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import EdituserResearch from '../Bot/addeditresearch/editresearch'; 
import DeleteuserResearch from '../Bot/addeditresearch/deleteresearch'; 
import { FaDownload } from 'react-icons/fa'; 
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

  const handleImport = (item) => {
    const doc = new jsPDF();
    let yPosition = 20; 
    const lineHeight = 10;
    const maxWidth = 180; 
    const pageHeight = doc.internal.pageSize.height;

    // Utility function to add text with word wrapping
    const addText = (text, x, y) => {
        const splitText = doc.splitTextToSize(text, maxWidth);
        doc.text(splitText, x, y);
        return splitText.length * lineHeight; 
    };

    // Utility function to check if a new page is needed
    const checkAndAddPage = (currentYPosition) => {
        if (currentYPosition + lineHeight > pageHeight) {
            doc.addPage();
            return 20; 
        }
        return currentYPosition;
    };

    // Utility function to add a heading
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

    yPosition = addHeading(`Research Title:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.researchtitle, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Description:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.resdescription, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Industry:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.industry, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Themes:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.themes, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Objectives:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.objectives, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Introduction:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.introduction, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Abstraction:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.abstraction, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Bibliography:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.bibliography, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Methodology:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.methodology, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Hypothesis:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.hypothesis, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Likert Scale Questionnaire:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.likertscale, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Sample Dataset:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.dataset, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight); 

    yPosition = addHeading(`Statistical Testing:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.stattesting, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Inferences:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.inferences, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Conclusion:`, 10, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.conclusion, 10, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    doc.save(`${item.researchtitle}.pdf`);
  };

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
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Actions</th> {/* Added Actions column */}
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Sr No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">User Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">Research Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-4/12">Research Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Industry</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Themes</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">Objectives</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">Introduction</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Abstraction</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">Bibliography</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">Methodology</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">Hypothesis</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">Likert Scale Questionnaire</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">Sample Dataset</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">Statistical Testing</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">Inferences</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-2/12">Conclusion</th>
            </tr>
          </thead>
          <tbody>
            {filteredBots.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="px-6 py-4 whitespace-nowrap">
                  <EdituserResearch item={item} /> {/* Edit action */}
                  <DeleteuserResearch item={item} /> {/* Delete action */}
                  <button
                    className="text-blue-500 hover:underline ml-2"
                    onClick={() => handleImport(item)}
                    title="Export as PDF"
                  >
                    <FaDownload />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.useremail}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.researchtitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.resdescription}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.industry}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.themes}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.objectives}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.introduction}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.abstraction}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.bibliography}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.methodology}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.hypothesis}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.likertscale}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.dataset}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.stattesting}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.inferences}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.conclusion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewChatbot;
