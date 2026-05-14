export const fetchConstituencies = async (opts = {}) => {
  // Backend expects POST for this route — send form-encoded body.
  const url = "https://api.niyamasabha.in/api/constituencies";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Accept: "application/json",
    },
    body: new URLSearchParams(opts).toString(),
  });
  const json = await res.json();
  if (json?.status && Array.isArray(json.data)) return json.data;
  if (Array.isArray(json)) return json;
  throw new Error("Failed to load constituencies");
};

export const fetchKlaList = async () => {
  const res = await fetch("https://api.niyamasabha.in/api/kla-list", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: new URLSearchParams({ t: "o" }).toString(),
  });
  const json = await res.json();
  if (json?.status && Array.isArray(json.data)) return json.data;
  throw new Error("Failed to load KLA list");
};

export const fetchKlaSessions = async (klaId) => {
  // The backend expects POST for this route. Send kla_id in POST body when provided.
  const url = "https://api.niyamasabha.in/api/kla-sessions";
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Accept: "application/json",
    },
  };

  if (klaId != null) {
    opts.body = new URLSearchParams({ kla_id: String(klaId) }).toString();
  }

  const res = await fetch(url, opts);
  const json = await res.json();
  // API may return { status: true, data: [...] } or a bare array
  if (json?.status && Array.isArray(json.data)) return json.data;
  if (Array.isArray(json)) return json;
  throw new Error("Failed to load KLA sessions");
};

export const fetchAllotmentDays = async (klaId = 15) => {
  const url = `https://api.niyamasabha.in/api/allotment_days${klaId ? `?kla_id=${klaId}` : ''}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();
  if (json?.status && Array.isArray(json.data)) return json.data;
  if (Array.isArray(json)) return json;
  throw new Error("Failed to load allotment days");
};


  // COMMITTEE-----STARTS HERE
export const fetchCommittees = async () => {
  const url = "https://api.niyamasabha.in/api/committees";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();
  if (json?.success && Array.isArray(json.data)) return json.data;
  if (Array.isArray(json)) return json;
  throw new Error("Failed to load committees");
};

export const fetchCommitteeById = async (committeeId) => {
  const url = `https://api.niyamasabha.in/api/committees/${committeeId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();
  if (json?.success && json.data) return json.data;
  throw new Error("Failed to load committee details");
};
  // COMMITTEE-----ENDS HERE


export const fetchPeriodicals = async () => {
  const url = "https://api.niyamasabha.in/api/periodicals";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();
  if (json?.status && Array.isArray(json.data)) return json.data;
  if (Array.isArray(json)) return json;
  throw new Error("Failed to load periodicals");
};

