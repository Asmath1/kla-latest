import axiosInstance from "../axios";
import { API_ENDPOINTS } from "../endpoints";

export const fetchLatestNews = () => {
  return axiosInstance.get(API_ENDPOINTS.FLASH_ALERTS);
};

export const fetchServices = () => {
  return axiosInstance.get(API_ENDPOINTS.SERVICES);
};

// export const fetchOfficialSites = () => {
//   return axiosInstance.get(API_ENDPOINTS.OFFICIAL_SITES);
// };

export const fetchOfficialSites = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.OFFICIAL_SITES);
    // The API returns { data: [...] }, so extract it
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching official sites:", error);
    return [];
  }
};

export const fetchMenus = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.MENUS);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching menus:", error);
    return [];
  }
};

export const fetchProceedings = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.KLA_PROCEEDINGS);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching proceedings:", error);
    return [];
  }
};

export const fetchChiefMinisters = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.CHIEF_MINISTERS);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching chief ministers:", error);
    return [];
  }
};

export const fetchMadrasCouncil = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.MADRAS_COUNCIL);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching Madras Council data:", error);
    return [];
  }
};

export const fetchFormerSecretaries = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.FORMER_SECRETARIES);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching Former Secretaries data:", error);
    return [];
  }
};

export const fetchSynopsis = async ({ kla_id, session_no } = {}) => {
  try {
    const params = new URLSearchParams();
    if (kla_id != null) params.set("kla_id", String(kla_id));
    if (session_no != null) params.set("session_no", String(session_no));
    const query = params.toString();
    const url = query ? `${API_ENDPOINTS.SYNOPSIS}?${query}` : API_ENDPOINTS.SYNOPSIS;
    const response = await axiosInstance.get(url);
    // Handle { status, data: [...] } or bare array
    if (response.data?.status && Array.isArray(response.data?.data)) return response.data.data;
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching Synopsis data:", error);
    return [];
  }
};

export const fetchGleaning = async ({ kla_id, session_no } = {}) => {
  try {
    const params = new URLSearchParams();
    if (kla_id != null) params.set("kla_id", String(kla_id));
    if (session_no != null) params.set("session_no", String(session_no));
    const query = params.toString();
    const url = query ? `${API_ENDPOINTS.GLEANING}?${query}` : API_ENDPOINTS.GLEANING;
    const response = await axiosInstance.get(url);
    // Handle { status, data: [...] } or bare array
    if (response.data?.status && Array.isArray(response.data?.data)) return response.data.data;
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching Gleaning data:", error);
    return [];
  }
};

export const fetchStatisticalAnalysis = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.STATISTICAL_ANALYSIS);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching Statistical Analysis data:", error);
    return [];
  }
};

export const fetchPresidentsRule = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.PRESIDENTS_RULE);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching President's Rule data:", error);
    return [];
  }
};

export const fetchPvtMemberResolutions = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.PVT_MEMBER_RESOLUTIONS);
    console.log("API Response:", response);
    console.log("Response data:", response.data);
    
    // Handle different response structures
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (response.data) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching Private Member Resolutions data:", error);
    return [];
  }
};

export const fetchBudgetSpeeches = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.BUDGET_SPEECHES);
    console.log("Budget Speeches API Response:", response);
    
    // Handle different response structures
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (response.data) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching Budget Speeches data:", error);
    return [];
  }
};

export const fetchTenders = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.TENDERS);
    console.log("Tenders API Response:", response);
    
    // Handle different response structures
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (response.data) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching Tenders data:", error);
    return [];
  }
};

export const fetchKlaDuration = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.KLA_DURATION);
    console.log("KLA Duration API Response:", response);
    
    // Handle different response structures
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (response.data) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching KLA Duration data:", error);
    return [];
  }
};

export const fetchMemberContact = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`${API_ENDPOINTS.MEMBER_CONTACT}?page=${page}`);
    console.log("Member Contact API Response:", response);
    
    // API returns paginated data with structure: { success: true, data: { data: [...], current_page, last_page, etc } }
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }
    
    return { data: [], current_page: 1, last_page: 1, total: 0 };
  } catch (error) {
    console.error("Error fetching Member Contact data:", error);
    return { data: [], current_page: 1, last_page: 1, total: 0 };
  }
};