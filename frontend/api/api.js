// This file contains all API calls to the API endpoints

// import axios to make API calls
import axios from 'axios';

// define a variable to store the localhost URL
const API_BASE_URL = 'http://localhost:3000';

// Create HTTP client with the base URL, and specify that the data sent in the request body is JSON
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API calls
// If user logs in successfully, this login sets a header to "apiClient" called "Authorization" with the value of "Bearer <token>" This security token is used to validate API calls
function setAuthHeader(token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// When user logs out, this function removes the Authorization header from apiClient
function removeAuthHeader() {
  delete apiClient.defaults.headers.common['Authorization'];
}

// API call to log the user in
export async function loginUser(username, password) {
  try {
    const response = await apiClient.post('/users/login', { username, password });
    const token = response.data.token;
    localStorage.setItem('authToken', token);
    setAuthHeader(token);
    return token;
  } catch (error) {
    throw error;
  }
}

// API call to log the user out
export function logoutUser() {
  localStorage.removeItem('authToken');
  removeAuthHeader();
};

// API call to get user by ID
export async function getUserById(userId) {
  try {
    const response = await apiClient.get(`/users/id/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to get org by ID
export async function getOrgById(orgId) {
  const response = await apiClient.get(`/org/id/${orgId}`);
  return response.data;
};

// API Calls for events
// API call to GET 10 most recent events for all orgs
export const getAllRecentEvents = async () => {
  try {
    const response = await apiClient.get('events/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to GET 10 most recent events for org
export const getOrgRecentEvents = async () => {
    try {
      const response = await apiClient.get('/events/');
      return response.data;
    } catch (error) {
      throw (error);
    }
  };

// API call to GET single event by ID
export const getEventById = async (id) => {
  try {
    const response = await apiClient.get(`/events/id/${id}`);
    return response.data;
  } catch (error) {
    throw (error);
  }
};

// API call to GET events based on search query
export const searchEvents = async (query) => {
  try {
    let params = {};
    if (query.searchBy === 'name') {
      params.searchBy = query.searchBy;
      params.name = query.name || '';
    } else if (query.searchBy === 'date') {
      params.searchBy = 'date'
      params.eventDate = query.eventDate || '';
    }
    const response = await apiClient.get(`/events/search`, {
      params: params
    });
    return response.data;
  } catch(error) {
    throw (error)
  }
};

// API call to GET events for which a client is signed up
export const getClientEvents = async (id) => {
  try {
    const response = await apiClient.get(`/events/client/${id}`);
    return response.data
  } catch (error) {
    throw (error);
  }
};


// API call to GET events for which a client is not signed up
export const getNonClientEvents = async (id) => {
  try {
    const response = await apiClient.get(`/events/client/${id}/not-registered`);
    return response.data
  } catch (error) {
    throw (error);
  }
};

// API call to GET all attendees for an event
export const getEventAttendees = async (id) => {
  try {
    const response = await apiClient.get(`/events/attendees/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to GET all events for a given service
export const getEventsByServiceId = async (id) => {
  try {
    const response = await apiClient.get(`/events/service/${id}`);
    return response.data;
  } catch (error) {    
    throw (error);
  }
};

// API call to POST new event
export const createEvent = async (eventData) => {
  try {
    const response = await apiClient.post('/events/', eventData);
    return response.data;
  } catch (error) {
    throw (error);
  }
};

// API call to PUT update event
export const updateEvent = async (id, eventData) => {
  try {
    const response = await apiClient.put(`/events/update/${id}`, eventData);
    return response.data;
  } catch (error) {
    throw (error);
  }
};

// API call to PUT add attendee to event
export const registerAttendee = async (eventId, clientId) => {
  try {
    const response = await apiClient.put(
      `/events/register`,
      {},
      {
        params: {
          event: eventId,
          client: clientId,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw (error)
  }
};

// API call to PUT remove attendee from event
export const deregisterAttendee = async (eventId, clientId) => {
  try {
    const response = await apiClient.put(
      `/events/deregister`,
      {},
      {
        params: {
          event: eventId,
          client: clientId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (error)
  }
};

// API call to GET events for which a service is assigned
export const getServiceEvents = async (id, token) => {
  const response = await axios.get(`/api/events/service/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// API call when service is inactive, remove service from all events
export const removeServiceFromOrgEvents = async (id) => {
  try {
    const response = await apiClient.put(`/events/remove-service-all/${id}`);
    return response.data;
  } catch (error) {
    throw (error);
  }
};
  
// API call to DELETE event by ID
export const deleteEventById = async (id) => {
  try {
    const response = await apiClient.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw (error);
  }
};

// API calls for clients
// API call to GET all clients
export const getAllClients = async () => {
    try {
      const response = await apiClient.get('clients/all');
      return response.data;
    } catch (error) {
      throw(error);
    }
  };

// API call to GET all clients for org
export const getOrgClients = async () => {
  try {
    const response = await apiClient.get('clients/org');
    return response.data;
  } catch (error) {
    throw(error);
  }
};

// API call to GET 10 most recent clients for org
export const getOrgRecentClients = async () => {
  try {
    const response = await apiClient.get('clients/');
    return response.data
  } catch (error) {
    throw(error);
  }
};

// API call to GET single client by ID
export const getClientById = async (id) => {
  try {
    const response = await apiClient.get(`/clients/id/${id}`);
    return response.data
  } catch (error) {
    throw (error);
  }
};
  
// API call to GET entries based on search query
export const searchClients = async (query) => {
  try {
    let params = {};
    if (query.searchBy === 'name') {
      params.searchBy = query.searchBy;
      params.firstName = query.firstName || '';
      params.lastName = query.lastName || '';
    } else if (query.searchBy === 'number') {
      params.searchBy = query.searchBy;
      params.phoneNumber = query.phoneNumber || '';
    }
    const response = await apiClient.get('/clients/search', {
      params: params
    });
    return response.data;
  } catch (error) {
      throw error;
  }
};

// API call to POST new client
export const createClient = async (newClient) => {
  try {
    const response = await apiClient.post('/clients', newClient);
    return response.data;
  } catch(error) {
    throw (error);
  }
};

// API call to PUT update client
export const updateClient = async (id, updatedClient) => {
  try {
    const response = await apiClient.put(`/clients/update/${id}`, updatedClient);
    return response.data
  } catch (error) {
  }
};

// API call to PUT remove existing client from org and all events under that org
export const deregisterClient = async (id) => {
  try {
    const response = await apiClient.put(`/clients/deregister/${id}`);
    return response.data;
  } catch (error) {
    throw (error);
  }
};
  

// API calls for services
// API call to GET 10 most recent services for org
export const getOrgRecentServices = async () => {
  try {
      const response = await apiClient.get('/services/');
      return response.data;
  } catch (error) {
    throw (error);
  }
};

// API call to GET all active services for org
export const getActiveServices = async () => {
  try {
    const response = await apiClient.get('/services/active');
    return response.data
  } catch (error) {
    throw (error);
  }
};

// API call to GET single service by ID
export const getServiceById = async (id) => {
  try {
    const response = await apiClient.get(`/services/id/${id}`);
    return response.data
  } catch (error) {
    throw (error);
  }
};
  
// API call to GET services based on search query
export const searchServices = async (query) => {
  console.log('searchServices API Call')
  try {
    let params = {};
    params.searchBy = query.searchBy;
    if (query.searchBy === 'name') {
      params.name = query.name || '';
    } else if (query.searchBy === 'description') {
      params.description = query.description;
    }
    const response = await apiClient.get('/services/search', {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw (error);
  }
};

// API call to POST new service
export const createService = async (newService) => {
  try {
    const response = await apiClient.post('/services', newService);
    return response.data
  } catch (error) {
    throw (error);
  }
};

// API call to PUT update service
export const updateService = async (id, updatedService) => {
  try {
    const response = await apiClient.put(`/services/update/${id}`, updatedService);
    return response.data;
  } catch (error) {
    throw (error);
  }
};

// API call to PUT deactivate service
export const deactivateService = async (id) => {
  try {
    const response = await apiClient.put(`/services/deactivate/${id}`);
    return response.data;
  } catch (error) {
    throw (error);
  }
};
