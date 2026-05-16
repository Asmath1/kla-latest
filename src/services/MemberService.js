export const fetchKlaMembers = async (assemblyNumber = 15) => {
  try {
    // const response = await fetch(`https://klademo.cditproject.org/api/kla-members/${assemblyNumber}`, {
    const response = await fetch(`https://api.niyamasabha.in/api/kla-members/${assemblyNumber}`, {

      headers: { Accept: "application/json" },
    });

    const data = await response.json();
    if (data.status && data.data) {
      return data.data; // ✅ Return members list
    } else {
      throw new Error("No member data found.");
    }
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};

/**
 * Fetch members and ministers data from unified API
 * @param {number} klaId - The KLA ID (default: 15)
 * @returns {Promise<Object>} Object containing members and ministers arrays
 */
export const fetchKlaMembersAndMinisters = async (klaId = 15) => {
  try {
    const response = await fetch("https://api.niyamasabha.in/api/kla-sessions-with-members", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json",
      },
      body: new URLSearchParams({ kla_id: String(klaId) }).toString(),
    });

    const data = await response.json();
    
    if (data?.status && data?.data) {
      return {
        members: Array.isArray(data.data.members) ? data.data.members : [],
        ministers: Array.isArray(data.data.ministers) ? data.data.ministers : [],
        sessions: Array.isArray(data.data.sessions) ? data.data.sessions : [],
        kla_id: data.data.kla_id,
        kla_name: data.data.kla_name,
      };
    } else if (data && typeof data === 'object') {
      return {
        members: Array.isArray(data.members) ? data.members : [],
        ministers: Array.isArray(data.ministers) ? data.ministers : [],
        sessions: Array.isArray(data.sessions) ? data.sessions : [],
        kla_id: data.kla_id,
        kla_name: data.kla_name,
      };
    }
    
    throw new Error("Invalid response format from API");
  } catch (error) {
    console.error("Error fetching KLA members and ministers:", error);
    throw error;
  }
};

/**
 * Get all unique constituencies from members array
 * @param {Array} members - Array of member objects
 * @returns {Array} Sorted array of unique constituencies
 */
export const getConstituencies = (members = []) => {
  const constituencies = new Set();
  members.forEach((member) => {
    const name = member?.constituency?.entitle || member?.constituency?.maltitle;
    if (name) constituencies.add(name);
  });
  return Array.from(constituencies).sort();
};

/**
 * Get members that are also ministers
 * @param {Array} members - Array of member objects
 * @param {Array} ministers - Array of minister objects
 * @returns {Array} Array of members who are ministers
 */
export const getMembersWhoAreinisters = (members = [], ministers = []) => {
  const ministerMemberIds = new Set(ministers.map((m) => m.member_id));
  return members.filter((member) => ministerMemberIds.has(member.member_id));
};

/**
 * Filter members by various criteria
 * @param {Array} members - Array of member objects
 * @param {Object} filters - Filter object with properties like constituency, name, etc.
 * @returns {Array} Filtered members array
 */
export const filterMembersData = (members = [], filters = {}) => {
  let filtered = [...members];

  if (filters.constituency) {
    filtered = filtered.filter((member) => {
      const memberConstituency = member?.constituency?.entitle || member?.constituency?.maltitle;
      return memberConstituency === filters.constituency;
    });
  }

  if (filters.name) {
    const searchName = filters.name.toLowerCase();
    filtered = filtered.filter((member) => {
      const memberName = member?.name || "";
      return memberName.toLowerCase().includes(searchName);
    });
  }

  if (filters.isMinister) {
    const ministerIds = filters.ministerIds || [];
    filtered = filtered.filter((member) => ministerIds.includes(member.member_id));
  }

  return filtered;
};

/**
 * Filter ministers by various criteria
 * @param {Array} ministers - Array of minister objects
 * @param {Object} filters - Filter object with properties like name, etc.
 * @returns {Array} Filtered ministers array
 */
export const filterMinistersData = (ministers = [], filters = {}) => {
  let filtered = [...ministers];

  if (filters.name) {
    const searchName = filters.name.toLowerCase();
    filtered = filtered.filter((minister) => {
      const ministerName = minister?.member_name || "";
      return ministerName.toLowerCase().includes(searchName);
    });
  }

  return filtered;
};