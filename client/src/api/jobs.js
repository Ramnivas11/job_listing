import axios from 'axios';

/**
 * Axios instance configured with the API base URL from environment.
 * During development with Vite proxy, requests to /api/* are proxied
 * to the Express backend automatically.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * fetchJobs — call GET /api/jobs with the given query parameters.
 */
export const fetchJobs = async ({
  page = 1,
  limit = 10,
  search = '',
  location = '',
  type = '',
  experience = '',
  sort = 'date_desc',
} = {}) => {
  const params = { page, limit, sort };

  if (search.trim()) params.search = search.trim();
  if (location.trim()) params.location = location.trim();
  if (type.trim()) params.type = type.trim();
  if (experience.trim()) params.experience = experience.trim();

  const response = await api.get('/api/jobs', { params });
  return response.data;
};

/**
 * fetchJobById — call GET /api/jobs/:id for the detail page.
 */
export const fetchJobById = async (id) => {
  const response = await api.get(`/api/jobs/${id}`);
  return response.data;
};

export default api;
