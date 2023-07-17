import axios from 'axios';
import queryString from 'query-string';
import { ContentCreatorInterface, ContentCreatorGetQueryInterface } from 'interfaces/content-creator';
import { GetQueryInterface } from '../../interfaces';

export const getContentCreators = async (query?: ContentCreatorGetQueryInterface) => {
  const response = await axios.get(`/api/content-creators${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createContentCreator = async (contentCreator: ContentCreatorInterface) => {
  const response = await axios.post('/api/content-creators', contentCreator);
  return response.data;
};

export const updateContentCreatorById = async (id: string, contentCreator: ContentCreatorInterface) => {
  const response = await axios.put(`/api/content-creators/${id}`, contentCreator);
  return response.data;
};

export const getContentCreatorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/content-creators/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteContentCreatorById = async (id: string) => {
  const response = await axios.delete(`/api/content-creators/${id}`);
  return response.data;
};
