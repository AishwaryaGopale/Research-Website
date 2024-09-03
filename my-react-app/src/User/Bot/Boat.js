import React, { useState, useEffect } from 'react';
import { TbBorderCorners, TbArrowsMinimize, TbChevronsDown } from "react-icons/tb";
import { SiGooglemessages } from "react-icons/si";
import { GoSync } from "react-icons/go";
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as API from "../Endpoints/Endpoints"

function Chatbot() {
  const [showPopup, setShowPopup] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [popupSize, setPopupSize] = useState({ width: '400px', height: '700px' });
  const [messages, setMessages] = useState([
    { text: "Hi, I am here to help you. How can I assist you today?", sender: "bot" }
  ]);
  const [description, setDescription] = useState("");
  const[prompt, setPrompt]=useState("");
  const [selectedResearchTitle, setSelectedResearchTitle] = useState('');
  const [researchTitles, setResearchTitles] = useState('');
  const [researchobjective, setResearchobjective] = useState([]);
  const [researchintroduction, setResearchintroduction] = useState('');
  const[researchabstraction, setResearchabstraction]=useState('');
  const[researchbibliography, setResearchbibliography]=useState('');
  const[researchmethodology, setResearchmethodology]=useState('');
   const [researchHypothesis, setResearchHypothesis] = useState([]);
  const [researchQuestionnaire, setResearchQuestionnaire] = useState('');
  const [researchDataset, setResearchDataset] = useState('');
  const [researchStatistical, setResearchStatistical] = useState('');
  const [researchInferences, setResearchInferences] = useState('');
  const [researchConclusion, setResearchConclusion] = useState('');
  const [selectedHypotheses, setSelectedHypotheses] = useState([]);
  const [selectedObjective, setSelectedObjective] = useState([]);
  const [researchSTEAM, setresearchSTEAM] = useState('');
  const [industry, setIndustry] = useState('');
  const [themes, setThemes] = useState('');
  const [Convertedidea, setConvertedidea] = useState('');
  const [petent, setPetent] = useState('');
  const [valuechain, setValuechain] = useState('');
  const [showButtons, setShowButtons] = useState('');
  const [selectedstartupTitle, setselectedstartupTitle] = useState('');
  const [startupTitles, setstartupTitles] = useState('');
  const [startupproblem, setstartupproblem] = useState('');
  const [startupsolution,setstartupsolution] = useState('');
  const [startuptechnology,setstartuptechnology] = useState('');
  const [startupintervention, setstartupintervention] = useState('');
  const [startupschedule, setstartupschedule] = useState('');
  const [startupcanva, setstartupcanva] = useState('');
  const [startupmarketarea, setstartupmarketarea] = useState('');
  const [startuprevenue, setstartuprevenue] = useState('');
  const [startupvaluation, setstartupvaluation] = useState('');
  const [startupImapact, setstartupImapact] = useState('');
  const [startuprecomtechnologies, setstartuprecomtechnologies] = useState('');
  const [startupSTEAM, setstartupSTEAM] = useState('');
  const [startupvision, setstartupvision] = useState('');
  const [petentnumber, setpetentnumber] = useState('');
  const [petentinventor, setpetentinventor] = useState('');
  const [petentvaluechain, setpetentvaluechain] = useState('');
   const [petenttechnology, setpetenttechnology] = useState('');
   const [petentterms, setpetentterms] = useState('');
   const [successMessage, setSuccessMessage] = useState('');
   const [valuechainbutton, setvaluechainbutton] = useState('');
   const [subvaluechain, setsubvaluechain] = useState('');
   const [technology, settechnology] = useState('');
   const [subtechnology, setsubtechnology] = useState('');
   const [valuechainterms, setvaluechainterms] = useState('');
   const [sdgTitles, setsdgTitles] = useState('');
   const [selectedSDGTitle, setselectedSDGTitle] = useState('');
   const [sdgproblem, setsdgproblem] = useState('');
   const [sdgSolution, setsdgSolution] = useState('');
   const [sdgframework, setsdgframework] = useState('');
   const [sdgbeneficiaries, setsdgbeneficiaries] = useState('');
   const [sdgstakeholder, setsdgstakeholder] = useState('');
   const [sdgrecommendation, setsdgrecommendation] = useState('');
   const [sdgalignment, setsdgalignment] = useState('');
   const [sdgschedule, setsdgschedule] = useState('');
   const [sdgimpact, setsdgimpact] = useState('');
   const [sdgrectechnologies, setsdgrectechnologies] = useState('');
   const [sdgSTEAM, setsdgSTEAM] = useState('');
   const [showSDGbuttons, setshowSDGbuttons] = useState('');
   const [response, setResponse] = useState("");
   const [loading, setLoading] = useState(false);
   const [casestudy, setcasestudy] = useState(false);
   const [taxonomy, settaxonomy] = useState(false);
   //////////////////////loading//////////////////
   const [researchtitleloading, setresearchtitleloading] = useState(false);
   const [researchobjloading,setresearchobjloading] = useState(false);
   const [researchintroloading,setresearchintroloading] = useState(false);
   const [researchabstractloading,setresearchabstractloading] = useState(false);
   const [researchbiblioloading,setresearchbiblioloading] = useState(false);
   const [researchmethodloading,setresearchmethodloading] = useState(false);
   const [researchhypoloading,setresearchhypoloading] = useState(false);
   const [researchquestionloading,setresearchquestionloading] = useState(false);
   const [researchdatasetloading, setresearchdatasetloading] = useState(false);
   const [researchstatloading, setresearchstatloading] = useState(false);
   const [researchinferenceloading, setresearchinferenceloading] = useState(false);
   const [researchconclusionloading, setresearchconclusionloading] = useState(false);
   const [researchsteamloading, setresearchsteamloading] = useState(false);
   const [startuptitleloading, setstartuptitleloading] = useState(false);
   const [startupproblemloading, setstartupproblemloading] = useState(false);
   const [startupsolloading, setstartupsolloading] = useState(false);
   const [startuptechnoloading, setstartuptechnoloading] = useState(false);
   const [startupinterventionloading, setstartupinterventionloading] = useState(false);
   const [startupscheduleloading, setstartupscheduleloading] = useState(false);
   const [startupcanvaloading, setstartupcanvaloading] = useState(false);  
   const [startupmarketloading, setstartupmarketloading] = useState(false);  
   const [startuprevenueloading, setstartuprevenueloading] = useState(false);  
   const [startupimpactloading, setstartupimpactloading] = useState(false);  
   const [startuprecomloading, setstartuprecomloading] = useState(false);  
   const [startupvaluationloading, setstartupvaluationloading] = useState(false);  
   const [startupsteamloading, setstartupsteamloading] = useState(false); 
   const [startupvisionloading, setstartupvisionloading] = useState(false);
   const [patentnumloading, setpatentnumloading] = useState(false);
   const [patentinventorloading, setpatentinventorloading] = useState(false);
   const [patentvalueloading, setpatentvalueloading] = useState(false);
   const [patenttechloading, setpatenttechloading] = useState(false);
   const [patenttermloading, setpatenttermloading] = useState(false);
   const [valuechainloading, setvaluechainloading] = useState(false);
   const [subvaluechainloading, setsubvaluechainloading] = useState(false);
   const [valuechaintechloading, setvaluechaintechloading] = useState(false);
   const [valuechainsubtechloading, setvaluechainsubtechloading] = useState(false);
   const [valuechaintermloading, setvaluechaintermloading] = useState(false);
   const [sdgtitleloading, setsdgtitleloading] = useState(false);
   const [sdgproblemloading, setsdgproblemloading] = useState(false);
   const [sdgsolutionloading, setsdgsolutioloading] = useState(false);
   const [sdgframeloading, setsdgframeloading] = useState(false);
   const [sdgbenifitloading, setsdgbenifitloading] = useState(false);
   const [sdgstakeholderloading, setsdgstakeholderloading] = useState(false);
   const [sdgrecommloading, setsdgreommloading] = useState(false);
   const [sdgalignloading, setsdgalignloading] = useState(false);
   const [sdgscheduleloading, setsdgscheduleloading] = useState(false);
   const [sdgimpactloading, setsdgimpactloading] = useState(false);
   const [sdgtechloading, setsdgtechloading] = useState(false);
   const [sdgsteamloading, setsdgsteamloading] = useState(false);
   const [casestudyloading, setcasestudyloading] = useState(false);
   const [taxonomyloading, settaxonomyloading] = useState(false);
   const userId = localStorage.getItem("id");
  console.log("Selected Research Title",selectedResearchTitle)
  useEffect(() => {
    // Scroll to the bottom of the message container when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setIsFullScreen(false);
  };

  const resizePopup = () => {
    if (!isFullScreen) {
      if (popupSize.width === '400px') {
        setPopupSize({ width: '800px', height: '700px' });
      } else {
        setPopupSize({ width: '400px', height: '700px' });
      }
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      setPopupSize({ width: '100%', height: '100%' });
    } else {
      setPopupSize({ width: '400px', height: '700px' });
    }
    setIsFullScreen(!isFullScreen);
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsFullScreen(false);
  };

  const handleRefresh = () => {
    // Reset the chatbot state
    setMessages([
      { text: "Hi, I am here to help you. How can I assist you today?", sender: "bot" }
    ]);
    setDescription('');
    setShowButtons('');
    setConvertedidea('');
    setPetent('');
    setValuechain('');
    setshowSDGbuttons('');
    setcasestudy('');
  };

/////////////////for research button/////////
  const handleresearchClick = () => {
    setShowButtons(!showButtons);
  }

  const handleResearchTitleClick = async () => {
    const researchTitlePrompt = `Give me at least 5 research titles for ${description}, industry: ${industry} and themes: ${themes}`;
    setPrompt(researchTitlePrompt);
    setresearchtitleloading(true);
    await quantile(researchTitlePrompt);
  };

  const handleResearchObjectivesClick = async () => {
    const researchObjectivesPrompt = `Give research objectives for the following title: ${selectedResearchTitle}`;
    setPrompt(researchObjectivesPrompt);
    setresearchobjloading(true);
    await quantile(researchObjectivesPrompt);
  };

  const handleTitleSelection = (title) => {
    setSelectedResearchTitle(title);
  };
  const handleObjectiveSelection=(objective)=>{
    setSelectedObjective(objective);
  };

const handleIntroductionClick = async() => {
  const researchintroductionPrompt = `Give research introduction for the following title: ${selectedResearchTitle}`;
    setPrompt(researchintroductionPrompt);
    setresearchintroloading(true);
    await quantile(researchintroductionPrompt);
};

const handleAbstractionClick = async() => {
  const researchabstractionPrompt = `Give research abstraction for the following title: ${selectedResearchTitle}`;
  setPrompt(researchabstractionPrompt);
  setresearchabstractloading(true);
  await quantile(researchabstractionPrompt);
};

const handleBibliographyClick = async () => {
  const researchbibliographyPrompt = `Give research bibliography for the following title: ${selectedResearchTitle}`;
  setresearchbiblioloading(true);
  await quantile(researchbibliographyPrompt);
};

const handleMethodologyClick = async() => {
  const researchmethodologyPrompt = `Give research methodology for the following title: ${selectedResearchTitle}`;
  setPrompt(researchmethodologyPrompt);
  setresearchmethodloading(true);
  await quantile(researchmethodologyPrompt);
};

const handleHypothesisClick = async () => {
  const researchHypothesisPrompt = `Give me at least 5 research hypotheses for the following title: ${selectedResearchTitle}`;
  setPrompt(researchHypothesisPrompt);
  setresearchhypoloading(true);
  await quantile(researchHypothesisPrompt);
};

const handleQuestionaryonClick = async () => {
  const selectedHypothesesText = selectedHypotheses.join(', ');
  const researchQuestionnairePrompt = `Give me a Likert scale questionnaire for the following title: ${selectedResearchTitle} and hypotheses: ${selectedHypothesesText}`;
  setPrompt(researchQuestionnairePrompt);
  setresearchquestionloading(true);
  await quantile(researchQuestionnairePrompt);
};

const handledatasetClick = async () => {
  const selectedHypothesesText = selectedHypotheses.join(', ');
  const researchDatasetPrompt = `Give sample datasets for the following title: ${selectedResearchTitle} and hypotheses: ${selectedHypothesesText}`;
  setPrompt(researchDatasetPrompt);
  setresearchdatasetloading(true);
  await quantile(researchDatasetPrompt);
};

const handlestatisticalClick = async () => {
  const selectedHypothesesText = selectedHypotheses.join(', ');
  const researchStatisticalPrompt = `Give statistical tests for the following title: ${selectedResearchTitle}, description: ${description}, hypotheses: ${selectedHypothesesText}, and Dataset: ${researchDataset}`;
  setPrompt(researchStatisticalPrompt);
  setresearchstatloading(true);
  await quantile(researchStatisticalPrompt);
};

const handleInferencesClick = async () => {
  const researchInferencesPrompt = `Give research inferences for the following description: ${description},title: ${selectedResearchTitle}, and Statistical Tests:${researchStatistical} `;
  setPrompt(researchInferencesPrompt);
  setresearchinferenceloading(true);
  await quantile(researchInferencesPrompt);
};

const handleConclusionClick = async () => {
  const researchConclusionPrompt = `Give research conclusion for the following description: ${description},title: ${selectedResearchTitle}, and Inferences:${researchInferences}`;
  setPrompt(researchConclusionPrompt);
  setresearchconclusionloading(true);
  await quantile(researchConclusionPrompt);
};
const handleresearchSTEAMClick = async() => {
  const researchSTEAMPrompt = `Give research STEAM Theory(Science,Technology,Engieering,Arts,Mathematics) for the following title: ${selectedResearchTitle}`;
    setPrompt(researchSTEAMPrompt);
    setresearchsteamloading(true);
    await quantile(researchSTEAMPrompt);
};

///////////////////startup button /////////////////
const handlestartupClick =() => {
  setConvertedidea(!Convertedidea);
};

const handlestartupTitleClick = async () => {
  const startupTitlePrompt = `Give me at least 5 startup titles for ${description}`;
  setPrompt(startupTitlePrompt);
  setstartuptitleloading(true);
  await quantile(startupTitlePrompt);
};
const handlestartupTitleSelection = (title) => {
  setselectedstartupTitle(title);
};
const handlestartupProblemClick = async() => {
  const startupproblemPrompt = `Give startup problem for the following title: ${selectedstartupTitle}`;
    setPrompt(startupproblemPrompt);
    setstartupproblemloading(true);
    await quantile(startupproblemPrompt);
};
const handlestartupSolutionClick = async() => {
  const startupsolutionPrompt = `Give startup solution for the following title: ${selectedstartupTitle}`;
    setPrompt(startupsolutionPrompt);
    setstartupsolloading(true);
    await quantile(startupsolutionPrompt);
};
const handlestartupTechnologyClick = async() => {
  const startuptechnologyPrompt = `Give startup technology architect idea for the following title: ${selectedstartupTitle}`;
    setPrompt(startuptechnologyPrompt);
    setstartuptechnoloading(true);
    await quantile(startuptechnologyPrompt);
};      
const handlestartupInterventionClick = async() => {
  const startupinterventionPrompt = `Give startup idea of AI intervention of any technology tool for the following title: ${selectedstartupTitle}`;
    setPrompt(startupinterventionPrompt);
    setstartupinterventionloading(true);
    await quantile(startupinterventionPrompt);
};
const handlestartupScheduleClick = async() => {
  const startupschedulePrompt = `Give startup idea schedule for the following title: ${selectedstartupTitle}`;
    setPrompt(startupschedulePrompt);
    setstartupscheduleloading(true);
    await quantile(startupschedulePrompt);
};
const handlestartupCanvaClick = async() => {
  const startupcanvaPrompt = `Give business canva model startup idea for the following title: ${selectedstartupTitle}`;
    setPrompt(startupcanvaPrompt);
    setstartupcanvaloading(true);
    await quantile(startupcanvaPrompt);
};
const handlestartupmarketareaClick = async() => {
  const startupmarketareaPrompt = `Give Addressable Market Area startup idea for the following title: ${selectedstartupTitle}`;
    setPrompt(startupmarketareaPrompt);
    setstartupmarketloading(true);
    await quantile(startupmarketareaPrompt);
};
const handlestartuprevenueClick = async() => {
  const startuprevenuePrompt = `Give Revenue Model startup idea for the following title: ${selectedstartupTitle}`;
  setPrompt(startuprevenuePrompt);
  setstartuprevenueloading(true);
  await quantile(startuprevenuePrompt);
};
const handlestartupImapactClick = async() => {
  const startupImapactPrompt = `Give impacts of startup idea for the following title: ${selectedstartupTitle}`;
  setPrompt(startupImapactPrompt);
  setstartupimpactloading(true);
  await quantile(startupImapactPrompt);
};
const handlestartupvaluationClick = async() => {
  const startupvaluationPrompt = `Give Valuation Report using competitive comparable startup idea for the following title: ${selectedstartupTitle}`;
    setPrompt(startupvaluationPrompt);
    setstartupvaluationloading(true);
    await quantile(startupvaluationPrompt);
};
const handlestartuprecomtechnologiesClick = async() => {
  const startuprecomtechnologiesPrompt = `Give Recommended Technologies for startup idea for the following title: ${selectedstartupTitle}`;
    setPrompt(startuprecomtechnologiesPrompt);
    setstartuprecomloading(true);
    await quantile(startuprecomtechnologiesPrompt);
};
const handlestartupSTEAMClick = async() => {
  const startupSTEAMPrompt = `Give startup related STEAM Theory(Science,Technology,Engieering,Arts,Mathematics) for the following title: ${selectedstartupTitle}`;
    setPrompt(startupSTEAMPrompt);
    setstartupsteamloading(true);
    await quantile(startupSTEAMPrompt);
};
const handlestartupvisionClick = async() => {
  const startupvisionPrompt = `Give startup related vision mission for the following title: ${selectedstartupTitle}`;
    setPrompt(startupvisionPrompt);
    setstartupvisionloading(true);
    await quantile(startupvisionPrompt);
};

//////////////////petant button///////////
const handlepetentClick = () => {
  setPetent(!petent);
};

const handlepetentnumberClick = async() => {
  const petentnumberPrompt = `Give patent number with company name,reference link for each country for the following description: ${description}`;
    setPrompt(petentnumberPrompt);
    setpatentnumloading(true);
    await quantile(petentnumberPrompt);
};

const handlepetentinventorClick = async() => {
  const petentinventorPrompt = `Give patent inventors for the following description: ${description}`;
    setPrompt(petentinventorPrompt);
    setpatentinventorloading(true);
    await quantile(petentinventorPrompt);
};

const handlepetentvaluechainClick = async() => {
  const petentvaluechainPrompt = `Give valuechain and Patent valuechain for the following description: ${description}`;
    setPrompt(petentvaluechainPrompt);
    setpatentvalueloading(true);
    await quantile(petentvaluechainPrompt);
};

const handlepetenttechnologyClick = async() => {
  const petenttechnologyPrompt = `Give Technology and Patent Technology for the following description: ${description}`;
    setPrompt(petenttechnologyPrompt);
    setpatenttechloading(true);
    await quantile(petenttechnologyPrompt);
};

const handlepetenttermsClick = async() => {
  const petenttermsPrompt = `Give patent Related Terms using n-gram for the following description: ${description}`;
    setPrompt(petenttermsPrompt);
    setpatenttermloading(true);
    await quantile(petenttermsPrompt);
};

/////////////value chain button//////////
const handlevaluechainClick = async () => {
  setValuechain(!valuechain);
};

const handlevaluechainbuttonClick = async() => {
  const valuechainPrompt = `Give ValueChain and technology for the following description: ${description}`;
    setPrompt(valuechainPrompt);
    setvaluechainloading(true);
    await quantile(valuechainPrompt);
};

const handlesubvaluechainClick = async() => {
  const subvaluechainPrompt = `Give related Sub valuechain for the following description: ${description}`;
    setPrompt(subvaluechainPrompt);
    setsubvaluechainloading(true);
    await quantile(subvaluechainPrompt);
};

const handletechnologyClick = async() => {
  const technologyPrompt = `Give related technologies for the following description: ${description}`;
    setPrompt(technologyPrompt);
    setvaluechaintechloading(true);
    await quantile(technologyPrompt);
};

const handlesubtechnologyClick = async() => {
  const subtechnologyPrompt = `Give related sub technologies for the following description: ${description}`;
    setPrompt(subtechnologyPrompt);
    setvaluechainsubtechloading(true);
    await quantile(subtechnologyPrompt);
};

const handlevaluechaintermsClick = async() => {
  const valuechaintermsPrompt = `Give Related Terms of valuechain for the following description: ${description}`;
    setPrompt(valuechaintermsPrompt);
    setvaluechaintermloading(true);
    await quantile(valuechaintermsPrompt);
};

const handleTaxonomyClick = async() => {
  const taxonomyPrompt = `Give related taxonomy for the following description: ${description},valuechain: ${valuechainbutton},subvaluechain: ${subvaluechain},Technology: ${technology} and subtechnology: ${subtechnology}`;
    setPrompt(taxonomyPrompt);
    settaxonomyloading(true);
    await quantile(taxonomyPrompt);
};

////////////////sdg project///////////
const handlesdgprojectClick =() => {
  setshowSDGbuttons(!showSDGbuttons);
};

const handleSDGTitleClick = async () => {
  const sdgTitlePrompt = `Give me at least 5 sustainable development goals(sdg) titles for ${description}`;
  setPrompt(sdgTitlePrompt);
  setsdgtitleloading(true);
  await quantile(sdgTitlePrompt);
};

const handleSDGTitleSelection = (title) => {
  setselectedSDGTitle(title);
};

const handlesdgProblemClick = async() => {
  const sdgProblemPrompt = `Give related sdg Problem Statement for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgProblemPrompt);
    setsdgproblemloading(true);
    await quantile(sdgProblemPrompt);
};

const handlesdgSolutionClick = async() => {
  const sdgSolutionPrompt = `Give related sdg solution for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgSolutionPrompt);
    setsdgsolutioloading(true);
    await quantile(sdgSolutionPrompt);
};

const handlesdgframeworkClick = async() => {
  const sdgframeworkPrompt = `Give sdg logical frameworks for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgframeworkPrompt);
    setsdgframeloading(true);
    await quantile(sdgframeworkPrompt);
};

const handlesdgbeneficiariesClick = async() => {
  const sdgbeneficiariesPrompt = `Give sdg Beneficiaries for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgbeneficiariesPrompt);
    setsdgbenifitloading(true);
    await quantile(sdgbeneficiariesPrompt);
};

