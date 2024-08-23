import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import EditResearch from '../Research/editresearch'; 
import DeleteResearch from '../Research/deleteresearch'; 
import { FaDownload } from 'react-icons/fa'; 

function ViewResearch() {
  const [bot, setChatbots] = useState([]);

  const fetchbot = async () => {
    try {
      const response = await axios.get('http://localhost:5002/research-api/researchbot');
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
      <h1 className="text-3xl font-bold mb-6">Research References</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-md rounded-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sr no</th> 
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">User Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/12">organization name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Industry</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Themes</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Research Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Objectives</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Introduction</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Abstraction</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Bibliography</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Methodology</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Hypothesis</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Likert Scale Questionnaire</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Sample Dataset</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Statistical Testing</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Inferences</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Conclusion</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Actions</th> 
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bot.length > 0 ? (
              bot.map((item, index) => (
                <tr key={item.researchid} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-4 w-1/9 align-top">{index + 1}</td> {/* Serial number */}
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.useremail}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.organizationname}</p>
                  </td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.resdescription}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.industry}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.themes}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.researchtitle}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.objectives}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.introduction}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.abstraction}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.bibliography}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.methodology}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.hypothesis}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.likertscale}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.dataset}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.stattesting}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.inferences}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.conclusion}</td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <EditResearch item={item} onEditSuccess={refreshList} />
                    <DeleteResearch itemId={item.researchid} onDeleteSuccess={refreshList} />
                    <button 
                      onClick={() => handleImport(item)} 
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <FaDownload /> {/* Download icon */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="17" className="px-6 py-4 text-center">No research references found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewResearch;
