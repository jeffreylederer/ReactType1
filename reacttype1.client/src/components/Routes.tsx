import {
    Routes,
    Route
} from "react-router-dom";


import Membership from "../Pages/Membership/List.tsx";
import MembershipDelete from "../Pages/Membership/Delete.tsx";
import MembershipUpdate from "../Pages/Membership/Update.tsx";
import MembershipCreate from "../Pages/Membership/Create.tsx";

import League from "../Pages/Admin/League/List.tsx";
import LeagueDelete from "../Pages/Admin/League/Delete.tsx";
import LeagueUpdate from "../Pages/Admin/League/Update.tsx";
import LeagueCreate from "../Pages/Admin/League/Create.tsx";
import LeagueDetails from "../Pages/Admin/League/Details.tsx";

import Users from "../Pages/Admin/Users/List.tsx";
import UsersDelete from "../Pages/Admin/Users/Delete.tsx";
import UsersUpdate from "../Pages/Admin/Users/Update.tsx";
import UsersCreate from "../Pages/Admin/Users/Create.tsx";

import Players from "../Pages/League/Players/List.tsx";
import PlayersDelete from "../Pages/League/Players/Delete.tsx";
import PlayersCreate from "../Pages/League/Players/Create.tsx";

import Schedule from "../Pages/League/Schedule/List.tsx";
import SchedulesDelete from "../Pages/League/Schedule/Delete.tsx";
import SchedulesCreate from "../Pages/League/Schedule/Create.tsx";
import SchedulesUpdate from "../Pages/League/Schedule/Update.tsx";

import Teams from "../Pages/League/Teams/List.tsx";
import TeamsDelete from "../Pages/League/Teams/Delete.tsx";
import TeamsCreate from "../Pages/League/Teams/Create.tsx";
import TeamsUpdate from "../Pages/League/Teams/Update.tsx";
import TeamReport from "../Pages/League/Teams/Report.tsx";

import Matches from "../Pages/League/Matches/list.tsx";
import ScoreCard from "../Pages/League/Matches/ScoreCard.tsx";
import Standings from "../Pages/League/Matches/Standings.tsx";
import MatchUpdate from "../Pages/League/Matches/Update.tsx";
import Byes from "../Pages/League/Matches/Byes.tsx";
import ScheduleReport from "../Pages/League/Matches/ScheduleReport.tsx";
import { CreateMatches } from "../Pages/League/Matches/CreateMatches.tsx";
import { ClearMatches } from "../Pages/League/Matches/ClearMatches.tsx";



import Logoff from "../Pages/Admin/Login/Logoff.tsx";
import Login from "../Pages/Admin/Login/Login.tsx";
import UpdatePassword from "../Pages/Admin/Login/UpdatePassword.tsx";
import NotLogin from "../Pages/Admin/Login/NotLogin.tsx";


import About from "../Pages/About.tsx";
import Contact from "../Pages/Contact.tsx";


import Welcome from "../Pages/Welcome.tsx";
import Home from '../Pages/Home.tsx'; 




function RouteMenu() {
   
    
    return (
       
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/Membership" element={<Membership />} />
                <Route path="/Membership/Delete" element={<MembershipDelete />} />
                <Route path="/Membership/Update" element={<MembershipUpdate />} />
                <Route path="/Membership/Create" element={<MembershipCreate />} />

                <Route path="/Admin/Leagues" element={<League />} />
                <Route path="/Admin/League/Delete" element={<LeagueDelete />} />
                <Route path="/Admin/League/Update" element={<LeagueUpdate />} />
                <Route path="/Admin/League/Create" element={<LeagueCreate />} />
                <Route path="/Admin/League/Details" element={<LeagueDetails />} />

                <Route path="/Admin/Users" element={<Users />} />
                <Route path="/Admin/Users/Delete" element={<UsersDelete />} />
                <Route path="/Admin/Users/Update" element={<UsersUpdate />} />
                <Route path="/Admin/Users/Create" element={<UsersCreate />} />

                <Route path="/League/Players" element={<Players />} />
                <Route path="/League/Players/Delete" element={<PlayersDelete />} />
                <Route path="/League/Players/Create" element={<PlayersCreate />} />

                <Route path="/League/Schedule" element={<Schedule />} />
                <Route path="/League/Schedule/Delete" element={<SchedulesDelete />} />
                <Route path="/League/Schedule/Create" element={<SchedulesCreate />} />
                <Route path="/League/Schedule/Update" element={<SchedulesUpdate />} />

                <Route path="/League/Teams" element={<Teams />} />
                <Route path="/League/Teams/Delete" element={<TeamsDelete />} />
                <Route path="/League/Teams/Create" element={<TeamsCreate />} />
                <Route path="/League/Teams/Update" element={<TeamsUpdate />} />
                <Route path="/League/Teams/Report" element={<TeamReport />} />

                <Route path="/League/Matches" element={<Matches />} />
                <Route path="/League/Matches/Update" element={<MatchUpdate />} />
                <Route path="/League/Matches/Standings" element={<Standings />} />
                <Route path="/League/Matches/ScoreCard" element={<ScoreCard />} />
                <Route path="/League/Byes" element={<Byes />} />
                <Route path="/League/ScheduleReport" element={<ScheduleReport />} />
                <Route path="/League/CreateMatches" element={<CreateMatches />} />
                <Route path="/League/ClearMatches" element={<ClearMatches />} />
                

                
                <Route path="/Contact" element={<Contact />} />
                <Route path="/About" element={<About />} />
                <Route path="/Logoff" element={<Logoff />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/UpdatePassword" element={<UpdatePassword />} />
                <Route path='*' element={<NotLogin />} />
                <Route path="/Welcome" element={<Welcome/>} />
         
            </Routes>

 
  );
}

export default RouteMenu;