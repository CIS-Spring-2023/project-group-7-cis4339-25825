import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend API base URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login API calls
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
};

// Call this function when your app initializes to set the auth header if a token exists in local storage
export function initializeAuthHeaderFromLocalStorage() {
  const token = localStorage.getItem('authToken');
  if (token) {
    setAuthHeader(token);
  }
}

export async function getUserById(userId) {
  console.log('getUserById api call')
  console.log('getUserById userId', userId)
  try {
    const response = await apiClient.get(`/users/id/${userId}`);
    console.log('getUserById response', response.data)
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export async function getOrgById(orgId) {
  console.log('getOrgyId api call')
  console.log('getOrgById orgId', orgId)
  const response = await apiClient.get(`/org/id/${orgId}`);
  console.log('getOrgById response', response.data)
  return response.data;
};


// API Calls for events
// GET 10 most recent events for all orgs
export const getAllRecentEvents = async () => {
  console.log('getAllRecentEvents')
  try {
    const response = await axios.get('http://localhost:3000/events/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET all events for org
export const getAllOrgEvents = async () => {
  try {
    const response = await apiClient.get('/events/all/org');
    return response.data;
  } catch (error) {
    console.log('getOrgRecentEvents error', error);
    throw (error);
  }
};


// GET 10 most recent events for org
export const getOrgRecentEvents = async () => {
    try {
      const response = await apiClient.get('/events/');
      return response.data;
    } catch (error) {
      console.log('getOrgRecentEvents error', error);
      throw (error);
    }
  };
  
  // GET single event by ID
  export const getEventById = async (id) => {
    try {
      const response = await apiClient.get(`/events/id/${id}`);
      return response.data;
    } catch (error) {
      console.log('getEventById API call error:', error);
      throw (error);
    }
  };
  
  // GET events based on search query
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
      console.log('searchEvents params', params)
      const response = await apiClient.get(`/events/search`, {
        params: params
      });
     return response.data;
   } catch(error) {
      console.log('searchEvents error', error)
      throw (error)
   }
  };
  
  // GET events for which a client is signed up
  export const getClientEvents = async (id) => {
    try {
      const response = await apiClient.get(`/events/client/${id}`);
      return response.data
    } catch (error) {
      console.log('getClientEvents API call error', error);
      throw (error);
    }
  };

// GET events for which a client is not signed up
export const getNonClientEvents = async (id) => {
  try {
    const response = await apiClient.get(`/events/client/${id}/not-registered`);
    return response.data
  } catch (error) {
    console.log('getNonClientEvents API call error', error);
    throw (error);
  }
};



// GET all attendees for an event
export const getEventAttendees = async (id) => {
  try {
    const response = await apiClient.get(`/events/attendees/${id}`);
    return response.data;
  } catch (error) {
    console.log('getEventAttendees API call error', error);
    throw error;
  }
};

// GET all events for a given service
export const getEventsByServiceId = async (id) => {
  try {
    const response = await apiClient.get(`/events/service/${id}`);
    return response.data;
  } catch (error) {
    console.log('getEventsByServiceId API call error', error);
    throw (error);
  }
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
  export const createEvent = async (eventData) => {
    try {
      const response = await apiClient.post('/events/', eventData);
      return response.data;
    } catch (error) {
      console.log('createEvent API call error', error);
      throw (error);
    }
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
      console.log('registerAttendee API call error', error);
      throw (error)
    }
  };
  
  // PUT remove attendee from event
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
      console.log('deregisterAttendee API call error', error);
      throw (error)
    }
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
export const getAllClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clients/all');
      return response.data;
    } catch (error) {
      console.log('getAllClients error', error)
      throw(error);
    }
  };
  
// GET all clients for org
export const getOrgClients = async () => {
  try {
    const response = await apiClient.get('clients/org');
    console.log('getOrgClients response:', response)
    return response.data;
  } catch (error) {
    console.log('getAllClients error', error)
    throw(error);
  }
};

  // GET 10 most recent clients for org
  export const getOrgRecentClients = async () => {
    try {
      const response = await apiClient.get('clients/');
      return response.data
    } catch (error) {
      console.log('getOrgRecentClients error', error)
      throw(error);
    }
  };
  
  // GET single client by ID
  export const getClientById = async (id) => {
    try {
      const response = await apiClient.get(`/clients/id/${id}`);
      return response.data
    } catch (error) {
      console.log('getClientById API call error', error);
      throw (error);
    }
  };
  
  // GET entries based on search query
export const searchClients = async (query) => {
  console.log('searchClients query', query)
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
      console.log('searchClients error', error);
      throw error;
  }
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
  export const createClient = async (newClient) => {
    try {
      const response = await apiClient.post('/clients', newClient);
      return response.data;
    } catch(error) {
      console.log('createClient API call error', error);
      throw (error);
    }
  };
  
  // PUT update client
  export const updateClient = async (id, updatedClient) => {
    try {
      const response = await apiClient.put(`/clients/update/${id}`, updatedClient);
      return response.data
    } catch (error) {
      console.log('updateClient API call error',error)
    }
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
export const getOrgRecentServices = async () => {
  try {
      const response = await apiClient.get('/services/');
      return response.data;
  } catch (error) {
    console.log('getOrgRecentServices API call error', error)
    throw (error);
  }
};


// GET all active services for org
export const getActiveServices = async () => {
  try {
    const response = await apiClient.get('/services/active');
    return response.data
  } catch (error) {
    console.log('getActiveServices API call error', error)
    throw (error);
  }
};
  
  // GET single service by ID
  export const getServiceById = async (id) => {
    try {
      const response = await apiClient.get(`/services/id/${id}`);
      return response.data
    } catch (error) {
      console.log('getServiceById API call error', error);
      throw (error);
    }
  };
  
  // GET services based on search query
  export const searchServices = async (query) => {
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
      console.log('searchServices API call error', error);
      throw (error);
    }
  };

  // POST new service
  export const createService = async (newService) => {
    try {
      const response = await apiClient.post('/services', newService);
      return response.data
    } catch (error) {
      console.log('createService API call error', error);
      throw (error);
    }
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
  