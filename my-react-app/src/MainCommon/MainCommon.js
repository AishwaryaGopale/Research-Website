import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Chatbot from '../User/Bot/Boat';
import ViewChatbot from '../User/Bot/botview'
import Viewstartupbot from '../User/Bot/startupview';
import Viewpatentbot from '../User/Bot/patentview';
import ViewVcbot from '../User/Bot/vcview';
import Viewsdgbot from '../User/Bot/sdgview';
import About from "../User/About/About";
import Community from "../User/Community/Community";
import LoginForm from "../Log/Login";
import RegistrationPage from "../User/Reg/Reg";
import Research from "../User/Research/Research";
import JournalUpload from "../User/JournalUpload/Journalupload";
import BookUpload from "../User/BookUpload/Bookupload";
import ViewJournal from "../User/ViewJournal/ViewJournal";
import ViewBook from "../User/ViewBook/ViewBook";
import User from "../User/UserCommon/UserCommon";
import HomePage from "../User/Home/Home";
import AdminCommon from "../Admin/AdminCommon/AdminCommon";
import Dashboard from "../Admin/Dashboard/Dashboard";
import Table from "../Admin/JournalUpload/JournalTable/Table";
import ViewResearch from "../Admin/Research/researchdata";
import * as API from "../User/Endpoints/endpoints";
import EditResearch from "../Admin/Research/editresearch";
import DeleteResearch from "../Admin/Research/deleteresearch";
import Viewstartup from "../Admin/Startup/startupdata";
import EditStartup from "../Admin/Startup/editstartup";
import DeleteStartup from "../Admin/Startup/deletestartup";
import ViewPatent from "../Admin/Patent/patentdata";
import DeletePatent from "../Admin/Patent/deletepatent";
import EditPatent from "../Admin/Patent/editpatent";
import ViewVc from "../Admin/ValueChain/valuechaindata";
import EditVc from "../Admin/ValueChain/editvc";
import DeleteVc from "../Admin/ValueChain/deletevc";
import ViewSDG from "../Admin/SDG/sdgdata";
import EditSDG from "../Admin/SDG/editsdg";
import DeleteSDG from "../Admin/SDG/deletesdg";


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const MainCommon = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Default route to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Public routes */}
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegistrationPage />} />

          {/* Protected user routes */}
          <Route path="user" element={<PrivateRoute><User /></PrivateRoute>}>
            <Route path="" element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="community" element={<Community />} />
            <Route path="research" element={<Research />} />
            <Route path="journalupload" element={<JournalUpload />} />
            <Route path="bookupload" element={<BookUpload />} />
            <Route path="viewjournal" element={<ViewJournal />} />
            <Route path="viewbook" element={<ViewBook />} />
            <Route path="bot" element={<Chatbot />} />
            <Route path="botview" element={<ViewChatbot />} />
            <Route path="startupview" element={<Viewstartupbot />} />
            <Route path="Patentview" element={<Viewpatentbot />} />
            <Route path="Vcview" element={<ViewVcbot />} />
            <Route path="SDGview" element={<Viewsdgbot />} />

            <Route path="enpoints" element={< API />} />
            <Route path="*" element={
              <div>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for does not exist.</p>
              </div>
            } />
          </Route>
          
          {/* Protected admin routes */}
          <Route path="admin" element={<PrivateRoute><AdminCommon /></PrivateRoute>}>
            <Route path="" element={<Dashboard />} />
            <Route path="jtable" element={<Table />} />
            <Route path="research ref" element={<ViewResearch />} />
            <Route path="editresearch" element={<EditResearch/>} />
            <Route path="deleteresearch" element={<DeleteResearch/>} />
            <Route path="startup ref" element={<Viewstartup/>} />
            <Route path="editstartup" element={<EditStartup/>} />
            <Route path="deletestartup" element={<DeleteStartup/>} />
            <Route path="patent ref" element={<ViewPatent />} />
            <Route path="editpatent" element={<EditPatent />} />
            <Route path="deletepatent" element={<DeletePatent />} />
            <Route path="valuechain ref" element={<ViewVc />} />
            <Route path="editvc" element={<EditVc />} />
            <Route path="deletevc" element={<DeleteVc />} />
            <Route path="sdg ref" element={<ViewSDG />} />
            <Route path="editsdg" element={<EditSDG />} />
            <Route path="deletesdg" element={<DeleteSDG />} />

            
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default MainCommon;