const handlesdgstakeholderClick = async() => {
  const sdgstakeholderPrompt = `Give sdg stakeholder for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgstakeholderPrompt);
    setsdgstakeholderloading(true);
    await quantile(sdgstakeholderPrompt);
};

const handlesdgrecommendationClick = async() => {
  const sdgrecommendationPrompt = `Give Software Recommendation for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgrecommendationPrompt);
    setsdgreommloading(true);
    await quantile(sdgrecommendationPrompt);
};

const handlesdgalignmentClick = async() => {
  const sdgalignmentPrompt = `Give SDG Goal Alignments for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgalignmentPrompt);
    setsdgalignloading(true);
    await quantile(sdgalignmentPrompt);
};

const handlesdgscheduleClick = async() => {
  const sdgschedulePrompt = `Give SDG Schedule for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgschedulePrompt);
    setsdgscheduleloading(true);
    await quantile(sdgschedulePrompt);
};

const handlesdgimpactClick = async() => {
  const sdgimpactPrompt = `Give SDG impacts for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgimpactPrompt);
    setsdgimpactloading(true);
    await quantile(sdgimpactPrompt);
};

const handlesdgrectechnologiesClick = async() => {
  const sdgrectechnologiesPrompt = `Give recommended technologies for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgrectechnologiesPrompt);
    setsdgtechloading(true);
    await quantile(sdgrectechnologiesPrompt);
};