export const fetchScheduleWebUpdation = async (klaId = 15) => {
  const url = `https://api.niyamasabha.in/api/schedule_web_updation_questions${klaId ? `?kla_id=${klaId}` : ''}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();
  if (json?.status && Array.isArray(json.data)) return json.data;
  if (Array.isArray(json)) return json;
  throw new Error("Failed to load schedule web updation");
};

const toPeopleList = (values = []) =>
  (Array.isArray(values) ? values : [values])
    .flatMap((value) => String(value || "").split(","))
    .map((name) => name.trim())
    .filter(Boolean);

const formatDisplayDate = (dateString) => {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString || "";
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

export const fetchBudgetSessions = async () => {
  const url = "https://api.niyamasabha.in/api/budget-sessions";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const json = await res.json();
  const sessions = Array.isArray(json?.sessions) ? json.sessions : [];

  const normalizedSessions = sessions.map((session) => {
    const klaId = Number(session.kla_id);
    const sessionId = Number(session.session_id);
    const budgetItems = Array.isArray(session.budget_items) ? session.budget_items : [];

    return {
      kla_id: klaId,
      session_id: sessionId,
      start_date: session.start_date || null,
      end_date: session.end_date || null,
      meeting_dates: Array.isArray(session.meeting_dates) ? session.meeting_dates : [],
      budget_items: budgetItems.map((item, itemIndex) => {
        const members = toPeopleList(item.member).map((name) => ({
          name,
          constituency: "",
        }));
        const ministers = toPeopleList(item.minister).map((name) => ({
          name,
          portfolio: "",
          constituency: "",
          party: "",
        }));
        const sharedPdfUrl = item.pdf_url || null;

        return {
          id: `${klaId}-${sessionId}-${item.date || "item"}-${itemIndex}`,
          kla_id: klaId,
          session: sessionId,
          date: formatDisplayDate(item.date),
          isoDate: item.date || "",
          assembly: `KLA - ${klaId}`,
          event: item.event || "",
          subject: item.subject_en || item.subject_ml || "",
          subject_en: item.subject_en || "",
          subject_ml: item.subject_ml || "",
          pdf_url: sharedPdfUrl,
          pdf_url_english: sharedPdfUrl,
          pdf_url_malayalam: sharedPdfUrl,
          members,
          ministers,
          minister: ministers[0] || null,
        };
      }),
    };
  });

  return {
    defaultSelection: {
      kla_id: Number(json?.default?.kla_id) || null,
      session_id: Number(json?.default?.session_id) || null,
    },
    sessions: normalizedSessions,
    rows: normalizedSessions.flatMap((session) => session.budget_items),
  };
};

// Fetch KLA sessions with members and ministers data
export const fetchKlaSessionsWithMembers = async (klaId = 15) => {
  try {
    const url = "https://api.niyamasabha.in/api/kla-sessions-with-members";
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json",
      },
    };

    if (klaId != null) {
      opts.body = new URLSearchParams({ kla_id: String(klaId) }).toString();
    }

    const res = await fetch(url, opts);
    const json = await res.json();

    // API may return { status: true, data: {...} } or a bare object
    if (json?.status && json.data) {
      return json.data;
    }
    if (json && typeof json === 'object') {
      return json;
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error fetching KLA sessions with members:", error);
    throw error;
  }
};

// Extract and filter members from sessions data
export const extractMembersFromSessionsData = (sessionsData) => {
  if (!sessionsData || !sessionsData.members) return [];
  return Array.isArray(sessionsData.members) ? sessionsData.members : [];
};

// Extract and filter ministers from sessions data
export const extractMinistersFromSessionsData = (sessionsData) => {
  if (!sessionsData || !sessionsData.ministers) return [];
  return Array.isArray(sessionsData.ministers) ? sessionsData.ministers : [];
};

// Get all unique constituencies from members
export const getUniqueMemberConstituencies = (members) => {
  const constituencies = new Set();
  members.forEach((member) => {
    const name = member?.constituency?.entitle || member?.constituency?.maltitle;
    if (name) constituencies.add(name);
  });
  return Array.from(constituencies).sort();
};

// Filter members by criteria
export const filterMembers = (members, filters = {}) => {
  return members.filter((member) => {
    if (filters.constituency) {
      const memberConstituency = member?.constituency?.entitle || member?.constituency?.maltitle;
      if (memberConstituency !== filters.constituency) return false;
    }
    
    if (filters.name) {
      const memberName = member?.name || "";
      if (!memberName.toLowerCase().includes(filters.name.toLowerCase())) return false;
    }
    
    if (filters.klaId && member.kla_id !== filters.klaId) {
      return false;
    }
    
    return true;
  });
};

// Filter ministers by criteria
export const filterMinisters = (ministers, members, filters = {}) => {
  return ministers.filter((minister) => {
    if (filters.name) {
      if (!minister.member_name?.toLowerCase().includes(filters.name.toLowerCase())) return false;
    }
    
    if (filters.klaId && minister.kla_id !== filters.klaId) {
      return false;
    }
    
    // Get member details for additional filtering
    const memberDetails = members.find((m) => m.member_id === minister.member_id);
    if (memberDetails && filters.constituency) {
      const memberConstituency = memberDetails?.constituency?.entitle || memberDetails?.constituency?.maltitle;
      if (memberConstituency !== filters.constituency) return false;
    }
    
    return true;
  });
};

export default {
  fetchConstituencies,
  fetchKlaList,
  fetchKlaSessions,
  fetchAllotmentDays,
  fetchCommittees,
  fetchCommitteeById,
  fetchPeriodicals,
  fetchScheduleWebUpdation,
  fetchBudgetSessions,
  fetchKlaSessionsWithMembers,
  extractMembersFromSessionsData,
  extractMinistersFromSessionsData,
  getUniqueMemberConstituencies,
  filterMembers,
  filterMinisters,
};
