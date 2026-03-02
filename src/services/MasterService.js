export const fetchConstituencies = async (opts = {}) => {
  // Backend expects POST for this route — send form-encoded body.
  const url = "https://klademo.cditproject.org/api/constituencies";
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
  const res = await fetch("https://klademo.cditproject.org/api/kla-list", {
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
  const url = "https://klademo.cditproject.org/api/kla-sessions";
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
  const url = `https://klademo.cditproject.org/api/allotment_days${klaId ? `?kla_id=${klaId}` : ''}`;
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

export const fetchCommittees = async () => {
  const url = "https://klademo.cditproject.org/api/committees";
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
  const url = `https://klademo.cditproject.org/api/committees/${committeeId}`;
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

export const fetchPeriodicals = async () => {
  const url = "https://klademo.cditproject.org/api/periodicals";
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
  const url = `https://klademo.cditproject.org/api/schedule_web_updation_questions${klaId ? `?kla_id=${klaId}` : ''}`;
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

export default {
  fetchConstituencies,
  fetchKlaList,
  fetchKlaSessions,
  fetchAllotmentDays,
  fetchCommittees,
  fetchCommitteeById,
  fetchPeriodicals,
  fetchScheduleWebUpdation,
};
