// API Configuration
// export const API_BASE_URL = "https://kla.cditproject.org";
// export const DEMO_API_BASE_URL = "https://klademo.cditproject.org";


export const DEMO_API_BASE_URL = "https://api.niyamasabha.in";


// API Endpoints
export const API_ENDPOINTS = {
  KLA_MEMBERS: (klaId) => `${DEMO_API_BASE_URL}/api/kla-members/${klaId}`,
  MEMBER: (memberId) => `${DEMO_API_BASE_URL}/api/member/${memberId}`,
  MEMBER_PROFILE: (memberId) => `${DEMO_API_BASE_URL}/api/member-profile/${memberId}`,
  KLA_LIST: `${DEMO_API_BASE_URL}/api/kla-list`,
  KLA_QUESTIONS: `${DEMO_API_BASE_URL}/api/kla-questions`,
  KLA15_QUESTIONS: `${DEMO_API_BASE_URL}/api/kla15-questions`,
  KLA_SESSIONS: `${DEMO_API_BASE_URL}/api/kla-sessions`,
  SESSION_SITTING_DAYS: `${DEMO_API_BASE_URL}/api/session-sittingdays`,
  RESUME_BUSINESS: `${DEMO_API_BASE_URL}/api/resume_business`,
  BANNER_LIST: `${DEMO_API_BASE_URL}/api/bannerlist`,
  BULLETIN_LIST: `${DEMO_API_BASE_URL}/api/bulletinlist`,
  ORDINANCES_LIST: `${DEMO_API_BASE_URL}/api/ordinanceslist`,
  BAC_RECOMMENDATION_LIST: `${DEMO_API_BASE_URL}/api/bac_recommendations`,
  RECENT_NOTIFICATION_LIST: `${DEMO_API_BASE_URL}/api/recent_notification`,
  RECENT_NEWS_LIST: `${DEMO_API_BASE_URL}/api/recent_news`,
  RECENT_ANNOUNCEMENT_LIST: `${DEMO_API_BASE_URL}/api/recent_announcement`,
  CALENDAR_SETTINGS_LIST: `${DEMO_API_BASE_URL}/api/calendar_sittings`,
  KLA_PROCEEDINGS: `${DEMO_API_BASE_URL}/api/kla_proceedings`,
  CHIEF_MINISTERS: `${DEMO_API_BASE_URL}/api/chief_ministers`,
  FORMER_STAFF: `${DEMO_API_BASE_URL}/api/former_staff`,
  PAPERS_LAID: `${DEMO_API_BASE_URL}/api/papers_laid`,
  ALLOTMENT_DAYS: (klaId) => `${DEMO_API_BASE_URL}/api/allotment_days${klaId ? `?kla_id=${klaId}` : ''}`,
  COMMITTEES: `${DEMO_API_BASE_URL}/api/committees`,
  COMMITTEE_BY_ID: (id) => `${DEMO_API_BASE_URL}/api/committees/${id}`,
  PERIODICALS: `${DEMO_API_BASE_URL}/api/periodicals`,
  SCHEDULE_WEB_UPDATION: `${DEMO_API_BASE_URL}/api/schedule_web_updation_questions`,
  CHIEF_WHIP: `${DEMO_API_BASE_URL}/api/chief-whip`,
  COUNCIL_MINISTERS: `${DEMO_API_BASE_URL}/api/council_ministers`,
  DEPUTY_SPEAKER: `${DEMO_API_BASE_URL}/api/deputy-speaker`,
  LEADER_OPPOSITION: `${DEMO_API_BASE_URL}/api/leader-opposition`,
  FORMER_DEPUTY_SPEAKERS: `${DEMO_API_BASE_URL}/api/former_dyspeakers`,
  BALLOTCHART_LIST: `${DEMO_API_BASE_URL}/api/ballotChart_questions`,
  // current calendar for initial load / fallback
  CALENDAR_CURRENT: `${DEMO_API_BASE_URL}/api/calendar/current`,
  // dynamic calendar endpoint by year and month
  CALENDAR_YEAR_MONTH: (year, month) => `${DEMO_API_BASE_URL}/api/calendar/${year}/${month}`,
  BILLS_LIST: `${DEMO_API_BASE_URL}/api/bills`,
  BILLS_FILTERS: `${DEMO_API_BASE_URL}/api/bills-filters`,
  BILLS_STATUSES: `${DEMO_API_BASE_URL}/api/bills-statuses`,
  BILLS_PASSED: (klaId) => `${DEMO_API_BASE_URL}/api/bill-passed/kla/${klaId}`,


};

// Helper function to build image URLs
export const getImageUrl = (img) => {
  if (!img) return img;
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("//")) return `https:${img}`;
  if (img.startsWith("/")) return `${DEMO_API_BASE_URL}${img}`;
  return img;
};

