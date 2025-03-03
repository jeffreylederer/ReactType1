import {
    Routes,
    Route
} from "react-router-dom";


import Membership from "@pages/Membership/List.tsx";
import MembershipDelete from "@pages/Membership/Delete.tsx";
import MembershipUpdate from "@pages/Membership/Update.tsx";
import MembershipCreate from "@pages/Membership/Create.tsx";

import League from "@pages/Admin/League/List.tsx";
import LeagueDelete from "@pages/Admin/League/Delete.tsx";
import LeagueUpdate from "@pages/Admin/League/Update.tsx";
import LeagueCreate from "@pages/Admin/League/Create.tsx";
import LeagueDetails from "@pages/Admin/League/Details.tsx";

import Users from "@pages/Admin/Users/List.tsx";
import UsersDelete from "@pages/Admin/Users/Delete.tsx";
import UsersUpdate from "@pages/Admin/Users/Update.tsx";
import UsersCreate from "@pages/Admin/Users/Create.tsx";

import Players from "@pages/League/Players/List.tsx";
import PlayersDelete from "@pages/League/Players/Delete.tsx";
import PlayersCreate from "@pages/League/Players/Create.tsx";

import Schedule from "@pages/League/Schedule/List.tsx";
import SchedulesDelete from "@pages/League/Schedule/Delete.tsx";
import SchedulesCreate from "@pages/League/Schedule/Create.tsx";
import SchedulesUpdate from "@pages/League/Schedule/Update.tsx";

import Teams from "@pages/League/Teams/List.tsx";
import TeamsDelete from "@pages/League/Teams/Delete.tsx";
import TeamsCreate from "@pages/League/Teams/Create.tsx";
import TeamsUpdate from "@pages/League/Teams/Update.tsx";
import TeamReport from "@pages/League/Teams/Report.tsx";

import Matches from "@pages/League/Matches/list.tsx";
import ScoreCard from "@pages/League/Matches/ScoreCard.tsx";
import Standings from "@pages/League/Matches/Standings.tsx";
import MatchUpdate from "@pages/League/Matches/Update.tsx";
import Byes from "@pages/League/Matches/Byes.tsx";
import ScheduleReport from "@pages/League/Matches/ScheduleReport.tsx";
import { CreateMatches } from "@pages/League/Matches/CreateMatches.tsx";
import { ClearMatches } from "@pages/League/Matches/ClearMatches.tsx";



import Logoff from "@pages/Admin/Login/Logoff.tsx";
import Login from "@pages/Admin/Login/Login.tsx";
import UpdatePassword from "@pages/Admin/Login/UpdatePassword.tsx";
import NotLogin from "@pages/Admin/Login/NotLogin.tsx";


import About from "@pages/About.tsx";
import Contact from "@pages/Contact.tsx";


import Welcome from "@pages/Welcome.tsx";
import Home from '@pages/Home.tsx'; 




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