import React from "react";
import "./assets/fonts/fonts.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./css/ace-responsive-menu.css";
import "./css/animate.css";
import "./css/bootstrap-select.min.css";
import "./css/bootstrap.min.css";
import "./css/flaticon.css";
import "./css/responsive.css";
import "./css/style.css";
import "./css/ud-custom-spacing.css";
import "./css/menu.css";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MemberProfile from "./components/memberProfile/MemberProfile";
import MemberList from "./components/memberProfile/Member-list";
import MemberContact from "./components/memberProfile/MemberContact";
import Home from "./components/Home";
import LoginForm from "./components/Login";
import CommitteePage from "./components/memberProfile/Committee-page";
import Questions from "./components/Questions";
import Bills from "./components/Bills";
import SessionSchedule from "./components/business/SessionSchedule";
import ListOfBusiness from "./components/business/ListOfBusiness";
import Debates from "./components/business/Debates";
import Bulletins from "./components/business/Bulletins";
import Resume from "./components/business/Resume";
import PapersToBeLaid from "./components/business/ListOfPapersLaid";
import Governer from "./components/parlamentory/Governer";
import Speaker from "./components/parlamentory/Speaker";
import DeputySpeaker from "./components/parlamentory/DeputySpeaker";
import CM from "./components/parlamentory/CM";
import LeaderOppositionContact from "./components/parlamentory/LeaderOppositionContact";
import Ministers from "./components/parlamentory/Ministers";
import ChiefWhip from "./components/parlamentory/ChiefWhip";
import Secretary from "./components/parlamentory/Secretary";
import Rti from "./components/Rti";
import Proceedings from "./components/business/Proceedings";
import ParliamentMembers from "./components/memberProfile/ParliamentMembers";
import FacilitytoMembers from "./components/memberProfile/FacilitytoMembers";
import SecretariatSectionsPage from "./secretariate/Section";
import Library from "./secretariate/Library";
import Museum from "./secretariate/Museum";
import SabhaTv from "./secretariate/SabhaTv";
import SabhaTVLive from "./components/SabhaTVLive";
import Cpst from "./secretariate/Cpst";
import SpecialSecretary from "./components/parlamentory/SpecialSecretary";
import Motions from "./components/business/Motions";
import Resolutions from "./components/business/Resolutions";
import BudgetSpeeches from "./components/business/BudgetSpeeches";
import Tender from "./components/Tender";
import Resources from "./components/resources/Resources";
import OtherImptNo from "./secretariate/OtherImptNo";
import LegislatorsHostel from "./secretariate/LegislatorsHostel";
import FormerStaffs from "./secretariate/FormerStaffs";
import OrganizationalChart from "./secretariate/OrganizationalChart";
import ViewMore from "./components/ViewMore";
import Publications from "./components/resources/Publications";
import LegCouncil from "./components/memberProfile/LegCouncil";
import CallOfAttention from "./components/CallOfAttention";
import Submission from "./components/Submission";
import PresidentsRule from "./components/PresidentsRule";
import DurationOfAssembly from "./components/DurationOfAssembly";
import PartyChart from "./components/PartyChart";
import HandBook from "./components/memberProfile/HandBook";
import BudgetDocs from "./components/BudgetDocs";
import StatementDemands from "./components/StatementDemands";
import SupplementaryDemands from "./components/SupplementaryDemands";
import BdGeneralDiscussion from "./components/BdGeneralDiscussion";
import BudgetPresentation from "./components/BudgetPresentation";
import ExcessDemands from "./components/ExcessDemands";
import VoteOnAccount from "./components/VoteOnAccount";

const AppLayout = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login";

  // Handle scroll restoration for hash navigation
  React.useEffect(() => {
    // Prevent automatic scroll restoration when navigating with hash
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }

    // Don't scroll to top if there's a hash in the URL
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="wrapper ovh">
      {!hideHeaderFooter && <Navbar />}
      <main className="main-route">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-more" element={<ViewMore />} />
          <Route path="/memberlist" element={<MemberList />} />
          <Route path="/member-contact" element={<MemberContact />} />
          <Route path="/facilities-to-member" element={<FacilitytoMembers />} />
          <Route path="/parliament-members" element={<ParliamentMembers />} />
          <Route path="/member-profile/:id" element={<MemberProfile />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/session-schedule" element={<SessionSchedule />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/list-of-business" element={<ListOfBusiness />} />
          <Route path="/committe" element={<CommitteePage />} />
          <Route path="/debates" element={<Debates />} />
          <Route path="/bulletins" element={<Bulletins />} />
          <Route path="/proceedings" element={<Proceedings />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/paper-to-be-laid" element={<PapersToBeLaid />} />
          <Route path="/governor" element={<Governer />} />
          <Route path="/speaker" element={<Speaker />} />
          <Route path="/deputy-speaker" element={<DeputySpeaker />} />
          <Route path="/cm" element={<CM />} />
          <Route
            path="/leader-opposition-contact"
            element={<LeaderOppositionContact />}
          />
          <Route path="/ministers" element={<Ministers />} />
          <Route path="/chief-whip" element={<ChiefWhip />} />
          <Route path="/secretary" element={<Secretary />} />
          <Route path="/rti" element={<Rti />} />
          <Route path="/section" element={<SecretariatSectionsPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/museum" element={<Museum />} />
          <Route path="/sabha-tv" element={<SabhaTv />} />
          <Route path="/sabha-tv-live" element={<SabhaTVLive />} />
          <Route path="/klamps" element={<Cpst />} />
          <Route path="/special-secretary" element={<SpecialSecretary />} />
          <Route path="/motions" element={<Motions />} />
          <Route path="/resolution" element={<Resolutions />} />
          <Route path="/budget-speeches" element={<BudgetSpeeches />} />
          <Route path="/tender" element={<Tender />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/otherImptNo" element={<OtherImptNo />} />
          <Route path="/legislators-hostel" element={<LegislatorsHostel />} />
          <Route path="/former-staffs" element={<FormerStaffs />} />
          <Route
            path="/organizational-chart"
            element={<OrganizationalChart />}
          />
          <Route path="/resources" element={<Resources />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/leg-council-before-1956" element={<LegCouncil />} />
          <Route path="/calling-attention" element={<CallOfAttention />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/presidents-rule" element={<PresidentsRule />} />
          <Route
            path="/duration-of-assembly"
            element={<DurationOfAssembly />}
          />
          <Route path="/party-chart" element={<PartyChart />} />
          <Route path="/handbook" element={<HandBook />} />
          <Route path="/budget-documents" element={<BudgetDocs />} />
          <Route
            path="/budgetstatement-demands"
            element={<StatementDemands />}
          />
          <Route path="/budgetsupplementary-demands" element={<SupplementaryDemands />} />
          <Route path="/general-discussion" element={<BdGeneralDiscussion />} />
          <Route path="/budget-presentation" element={<BudgetPresentation />} />
          <Route path="/excessgrant" element={<ExcessDemands />} />
          <Route path="/voteonaccount" element={<VoteOnAccount />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};
const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <AppLayout />
      </Router>
    </LanguageProvider>
  );
};

export default App;
