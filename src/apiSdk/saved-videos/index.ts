import axios from 'axios';
import queryString from 'query-string';
import { SavedVideoInterface, SavedVideoGetQueryInterface } from 'interfaces/saved-video';
import { GetQueryInterface } from '../../interfaces';

export const getSavedVideos = async (query?: SavedVideoGetQueryInterface) => {
  const response = await axios.get(`/api/saved-videos${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSavedVideo = async (savedVideo: SavedVideoInterface) => {
  const response = await axios.post('/api/saved-videos', savedVideo);
  return response.data;
};

export const updateSavedVideoById = async (id: string, savedVideo: SavedVideoInterface) => {
  const response = await axios.put(`/api/saved-videos/${id}`, savedVideo);
  return response.data;
};

export const getSavedVideoById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/saved-videos/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSavedVideoById = async (id: string) => {
  const response = await axios.delete(`/api/saved-videos/${id}`);
  return response.data;
};
