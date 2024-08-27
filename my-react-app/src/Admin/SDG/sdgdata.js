import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import EditSDG from '../SDG/editsdg'; 
import DeleteSDG from '../SDG/deletesdg'; 
import { FaDownload } from 'react-icons/fa'; 
import * as API from "../../User/Endpoints/Endpoints"

function ViewSDG() {
  const [bot, setChatbots] = useState([]);

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

    yPosition = addHeading(`Description:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgdescription, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Title:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgtitle, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Problems:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgproblem, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Solution:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgsolution, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Logical Framework:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgframework, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Beneficiaries:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgbenificiaries, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Stakeholder:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgstakeholder, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Software Recommendation:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgsoftware, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`SDG Goal Alignment:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgalignment, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Schedule:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgschedule, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Impact:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgimpact, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`Recommended Technologies:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgtechnologies, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    yPosition = addHeading(`STEAM Theory:`, 20, yPosition);
    yPosition = checkAndAddPage(yPosition);
    yPosition += addText(item.sdgsteam, 20, yPosition);
    yPosition = checkAndAddPage(yPosition + lineHeight);

    doc.save(`${item.sdgtitle}.pdf`);
};


  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">SDG References</h1>
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
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">SDG Goal Alignments</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Schedule</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Impact</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Recommended Technologies</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">STEAM Theory</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-1/9">Actions</th> 
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bot.length > 0 ? (
              bot.map((item, index) => (
                <tr key={item.sdgid} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-4 w-1/9 align-top">{index + 1}</td> 
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.useremail}</p>
                  </td>
                  <td className="px-6 py-4 w-1/12 align-top">
                    <p className="leading-relaxed whitespace-normal">{item.organizationname}</p>
                  </td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgdescription}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgtitle}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgproblem}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgsolution}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgframework}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgbenificiaries}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgstakeholder}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgsoftware}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgalignment}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgschedule}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgimpact}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgtechnologies}</td>
                  <td className="px-6 py-4 w-1/9 align-top">{item.sdgsteam}</td>
                  <td className="px-6 py-4 w-1/9 align-top">
                    <EditSDG item={item} onEditSuccess={refreshList} />
                    <DeleteSDG itemId={item.sdgid} onDeleteSuccess={refreshList} />
                    <button 
                      onClick={() => handleImport(item)} 
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <FaDownload />
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

export default ViewSDG;