const handlesdgSTEAMClick = async() => {
  const sdgSTEAMPrompt = `Give SDG related STEAM Theory(Science,Technology,Engieering,Arts,Mathematics,Humanity) for the following description: ${selectedSDGTitle}`;
    setPrompt(sdgSTEAMPrompt);
    setsdgsteamloading(true);
    await quantile(sdgSTEAMPrompt);
};

////////////////////////case study/////////////
const handlecaseClick = async() => {
const casestudyprompt = `Please make a case study on how Einstein evolved Einsteins relativativty equation Title Page,Title,Authors,Date,Executive Summary,Overview,Purpose,Key Takeaways,Introduction,Background,Problem Statement,Objectives,Methodology,Approach,Data Collection,Analysis,Company/Subject Overview,History,Industry Context,Current Status,Analysis,Findings,Challenges,Solutions,Results,Outcomes,Impact,Key Metrics,Discussion,Interpretation,Comparison,Lessons Learned,Conclusion,Summary,Recommendations,Future Work,References,Appendices,Supplementary Information for the following description: ${description}`;
setPrompt(casestudyprompt);
setcasestudyloading(true);
await quantile(casestudyprompt);
};

///////////////////quantile api//////////////
const quantile = async (prompt) => {
  const url = `https://quantileapibeta.online/call_cascading?prompt=${encodeURIComponent(prompt)}&max_tokens=500`;
  const apiKey = "quant-3rzCLlkmjyamQWB4oW1jF";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "quant-api-key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const contentText = data.content?.[0]?.text || data.choices?.[0]?.message?.content || "";
   
    console.log("API Response:", contentText); // Debugging: Log the response
    setResponse(data);
    ////////////for research button///////
    if (prompt.includes("research titles")) {
      const titles = contentText
        .split("\n")
        .filter((line) => /^\d+\.\s/.test(line))
        .map((line) => line.replace(/^\d+\.\s/, ""));
      setResearchTitles(titles);
     } else if (prompt.includes("research objectives")) {
        setResearchobjective(contentText.split('\n').filter(obj => obj.trim().length > 0));
      } else if (prompt.includes("research introduction")) {
      setResearchintroduction(contentText);
    } else if (prompt.includes("research abstraction")) {
      setResearchabstraction(contentText);
    } else if (prompt.includes("research bibliography")) {
      setResearchbibliography(contentText);
    } else if (prompt.includes("research methodology")) {
      setResearchmethodology(contentText);
    } else if (prompt.includes("research hypotheses")) {
        setResearchHypothesis(contentText.split('\n').filter(hypothesis => hypothesis.trim().length > 0));
      } else if (prompt.includes("Likert scale questionnaire")) {
      setResearchQuestionnaire(contentText);
    } else if (prompt.includes("Give sample datasets")) {
      setResearchDataset(contentText);
    } else if (prompt.includes("Give statistical tests")) {
      setResearchStatistical(contentText);
    } else if (prompt.includes("Give research inferences")) {
      setResearchInferences(contentText);
    } else if (prompt.includes("Give research conclusion")) {
      setResearchConclusion(contentText);
    } else if (prompt.includes("research STEAM Theory(Science,Technology,Engieering,Arts,Mathematics)")) {
      setresearchSTEAM(contentText);
      ///////////////for startup button//////////////
    } else if (prompt.includes("startup titles")) {
      const titles = contentText
        .split("\n")
        .filter((line) => /^\d+\.\s/.test(line))
        .map((line) => line.replace(/^\d+\.\s/, ""));
        setstartupTitles(titles);
      } else if (prompt.includes("startup problem")) {
        setstartupproblem(contentText);
      } else if (prompt.includes("startup solution")) {
        setstartupsolution(contentText);
      } else if (prompt.includes("startup technology architect idea")) {
        setstartuptechnology(contentText);
      } else if (prompt.includes(" startup idea of AI intervention of any technology tool")) {
        setstartupintervention(contentText);
      } else if (prompt.includes("startup idea schedule")) {
        setstartupschedule(contentText);
      } else if (prompt.includes(" business canva model startup idea")) {
        setstartupcanva(contentText);
      } else if (prompt.includes("Addressable Market Area startup idea")) {
        setstartupmarketarea(contentText);
      } else if (prompt.includes("Revenue Model startup idea")) {
        setstartuprevenue(contentText);
      } else if (prompt.includes("impacts of startup idea")) {
        setstartupImapact(contentText);
      } else if (prompt.includes("Valuation Report using competitive comparable startup idea")) {
        setstartupvaluation(contentText);
      } else if (prompt.includes("Recommended Technologies for startup idea")) {
        setstartuprecomtechnologies(contentText);
      } else if (prompt.includes("startup related STEAM Theory(Science,Technology,Engieering,Arts,Mathematics)")) {
        setstartupSTEAM(contentText);
      } else if (prompt.includes("Give startup related vision mission")) {
        setstartupvision(contentText); 
        ////////////for petent button///////////
      } else if (prompt.includes("patent number with company name,reference link for each country")) {
        setpetentnumber(contentText);
      } else if (prompt.includes("patent inventors")) {
        setpetentinventor(contentText);
      } else if (prompt.includes("valuechain and Patent valuechain")) {
        setpetentvaluechain(contentText);
      } else if (prompt.includes("Technology and Patent Technology")) {
        setpetenttechnology(contentText);
      } else if (prompt.includes("patent Related Terms using n-gram")) {
        setpetentterms(contentText);
        ///////////////for valuechain button//////////
      } else if (prompt.includes("ValueChain and technology")) {
        setvaluechainbutton(contentText);
      } else if (prompt.includes("related Sub valuechain")) {
        setsubvaluechain(contentText);
      } else if (prompt.includes("related technologies")) {
        settechnology(contentText);
      } else if (prompt.includes("related sub technologies")) {
        setsubtechnology(contentText);
      } else if (prompt.includes("Related Terms of valuechain")) {
        setvaluechainterms(contentText);
      } else if (prompt.includes("Give related taxonomy")) {
        settaxonomy(contentText);
        ///////////sdg project button/////////////
      } else if (prompt.includes("sustainable development goals(sdg) titles")) {
        const titles = contentText
          .split("\n")
          .filter((line) => /^\d+\.\s/.test(line))
          .map((line) => line.replace(/^\d+\.\s/, ""));
          setsdgTitles(titles);  
        } else if (prompt.includes("related sdg Problem Statement")) {
          setsdgproblem(contentText);
        } else if (prompt.includes("related sdg solution")) {
          setsdgSolution(contentText);
        } else if (prompt.includes("sdg logical frameworks")) {
          setsdgframework(contentText);
        } else if (prompt.includes("sdg Beneficiaries")) {
          setsdgbeneficiaries(contentText); 
        } else if (prompt.includes("sdg stakeholder")) {
          setsdgstakeholder(contentText);
        } else if (prompt.includes("Software Recommendation")) {
          setsdgrecommendation(contentText);
        } else if (prompt.includes("SDG Goal Alignments")) {
          setsdgalignment(contentText);
        } else if (prompt.includes("SDG Schedule")) {
          setsdgschedule(contentText);
        } else if (prompt.includes("SDG impacts")) {
          setsdgimpact(contentText); 
        } else if (prompt.includes("recommended technologies")) {
          setsdgrectechnologies(contentText);
        } else if (prompt.includes("Give SDG related STEAM Theory(Science,Technology,Engieering,Arts,Mathematics,Humanity)")) {
          setsdgSTEAM(contentText); 
        } else if (prompt.includes("Please make a case study on how Einstein evolved Einsteins relativativty equation Title Page,Title,Authors,Date,Executive Summary,Overview,Purpose,Key Takeaways,Introduction,Background,Problem Statement,Objectives,Methodology,Approach,Data Collection,Analysis,Company/Subject Overview,History,Industry Context,Current Status,Analysis,Findings,Challenges,Solutions,Results,Outcomes,Impact,Key Metrics,Discussion,Interpretation,Comparison,Lessons Learned,Conclusion,Summary,Recommendations,Future Work,References,Appendices,Supplementary Information for the following description")) {
          setcasestudy(contentText);  
        } 
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setresearchtitleloading(false);
    setresearchobjloading(false);
    setresearchintroloading(false);
    setresearchabstractloading(false);
    setresearchbiblioloading(false);
    setresearchmethodloading(false);
    setresearchhypoloading(false);
    setresearchquestionloading(false);
    setresearchdatasetloading(false);
    setresearchstatloading(false);
    setresearchinferenceloading(false);
    setresearchconclusionloading(false);
    setresearchsteamloading(false);
    setstartuptitleloading(false);
    setstartupproblemloading(false);
    setstartupsolloading(false);
    setstartuptechnoloading(false);
    setstartupinterventionloading(false);
    setstartupscheduleloading(false);
    setstartupcanvaloading(false);
    setstartupmarketloading(false);
    setstartuprevenueloading(false);
    setstartupimpactloading(false);
    setstartuprecomloading(false);
    setstartupvaluationloading(false);
    setstartupsteamloading(false);
    setstartupvisionloading(false);
    setpatentnumloading(false);
    setpatentinventorloading(false);
    setpatentvalueloading(false);
    setpatenttechloading(false);
    setpatenttermloading(false);
    setvaluechainloading(false);
    setsubvaluechainloading(false);
    setvaluechaintechloading(false);
    setvaluechainsubtechloading(false);
    setvaluechaintermloading(false);
    setsdgtitleloading(false);
    setsdgproblemloading(false);
    setsdgsolutioloading(false);
    setsdgframeloading(false);
    setsdgbenifitloading(false);
    setsdgstakeholderloading(false);
    setsdgreommloading(false);
    setsdgalignloading(false);
    setsdgscheduleloading(false);
    setsdgimpactloading(false);
    setsdgtechloading(false);
    setsdgsteamloading(false);
    setcasestudyloading(false);
  }
};
//////////////////all submit db buttons///////////////
const handleSubmit = async () => {
  const payload = {
    researchtitle:selectedResearchTitle,
    resdescription:description,
    industry:industry,
    themes:themes,
    objectives:selectedObjective ,
    introduction: researchintroduction,
    abstraction: researchabstraction,
    bibliography: researchbibliography,
    methodology: researchmethodology,
    hypothesis: selectedHypotheses,
    likertscale: researchQuestionnaire,
    dataset: researchDataset,
    stattesting: researchStatistical,
    inferences: researchInferences,
    conclusion: researchConclusion,
    researchsteam: researchSTEAM,
    regid:userId,
  };
  try {
    const response = await axios.post(API.POST_RESEARCH_API, payload);
    console.log('Data submitted successfully:', response.data);
    setSuccessMessage('Data submitted successfully!');
    setDescription('');
    setResearchTitles('');
    setIndustry('');
    setThemes('');
    setSelectedResearchTitle('');
    setResearchobjective('');
    setResearchintroduction('');
    setResearchabstraction('');
    setResearchbibliography('');
    setResearchmethodology('');
    setResearchHypothesis('');
    setResearchQuestionnaire('');
    setResearchDataset('');
    setResearchStatistical('');
    setResearchInferences('');
    setResearchConclusion('');
    setresearchSTEAM('');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};

const handleStartupSubmit = async () => {
  const payload = {
    startupdescription:description,
    startuptitle:selectedstartupTitle,
    startupproblem:startupproblem,
    startupsolution:startupsolution,
    startuparchitect:startuptechnology,
    startuptool:startupintervention,
    startupschedule:startupschedule,
    startupcanvamodel:startupcanva,
    startupmarketarea:startupmarketarea,
    startuprevenuemodel:startuprevenue,
    startupreport:startupvaluation,
    startupimpact:startupImapact,
    startuptechnologies:startuprecomtechnologies,
    startupsteam:startupSTEAM,
    startupvision:startupvision,
    regid:userId,
  };
  try {
    const response = await axios.post(API.POST_STARTUP_API, payload);
    console.log('Data submitted successfully:', response.data);
    setSuccessMessage('Data submitted successfully!');
    setDescription('');
    setstartupTitles('');
    setselectedstartupTitle('');
    setstartupproblem('');
    setstartupsolution('');
    setstartuptechnology('');
    setstartupintervention('');
    setstartupschedule('');
    setstartupcanva('');
    setstartupmarketarea('');
    setstartuprevenue('');
    setstartupImapact('');
    setstartupvaluation('');
    setstartuprecomtechnologies('');
    setstartupSTEAM('');
    setstartupvision('');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};

const handlepatentSubmit = async () => {
  const payload = {
    patentdescription: description,
    patentnumber: petentnumber,
    inventors: petentinventor, 
    patentvaluechain: petentvaluechain, 
    patenttechnology: petenttechnology, 
    patentrelatedterms: petentterms, 
    regid:userId,
  };
  try {
    const response = await axios.post(API.POST_PATENT_API, payload);
    console.log('Data submitted successfully:', response.data);
    setSuccessMessage('Data submitted successfully!');  
    setDescription('');
    setpetentnumber('');
    setpetentinventor('');
    setpetentvaluechain('');
    setpetenttechnology('');
    setpetentterms('');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};

const handlevaluechainSubmit = async () => {
  const payload = {
    valuechaindescription:description,
    valuechain:valuechainbutton,
    subvaluechain:subvaluechain,
    valuechaintechnology:technology,
    valuechainsubtechnology:subtechnology,
    valuechainrelatedterm:valuechainterms,
    taxonomy:taxonomy,
    regid:userId,
  };
  try {
    const response = await axios.post(API.POST_VALUECHAIN_API, payload);
    console.log('Data submitted successfully:', response.data);
    setSuccessMessage('Data submitted successfully!');
    setDescription('');
    setvaluechainbutton('');
    setsubvaluechain('');
    settechnology('');
    setsubtechnology('');
    setvaluechainterms('');
    settaxonomy('');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};

const handlesdgSubmit = async () => {
  const payload = {
    sdgdescription:description,
    sdgtitle:selectedSDGTitle,
    sdgproblem:sdgproblem,
    sdgsolution:sdgSolution,
    sdgframework:sdgframework,
    sdgbenificiaries:sdgbeneficiaries,
    sdgstakeholder:sdgstakeholder,
    sdgsoftware:sdgrecommendation,
    sdgalignment:sdgalignment,
    sdgschedule:sdgschedule,
    sdgimpact:sdgimpact,
    sdgtechnologies:sdgrectechnologies,
    sdgsteam:sdgSTEAM,
    regid:userId,
  };
  try {
    const response = await axios.post(API.POST_SDG_API, payload);
    console.log('Data submitted successfully:', response.data);
    setSuccessMessage('Data submitted successfully!');
    setDescription('');
    setsdgTitles('');
    setselectedSDGTitle('');
    setsdgproblem('');
    setsdgSolution('');
    setsdgframework('');
    setsdgbeneficiaries('');
    setsdgstakeholder('');
    setsdgrecommendation('');
    setsdgalignment('');
    setsdgschedule('');
    setsdgimpact('');
    setsdgrectechnologies('');
    setsdgSTEAM('');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};

  return (
    <div>
      <div className="flex justify-end items-end h-screen p-4">
        {!showPopup && (
          <button onClick={togglePopup} className="bg-[orange] hover:bg-[orange] text-white hover:text-[black] font-[30px] py-2 px-4 rounded">
            <SiGooglemessages />
          </button> )}
        <div>
          {showPopup && (
            <div className={`fixed top-0 right-0 rounded-[10px] shadow-md border-2 border-black`} style={{ width: popupSize.width, height: popupSize.height, backgroundColor: 'white', overflow: 'auto' }}>
              <div className="flex justify-between items-center p-4 rounded-[10px] bg-blue-800 text-white">
                <div>
                  <h2 className="text-lg font-bold">Virtual CHATBOT</h2>
                </div>
                <div className="flex space-x-10">
                  <button onClick={resizePopup}>
                    {/* <TbBorderCorners /> */}
                  </button>
                  <button onClick={toggleFullScreen}>
                    {isFullScreen ? <TbArrowsMinimize /> : <TbBorderCorners />}
                  </button>
                  <button onClick={closePopup} className="font-bold rounded"><TbChevronsDown /></button>
                </div>
                <div className="text-white hover:text-red text-[15px] pr-2 rounded-md disabled:pointer-events-none disabled:opacity-30 h-7 px-2 py-2" onClick={handleRefresh}>
                  <GoSync />
                </div>
              </div>

              <div id="message-container" className="overflow-y-auto max-h-[600px]">
                {messages.map((message, index) => (
                  <div key={index} className={`text-${message.sender === 'bot' ? 'left' : 'right'} py-1 px-2 m-2 bg-gray-200 rounded-md inline-block`}>
                    {message.text}
                  </div>
                ))}
              </div>

              <div className='p-4'>
                <label htmlFor="researchdescription" className="block font-bold mb-2">Research Description</label>
                <textarea
                  id="researchdescription"
                  className="w-full h-32 p-2 border border-gray-300 rounded-md"
                  placeholder="Type your message..."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  name="researchdescription"
                  type="text"
                />
</div>
 
              <div className="button-wrapper">
              <div className="p-4">   
              <div>
                <button
                  onClick={handleresearchClick}
                  className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
                >
                Research
                </button>
                {showButtons&&(
                  <div>
               <div>
               <Link to="botview ">              
               <button                 
                  className="bg-gray-200 text-black font-semibold px-4 py-2 rounded w-half mt-4"
                >
                   Research References
                </button> </Link> </div>
              
              <label htmlFor="Industry" className="block font-bold mb-2">Industry</label>
              <textarea
                  id="Industry"
                  className="w-full h-22 p-2 border border-gray-300 rounded-md"
                  placeholder="Type your message..."
                  onChange={(e) => setIndustry(e.target.value)}
                  value={industry}
                  name="industry"
                  type="text"
                />
                  <label htmlFor="researchThemes" className="block font-bold mb-2">Research Themes</label>
                  <textarea
                  id="Themes"
                  className="w-full h-22 p-2 border border-gray-300 rounded-md"
                  placeholder="Type your message..."
                  onChange={(e) => setThemes(e.target.value)}
                  value={themes}
                  name="themes"
                  type="text"
                />
              
              <div className="mt-4">
              <button
                onClick={handleResearchTitleClick}
                className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                disabled={loading} // Optionally disable the button during loading
              >
                {researchtitleloading ? "Loading..." : "Research Title"} {/* Display loading text */}
              </button>

              {!researchtitleloading && researchTitles.length > 0 && (
                <div className="mt-4 bg-gray-100 p-4 rounded-md">
                  <p>Research Titles:</p>
                  <div className="flex flex-col space-y-2">
                    {researchTitles.map((title, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 block cursor-pointer"
                        onClick={() => handleTitleSelection(title)}
                      >
                        <input type="radio" name="researchTitle" value={title} className="form-radio" />
                        <span>{title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
                       
                  <div className="mt-4 space-y-2">
                    <div>
                      <input
                        type="text"
                        value={selectedResearchTitle}
                        onChange={(e) => setSelectedResearchTitle(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Selected Research Title"
                      />
                    </div>              
                
                <div className="mt-4">
                <button
                  onClick={handleResearchObjectivesClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  disabled={loading}
                >
                  {researchobjloading ? "Loading..." : "Research Objective"}
                </button>
                {!researchobjloading && researchobjective.length > 0 && (
                  <div className="mt-4 bg-gray-100 p-4 rounded-md">
                    <p className="font-semibold">Research Objectives</p>
                    <div className="flex flex-col space-y-2">
                      {researchobjective.map((objective, index) => (
                        <label key={index} className="flex items-center space-x-2block cursor-pointer" onClick={() => handleObjectiveSelection(objective)}>
                          <input
                            type="radio"
                            name="researchobjective"
                            value={objective}
                            className="form-radio"
                          />
                          <span>{objective}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
                        
               <div className="mt-4">
                <button
                  onClick={handleIntroductionClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  disabled={loading} // Optionally disable the button during loading
                  >
                    {researchintroloading ? "Loading..." : "Introduction"}
                </button>
                {!researchintroloading && researchintroduction && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Research Introduction:</h3>
                  <p>{researchintroduction}</p>
                </div>
              )}
              </div>           

              <div className="mt-4">
                  <button
                    onClick={handleAbstractionClick}
                    className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                    disabled={loading} 
                  >
                    {researchabstractloading ? "Loading..." : "Abstraction"} 
                  </button>
                  {!researchabstractloading && researchabstraction && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                      <h3 className="text-lg font-semibold mb-2">Research Abstraction:</h3>
                      <p>{researchabstraction}</p>
                    </div>
                  )}
                </div>

              <div className="mt-4">
                <button
                  onClick={handleBibliographyClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  disabled={loading} 
                  >
                    {researchbiblioloading ? "Loading..." : "Bibliography"} 
                  </button>
                {!researchbiblioloading && researchbibliography && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Research Bibliography:</h3>
                    <p>{researchbibliography}</p>
                  </div>
                )}
              </div>

              <div className="mt-4">
                  <button
                    onClick={handleMethodologyClick}
                    className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                    disabled={loading} 
                    >
                      {researchmethodloading ? "Loading..." : "Methodology"} 
                    </button>
                  {!researchmethodloading && researchmethodology && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                      <h3 className="text-lg font-semibold mb-2">Research Methodology:</h3>
                      <p>{researchmethodology}</p>
                    </div>
                  )}
                </div> 

                <div className="mt-4">
                  <button
                    onClick={handleHypothesisClick}
                    className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                    disabled={loading} 
                    >
                      {researchhypoloading ? "Loading..." : "Hypothesis"} 
                    </button>
                 {!researchhypoloading && researchHypothesis.length > 0 && (
                  <div className="hypotheses">
                    {researchHypothesis.map((hypothesis, index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          value={hypothesis}
                          onChange={(e) => {
                            const selected = [...selectedHypotheses];
                            if (e.target.checked) {
                              selected.push(e.target.value);
                            } else {
                              const indexToRemove = selected.indexOf(e.target.value);
                              if (indexToRemove > -1) {
                                selected.splice(indexToRemove, 1);
                              }
                            }
                            setSelectedHypotheses(selected);
                          }}
                        />
                        {hypothesis}
                      </div>
                    ))}
                  </div>
                )}
                </div>

      <div className="button-wrapper">
        <button onClick={() => handleQuestionaryonClick('Likert Scale Questionary')} className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full" disabled={loading} 
                  >
                    {researchquestionloading ? "Loading..." : "Likert Scale Questionnarie"} 
                  </button>
        {!researchquestionloading && researchQuestionnaire && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                      <h3 className="text-lg font-semibold mb-2">Research Questionnarie:</h3>
                      <p>{researchQuestionnaire}</p>
                    </div>
                  )}
      </div>

      <div className="button-wrapper">
        <button onClick={() => handledatasetClick('Sample dataset')} className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full" disabled={loading} 
                  >
                    {researchdatasetloading ? "Loading..." : "Sample dataset"} 
                  </button>
        {!researchdatasetloading && researchDataset && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                      <h3 className="text-lg font-semibold mb-2">Research sample dataset:</h3>
                      <p>{researchDataset}</p>
                    </div>
                  )}
      </div>

      <div className="button-wrapper">
        <button onClick={() => handlestatisticalClick('Conduct statistical test')} className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full" disabled={loading} 
                  >
                    {researchstatloading ? "Loading..." : "Conduct Statistical Test"} 
                  </button>
        {!researchstatloading && researchStatistical && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                      <h3 className="text-lg font-semibold mb-2">Hypothesis statistical tests:</h3>
                      <p>{researchStatistical}</p>
                    </div>
                  )}
      </div>

      <div className="button-wrapper">
        <button onClick={() => handleInferencesClick('Inferences')} className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full" disabled={loading} 
                  >
                    {researchinferenceloading ? "Loading..." : "Inferences"} 
                  </button>
        {!researchinferenceloading && researchInferences && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                      <h3 className="text-lg font-semibold mb-2">Research Inferences:</h3>
                      <p>{researchInferences}</p>
                    </div>
                  )}
      </div>

      <div className="button-wrapper">
      <button
        onClick={handleConclusionClick}
        className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"   disabled={loading} 
        >
          {researchconclusionloading ? "Loading..." : "Conclusion"} 
        </button>
      {!researchconclusionloading && researchConclusion && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Research paper conclusion:</h3>
          <p>{researchConclusion}</p>
        </div>
      )}
    </div>

       <div className="mt-4">
                   <button
                  onClick={handleresearchSTEAMClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  disabled={loading} 
                  >
                    {researchsteamloading ? "Loading..." : "STEAM Theory"} 
                  </button>
                {!researchsteamloading && researchSTEAM && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> STEAM Theory</h3>
                  <p>{researchSTEAM}</p>
                </div>
              )}
                </div>

    <div className="flex justify-center">
                  <button
                  onClick={handleSubmit}
                    className="bg-black text-white font-semibold rounded-md px-4 py-2 mt-2" >             
                    Submit
                  </button>
                  {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
    </div>
    </div>
    )}
</div>
{/* /////////////////startup buttons//////////////// */}
    <div className="button-wrapper mt-4">
      <button
        onClick={handlestartupClick}
        className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
      >
        Convert to Startup Idea
      </button>
      {Convertedidea && (
        <div className="mt-4 flex flex-col space-y-2">
           <div>
               <Link to="startupview ">              
               <button                 
                  className="bg-gray-200 text-black font-semibold px-4 py-2 rounded w-half mt-4"
                >
                   Startup References
                </button> </Link> </div>
          <div className="mt-4">
                <button
                  onClick={handlestartupTitleClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startuptitleloading ? "Loading..." : "Title"} 
                </button>
                {!startuptitleloading && startupTitles.length > 0 && (
                    <div className="mt-4 bg-gray-100 p-4 rounded-md">
                      <p>Startup Titles</p>
                      <div className="flex flex-col space-y-2">
                        {startupTitles.map((title, index) => (
                          <label key={index} className="flex items-center space-x-2 block cursor-pointer" onClick={() => handlestartupTitleSelection(title)}>
                            <input type="radio" name="researchTitle" value={title} className="form-radio" />
                            <span>{title}</span>
                          </label>
                        ))}
                      </div>
                  </div>
                )}
              </div>
              <div>
                      <input
                        type="text"
                        value={selectedstartupTitle}
                        onChange={(e) => setselectedstartupTitle(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Selected Research Title"
                      />
                    </div>                

               <div className="mt-4">
                   <button
                  onClick={handlestartupProblemClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startupproblemloading ? "Loading..." : "Problem"} 
                </button>
                {!startupproblemloading && startupproblem && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Problem</h3>
                  <p>{startupproblem}</p>
                </div>
              )}
                </div>  

               <div className="mt-4">
                   <button
                  onClick={handlestartupSolutionClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startupsolloading ? "Loading..." : "Solution"} 
                </button>
                {!startupsolloading && startupsolution && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Solution</h3>
                  <p>{startupsolution}</p>
                </div>
              )}
                </div>  
   
                <div className="mt-4">
                   <button
                  onClick={handlestartupTechnologyClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startuptechnoloading ? "Loading..." : "Technology Architect"} 
                </button>
                {!startuptechnoloading && startuptechnology && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Technology Architect</h3>
                  <p>{startuptechnology}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlestartupInterventionClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startupinterventionloading ? "Loading..." : "AI Intervention of any technology tool"} 
                </button>
                {!startupinterventionloading && startupintervention && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> AI intervention of any technology tool</h3>
                  <p>{startupintervention}</p>
                </div>
              )}
                </div> 

          <div className="mt-4">
                   <button
                  onClick={handlestartupScheduleClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startupscheduleloading ? "Loading..." : "Schedule"} 
                </button>
                {!startupscheduleloading && startupschedule && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Schedule</h3>
                  <p>{startupschedule}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlestartupCanvaClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startupcanvaloading ? "Loading..." : "Business Canva Model"} 
                </button>
                {!startupcanvaloading && startupcanva && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Business Canva Model</h3>
                  <p>{startupcanva}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlestartupmarketareaClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startupmarketloading ? "Loading..." : "Addressable Market Area"} 
                </button>
                {!startupmarketloading && startupmarketarea && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Addressable Market Area</h3>
                  <p>{startupmarketarea}</p>
                </div>
              )}
                </div>  

               <div className="mt-4">
                   <button
                  onClick={handlestartuprevenueClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startuprevenueloading ? "Loading..." : "Revenue Model"} 
                </button>
                {!startuprevenueloading && startuprevenue && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Revenue Model</h3>
                  <p>{startuprevenue}</p>
                </div>
              )}
                </div>  
   
                <div className="mt-4">
                   <button
                  onClick={handlestartupvaluationClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startupvaluationloading ? "Loading..." : "Valuation Report"} 
                </button>
                {!startupvaluationloading && startupvaluation && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Valuation Report</h3>
                  <p>{startupvaluation}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlestartupImapactClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startupimpactloading ? "Loading..." : "Impact"} 
                </button>
                {!startupimpactloading && startupImapact && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Imapact</h3>
                  <p>{startupImapact}</p>
                </div>
              )}
                </div> 

          <div className="mt-4">
                   <button
                  onClick={handlestartuprecomtechnologiesClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startuprecomloading ? "Loading..." : "Recommended Technologies"} 
                </button>
                {!startuprecomloading && startuprecomtechnologies && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Recommended Technologies</h3>
                  <p>{startuprecomtechnologies}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlestartupSTEAMClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startupsteamloading ? "Loading..." : "STEAM Theory"} 
                </button>
                {!startupsteamloading && startupSTEAM && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> STEAM Theory</h3>
                  <p>{startupSTEAM}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlestartupvisionClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {startupvisionloading ? "Loading..." : "Vision Mission"} 
                </button>
                {!startupvisionloading && startupvision && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Vision Mission</h3>
                  <p>{startupvision}</p>
                </div>
              )}
                </div> 
         
                    <div className="flex justify-center">
                            <button
                            onClick={handleStartupSubmit}
                              className="bg-black text-white font-semibold rounded-md px-4 py-2 mt-2" >
                              Submit
                            </button>
                            {successMessage && <div className="success-message">{successMessage}</div>}
                          </div>
                  </div>
                )}
              </div>
{/* ////////////////////petent button/////////////// */}
                  <div className="button-wrapper mt-4">
                    <button
                      onClick={handlepetentClick}
                      className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
                    >
                      Related Patents and Claims
                    </button>
                    {petent && (
                      <div className="mt-4 flex flex-col space-y-2">

            <div>
               <Link to="patentview ">              
               <button                 
                  className="bg-gray-200 text-black font-semibold px-4 py-2 rounded w-half mt-4"
                >
                   Patent References
                </button> </Link> </div>

                    <div className="mt-4">
                   <button
                  onClick={handlepetentnumberClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {patentnumloading ? "Loading..." : "Patent Number and Claims"} 
                </button>
                {!patentnumloading && petentnumber && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Patent Number and claims</h3>
                  <p>{petentnumber}</p>
                </div>
              )}
                </div>  

                <div className="mt-4">
                   <button
                  onClick={handlepetentinventorClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {patentinventorloading ? "Loading..." : "Inventor"} 
                </button>
                {!patentinventorloading && petentinventor && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Inventors</h3>
                  <p>{petentinventor}</p>
                </div>
              )}
                </div>  
   
                <div className="mt-4">
                   <button
                  onClick={handlepetentvaluechainClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {patentvalueloading ? "Loading..." : "Valuechain and Patent Valuechain"} 
                </button>
                {!patentvalueloading && petentvaluechain && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> valuechain and Patent valuechain</h3>
                  <p>{petentvaluechain}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlepetenttechnologyClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {patenttechloading ? "Loading..." : "Technology and Patant Technology"} 
                </button>
                {!patenttechloading && petenttechnology && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Technology and Patent Technology</h3>
                  <p>{petenttechnology}</p>
                </div>
              )}
                </div> 

          <div className="mt-4">
                   <button
                  onClick={handlepetenttermsClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {patenttermloading ? "Loading..." : "Related Terms"} 
                </button>
                {!patenttermloading && petentterms && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Related Terms</h3>
                  <p>{petentterms}</p>
                </div>
              )}
                </div> 
        <div className="flex justify-center">
                  <button
                  onClick={handlepatentSubmit}
                    className="bg-black text-white font-semibold rounded-md px-4 py-2 mt-2"
                  >
                    Submit
                  </button>
                  {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
      </div>
      )}
    </div>

{/* ///////////////////valuechain//////////////// */}
<div className="button-wrapper mt-4">
      <button
        onClick={handlevaluechainClick}
        className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
      >
         ValueChain and technology
      </button>
      {valuechain && (
        <div className="mt-4 flex flex-col space-y-2">

                 <div>
               <Link to="vcview ">              
               <button                 
                  className="bg-gray-200 text-black font-semibold px-4 py-2 rounded w-half mt-4"
                >
                   Valuechain References
                </button> </Link> </div>
          
        <div className="mt-4">
                   <button
                  onClick={handlevaluechainbuttonClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {valuechainloading ? "Loading..." : "Value Chain"} 
                </button>
                {!valuechainloading && valuechainbutton && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Value Chain</h3>
                  <p>{valuechainbutton}</p>
                </div>
              )}
                </div>  
   
                <div className="mt-4">
                   <button
                  onClick={handlesubvaluechainClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {subvaluechainloading ? "Loading..." : "Sub Valuechain"} 
                </button>
                {!subvaluechainloading && subvaluechain && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">  Sub valuechain</h3>
                  <p>{subvaluechain}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handletechnologyClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {valuechaintechloading ? "Loading..." : "Technology"} 
                </button>
                {!valuechaintechloading && technology && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Technology</h3>
                  <p>{technology}</p>
                </div>
              )}
                </div> 

          <div className="mt-4">
                   <button
                  onClick={handlesubtechnologyClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {valuechainsubtechloading ? "Loading..." : "Sub Technology"} 
                </button>
                {!valuechainsubtechloading && subtechnology && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Sub Technology</h3>
                  <p>{subtechnology}</p>
                </div>
              )}
                </div> 
                <div className="mt-4">
                   <button
                  onClick={handlevaluechaintermsClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {valuechaintermloading ? "Loading..." : "Related Terms"} 
                </button>
                {!valuechaintermloading && valuechainterms && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Related Terms</h3>
                  <p>{valuechainterms}</p>
                </div>
              )}
                </div> 
                <div className="mt-4">
                   <button
                  onClick={handleTaxonomyClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {taxonomyloading ? "Loading..." : "Taxonomy"} 
                </button>
                {!taxonomyloading && taxonomy && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Taxonomy</h3>
                  <p>{taxonomy}</p>
                </div>
              )}
                </div> 
        <div className="flex justify-center">
                  <button
                  onClick={handlevaluechainSubmit}
                    className="bg-black text-white font-semibold rounded-md px-4 py-2 mt-2"
                  >
                    Submit
                  </button>
                  {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
      </div>
      )}
    </div> 
{/* /////////////////////sdg project///////////////// */}
    <div className="button-wrapper mt-4">
      <button
        onClick={handlesdgprojectClick}
        className="bg-blue-600 text-white font-bold px-4 py-2 rounded"
      >
        SDG Project
      </button>
      {showSDGbuttons && (
        <div className="mt-4 flex flex-col space-y-2">

              <div>
               <Link to="sdgview ">              
               <button                 
                  className="bg-gray-200 text-black font-semibold px-4 py-2 rounded w-half mt-4"
                >
                   SDG References
                </button> </Link> </div>

          <div className="mt-4">
                <button
                  onClick={handleSDGTitleClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgtitleloading ? "Loading..." : "Title"} 
                </button>
                {!sdgtitleloading && sdgTitles.length > 0 && (
                    <div className="mt-4 bg-gray-100 p-4 rounded-md">
                      <p>Title</p>
                      <div className="flex flex-col space-y-2">
                        {sdgTitles.map((title, index) => (
                          <label key={index} className="flex items-center space-x-2 block cursor-pointer" onClick={() => handleSDGTitleSelection(title)}>
                            <input type="radio" name="sdgTitle" value={title} className="form-radio" />
                            <span>{title}</span>
                          </label>
                        ))}
                      </div>
                  </div>
                )}
              </div>
              <div>
                      <input
                        type="text"
                        value={selectedSDGTitle}
                        onChange={(e) => handleSDGTitleSelection(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Selected SDG Title"
                      />
                    </div>                

               <div className="mt-4">
                   <button
                  onClick={handlesdgProblemClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgproblemloading ? "Loading..." : "Problem Statement"} 
                </button>
                {!sdgproblemloading && sdgproblem && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Problem Statement</h3>
                  <p>{sdgproblem}</p>
                </div>
              )}
                </div>  

               <div className="mt-4">
                   <button
                  onClick={handlesdgSolutionClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgsolutionloading ? "Loading..." : "Solution"} 
                </button>
                {!sdgsolutionloading && sdgSolution && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Solution</h3>
                  <p>{sdgSolution}</p>
                </div>
              )}
                </div>  
   
                <div className="mt-4">
                   <button
                  onClick={handlesdgframeworkClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgframeloading ? "Loading..." : "Logical Framework"} 
                </button>
                {!sdgframeloading && sdgframework && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">  Logical Framework</h3>
                  <p>{sdgframework}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlesdgbeneficiariesClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgbenifitloading ? "Loading..." : "Beneficiaries"} 
                </button>
                {!sdgbenifitloading && sdgbeneficiaries && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Beneficiaries</h3>
                  <p>{sdgbeneficiaries}</p>
                </div>
              )}
                </div> 

          <div className="mt-4">
                   <button
                  onClick={handlesdgstakeholderClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgstakeholderloading ? "Loading..." : "Stakeholder"} 
                </button>
                {!sdgstakeholderloading && sdgstakeholder && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Stakeholder</h3>
                  <p>{sdgstakeholder}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlesdgrecommendationClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgrecommloading ? "Loading..." : "Software Recommendation"} 
                </button>
                {!sdgrecommloading && sdgrecommendation && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Software Recommendation</h3>
                  <p>{sdgrecommendation}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlesdgalignmentClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgalignloading ? "Loading..." : "SDG Goal Alignments"} 
                </button>
                {!sdgalignloading && sdgalignment && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> SDG Goal Alignments</h3>
                  <p>{sdgalignment}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlesdgscheduleClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgscheduleloading ? "Loading..." : "Schedule"} 
                </button>
                {!sdgscheduleloading && sdgschedule && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Schedule</h3>
                  <p>{sdgschedule}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlesdgimpactClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgimpactloading ? "Loading..." : "Impact"} 
                </button>
                {!sdgimpactloading && sdgimpact && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Impact</h3>
                  <p>{sdgimpact}</p>
                </div>
              )}
                </div> 
                <div className="mt-4">
                   <button
                  onClick={handlesdgrectechnologiesClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgtechloading ? "Loading..." : "Recommended Technologies"} 
                </button>
                {!sdgtechloading && sdgrectechnologies && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2"> Recommended Technologies</h3>
                  <p>{sdgrectechnologies}</p>
                </div>
              )}
                </div> 

                <div className="mt-4">
                   <button
                  onClick={handlesdgSTEAMClick}
                  className="bg-gray-200 text-black font-semibold rounded-md px-4 py-2 w-full"
                  >
                  {sdgsteamloading ? "Loading..." : "STEAM Theory"} 
                </button>
                {!sdgsteamloading && sdgSTEAM && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">STEAM Theory</h3>
                  <p>{sdgSTEAM}</p>
                </div>
              )}
                </div> 
          <div className="flex justify-center">
                  <button
                  onClick={handlesdgSubmit}
                    className="bg-black text-white font-semibold rounded-md px-4 py-2 mt-2"
                  >
                    Submit
                  </button>
                  {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
        </div>
      )}
    </div>
            <div className='mt-4'>
        <button
        onClick={handlecaseClick}
        className="bg-blue-600 text-white font-bold px-4 py-2 rounded" >  {casestudyloading ? "Loading..." : "Case Study"} 
        </button>
        {!casestudyloading && casestudy && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">case study</h3>
                  <p>{casestudy}</p>
                </div>
              )}
        </div>
        </div>             
          </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
