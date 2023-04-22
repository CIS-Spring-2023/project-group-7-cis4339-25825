import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend API base URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function setAuthHeader(token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function removeAuthHeader() {
  delete apiClient.defaults.headers.common['Authorization'];
}

export async function loginUser(username, password) {
  try {
    const response = await apiClient.post('/users/login', { username, password });
    const token = response.data.token;
    localStorage.setItem('authToken', token);
    setAuthHeader(token);
    return token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export function logoutUser() {
  localStorage.removeItem('authToken');
  removeAuthHeader();
}

// Call this function when your app initializes to set the auth header if a token exists in local storage
export function initializeAuthHeaderFromLocalStorage() {
  const token = localStorage.getItem('authToken');
  if (token) {
    setAuthHeader(token);
  }
}

// API Calls for events
// GET 10 most recent events for org
export const getRecentEvents = async (token) => {
    const response = await axios.get('/api/events/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // GET single event by ID
  export const getEventById = async (id, token) => {
    const response = await axios.get(`/api/events/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // GET events based on search query
  export const searchEvents = async (searchBy, query, token) => {
    const response = await axios.get(`/api/events/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        searchBy: searchBy,
        ...query,
      },
    });
    return response.data;
  };
  
  // GET events for which a client is signed up
  export const getClientEvents = async (id, token) => {
    const response = await axios.get(`/api/events/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // GET org event attendance for the past two months
  export const getOrgEventAttendance = async (token) => {
    const response = await axios.get(`/api/events/attendance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // POST new event
  export const createEvent = async (eventData, token) => {
    const response = await axios.post(`/api/events/`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // PUT update event
  export const updateEvent = async (id, eventData, token) => {
    const response = await axios.put(`/api/events/update/${id}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // PUT add attendee to event
  export const registerAttendee = async (eventId, clientId, token) => {
    const response = await axios.put(
      `/api/events/register`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          event: eventId,
          client: clientId,
        },
      }
    );
    return response.data;
  };
  
  // PUT remove attendee from event
  export const deregisterAttendee = async (eventId, clientId, token) => {
    const response = await axios.put(
      `/api/events/deregister`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          event: eventId,
          client: clientId,
        },
      }
    );
    return response.data;
  };
  
  // GET events for which a service is assigned
  export const getServiceEvents = async (id, token) => {
    const response = await axios.get(`/api/events/service/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // PUT add service to event
  export const addServiceToEvent = async (id, serviceId, token) => {
    const response = await axios.put(
      `/api/events/add-service/${id}`,
      { serviceId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
  
// PUT remove service from event
export const removeServiceFromEvent = async (id, serviceId, token) => {
    const response = await axios.put(
      `/api/events/remove-service/${id}`,
      { serviceId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
  
  // DELETE event by ID
  export const deleteEventById = async (id, token) => {
    const response = await axios.delete(`/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  

// API calls for clients

// GET all clients
export const getAllClients = async (token) => {
    const response = await axios.get('/api/clients/test', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // GET 10 most recent clients for org
  export const getRecentClients = async (token) => {
    const response = await axios.get('/api/clients', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // GET single client by ID
  export const getClientById = async (id, token) => {
    const response = await axios.get(`/api/clients/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // GET entries based on search query
  export const searchClients = async (query, token) => {
    const response = await axios.get('/api/clients/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: query,
    });
    return response.data;
  };
  
  // GET lookup by phone, verify org membership on frontend
  export const lookupClientByPhone = async (phoneNumber, token) => {
    const response = await axios.get(`/api/clients/lookup/${phoneNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // POST new client
  export const createClient = async (newClient, token) => {
    const response = await axios.post('/api/clients', newClient, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // PUT update client
  export const updateClient = async (id, updatedClient, token) => {
    const response = await axios.put(`/api/clients/update/${id}`, updatedClient, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // PUT add existing client to org
  export const registerClient = async (id, token) => {
    const response = await axios.put(`/api/clients/register/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // PUT remove existing client from org
  export const deregisterClient = async (id, token) => {
    const response = await axios.put(`/api/clients/deregister/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // DELETE client by ID
  export const deleteClientById = async (id, token) => {
    const response = await axios.delete(`/api/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  

// API calls for services

// GET 10 most recent services for org
export const getRecentServices = async (token) => {
    const response = await axios.get('/api/services', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // GET single service by ID
  export const getServiceById = async (id, token) => {
    const response = await axios.get(`/api/services/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // GET services based on search query
  export const searchServices = async (query, token) => {
    const response = await axios.get('/api/services/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: query,
    });
    return response.data;
  };
  
  // POST new service
  export const createService = async (newService, token) => {
    const response = await axios.post('/api/services', newService, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // PUT update service
  export const updateService = async (id, updatedService, token) => {
    const response = await axios.put(`/api/services/update/${id}`, updatedService, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // DELETE service by ID
  export const deleteServiceById = async (id, token) => {
    const response = await axios.delete(`/api/services/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  