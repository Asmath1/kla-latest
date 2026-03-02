import axiosInstance from "../axios";
import { API_ENDPOINTS } from "../endpoints";

export const fetchAdministrationSections = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ADMINISTRATION_SECTIONS);
  return response.data;
};

export const fetchArchitectureSections = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ARCHITECTURE_SECTIONS);
  return response.data;
};

export const fetchBridgesSections = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.BRIDGES_SECTIONS);
  return response.data;
};

export const fetchBuildingsSections = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.BUILDINGS_SECTIONS);
  return response.data;
};

export const fetchDesignSections = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.DESIGN_SECTIONS);
  return response.data;
};

export const fetchNationalHighwaySections = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.NATIONAL_HIGHWAY_SECTIONS);
  return response.data;
};

export const fetchRoadMaintenanceSections = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ROAD_MAINTENANCE_SECTIONS);
  return response.data;
};

export const fetchRoadsSections = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.ROADS_SECTIONS);
  return response.data;
};
