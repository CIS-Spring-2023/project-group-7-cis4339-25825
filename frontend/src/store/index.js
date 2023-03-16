// import store creation functionality from Vuex
import { createStore } from 'vuex'
// import axios to get data from data/db.json file through a get request
import axios from 'axios'

// create a "store" object that will hold all states, mutations, and actions
const store = createStore({
  // session states
  state: {
    // this session state holds all the data from data/db.json
    organizations: [],
    // this session state holds the organization name that the logged in user is part of
    organizationName: '',
    // this session state holds the organization ID that the logged in user is part of
    organizationId: null,
    // this session state holds an array of events for the organization that the logged in user is part of
    organizationEvents: [],
    // this session state holds an array of services for the organization that the logged in user is part of
    organizationServices: [],
    // this session state holds an array of clients for the organization that the logged in user is part of
    organizationClients: [],
    // this session state holds an array of eventServices (shows all event IDs and the service IDs for each event) for the organization that the logged in user is part of
    organizationEventServices: [],
    // this session state holds an array of eventClients (shows all event IDs and the client IDs for each event) for the organization that the logged in user is part of
    organizationEventClients: [],
    // this session state holds the user's role, either "viewer" or "editor"
    userRole: '',
    // this session state tracks whether the user is logged in
    loggedIn: false,
    // this session state holds the user's username
    userName: null
  },
  // mutations to modify session states
  mutations: {
    // when application is first opened, this fills the "organizations" state with all the data from data/db.json 
    setOrganizations(state, organizations) {
      state.organizations = organizations
    },
    // when user logs in, this fills the "organizationName" state with the user's organization's name
    setOrganizationName(state, organizationName) {
      state.organizationName = organizationName
    },
    // when user logs in, this fills the "organizationId" state with the user's organization's ID
    setOrganizationId(state, organizationId) {
      state.organizationId = organizationId
    },
    // when user logs in, this fills the "userRole" state with either "viewer" or "editor" depending on the user
    setUserRole(state, userRole) {
      state.userRole = userRole
    },
    // when user logs in, this sets the "loggedIn" state as true
    setLoggedIn(state) {
      state.loggedIn = true
    },
    // when user logs in, this fills the "userName" state with the user's username
    setUserName(state, username) {
      state.userName = username
    },// when user logs in, this fills the "organizationEvents" state with all the events for the user's organization
    setOrgEvents(state, organizationEvents) {
      state.organizationEvents = organizationEvents
    },
    // when user logs in, this fills the "organizationEvents" state with all the events for the user's organization
    setOrgServices(state, organizationServices) {
      state.organizationServices = organizationServices
    },
    // when user logs in, this fills the "organizationClients" state with all the clients for the user's organization
    setOrgClients(state, organizationClients) {
      state.organizationClients = organizationClients
    },
    // when user logs in, this fills the "organizationEventServices" state with all the eventServices for the user's organization i.e. all the event IDs and the service IDs for each event
    setOrgEventServices(state, organizationEventServices) {
      state.organizationEventServices = organizationEventServices
    },
    // when user logs in, this fills the "organizationEventClients" state with all the eventClients for the user's organization i.e. all the event IDs and the client IDs for each event
    setOrgEventClients(state, organizationEventClients) {
      state.organizationEventClients = organizationEventClients
    },
    // when a client is created on "ClientIntakeForm.vue", this mutation is called. It will push the new client details to the "organizationClients" state, which holds all clients for the organization
    addClient(state, client) {
      state.organizationClients.push(client)
    },
    // when a client is updated on "UpdateClient.vue", this searches for the client in the "organizationClients" state, then replaces that client's information with the new client information
    updateClient(state, updatedClient) {
      const clientIndex = state.organizationClients.findIndex(client => client.id === updatedClient.id)
      if (clientIndex !== -1) {
        state.organizationClients[clientIndex] = updatedClient
      }
    },
    // when a client is added to an event on "UpdateClient.vue", this searches through the "organizationEventClients" state - which holds all event IDs and client IDs for each event - to find the event that the user selected, then it will add that client ID to that event
    addClientToEvents(state, payload) {
      const { eventId, clientIdToAdd } = payload;
      state.organizationEventClients.forEach(event => {
        if (eventId.includes(event.eventId)) {
          if (!event.clientIds.includes(clientIdToAdd)) {
            event.clientIds.push(clientIdToAdd);
          }
        }
      });
    },    
    // when a client is deleted on "UpdateClient.vue", this filters through the "organizationClients" state - which holds all clients for an organization - and removes the cliet. Then, since that client ID may still be in the "organizationEventClients" state (because they may have been added to an event), this will find all instances of the deleted client's ID and remove it from all events
    deleteClient(state, clientId) {
      // Delete client from organizationClients store
      state.organizationClients = state.organizationClients.filter(client => client.id !== clientId)

      // Update the eventClients array to remove the client from all events
      state.organizationEventClients.forEach(eventClient => {
        eventClient.clientIds = eventClient.clientIds.filter(id => id !== clientId)
      })
    },
    // when an event is created on "CreateEvent.vue", this creates a new event on "organizationEvents" state. It will also create a new event ID in "organizationEventServices" state along with any service IDs that the event hosts. It also creates a new event ID in "organizationEventClients" state for future actions involving adding clients to the event.
    addEvent(state, payload) {
      state.organizationEvents.push(payload.event)
      state.organizationEventServices.push({
        "eventId": payload.event.id,
        "serviceIds": payload.eventServiceIds
      })
      state.organizationEventClients.push({
        "eventId": payload.event.id,
        "clientIds": []
      })
    },
    // when an event is updated on "EventDetails.vue", this searches through the "organizationEvents" state to find the event ID being updated, then replaces that event's information with the updated information
    updateEvent(state, updatedEvent) {
      const eventIndex = state.organizationEvents.findIndex(event => event.id === updatedEvent.id)
      if (eventIndex !== -1) {
        state.organizationEvents[eventIndex] = updatedEvent
      }
    },
    // when an event is updated by adding/removing services on "EventDetails.vue", this will look through "organizationEventServices" state to find the event ID being updated, then it will updated the service IDs for that event.
    updateEventServices(state, { eventId, eventServiceIds }) {
      const eventServicesIndex = state.organizationEventServices.findIndex(eventService => eventService.eventId === eventId);
      if (eventServicesIndex !== -1) {
        state.organizationEventServices[eventServicesIndex].serviceIds = eventServiceIds;
      }
    },    
    // when an event is deleted on "EventDetails.vue", this will filter the "organizationEvents" state to exclude the event requested for deletion. It will do the same for "organizationEventClients" and "organizationEventServices"
    deleteEvent(state, eventId) {
      // Delete event from organizationEvents store
      state.organizationEvents = state.organizationEvents.filter(event => event.id !== eventId)

      // Delete event from organizationEventClients store:
      state.organizationEventClients = state.organizationEventClients.filter(eventClient => eventClient.eventId !== eventId);

      // Delete event from organizationEventServices store:
      state.organizationEventServices = state.organizationEventServices.filter(eventService => eventService.eventId !== eventId)
    },
    // when a service is created on "CreateService.vue", this will add a new service to the user's organization's services array
    addService(state, { organizationId, service }) {
      state.organizations = state.organizations.map(org => {
        if (org.id === organizationId) {
          org.services.push(service);
        }
        return org;
      });
    },    
    // when a service is updated on "ServiceDetails.vue", this will look for the service ID in "organizationServices" state and replace that service's information with the updated information
    updateService(state, updatedService) {
      const serviceIndex = state.organizationServices.findIndex(service => service.id === updatedService.id)
      if (serviceIndex !== -1) {
        state.organizationServices[serviceIndex] = updatedService
      }
    },
    // when a service is selected as "Not Active", then this code will remove all instances of that service from all events that were previously hosting that service
    deregisterService(state, serviceId) {
      state.organizationEventServices = state.organizationEventServices.map(event => {
        // Check if the serviceId is in the serviceIds array of the event
        if (event.serviceIds.includes(serviceId)) {
          // Remove the serviceId from the serviceIds array
          event.serviceIds = event.serviceIds.filter(id => id !== serviceId);
        }
        return event;
      });
    }
    
  },
  // session actions
  actions: {
    // this is called as soon as the "LoginView.vue" view is rendered. It will get the data from /data/db.json, and process it as the "organizations" state
    async fetchOrganizations({ commit }) {
      const response = await axios.get('/data/db.json')
      const organizations = response.data.organizations
      commit('setOrganizations', organizations)
    },
    // this is called when the user attempts a login. If the user successfully logs in with the correct username/password, it will return success, and then the initializeUser action will occur. If user login is incorrect, it will return false, which will open up a modal component stating the login failed
    login({ state }, { username, password }) {
      const organization = state.organizations.find(org => {
        const user = org.users.find(user => user.username === username && user.password === password)
        return user !== undefined
      })
      if (organization) {
        const user = organization.users.find(user => user.username === username && user.password === password)
        return {
          success: true,
          organization,
          user
        }
      }
      return { success: false }
    },
    // this action occurs on "LoginView.vue" as long as the "login" action is successful. It will initialize all the session states that hold data for that user's organization, such as the organization's events, clients, services, etc.
    initializeUser({ commit }, { organization, user }) {
      //setting states of user log in and user role after the login action. This is so that the navigation bar is updated to show additional selections after the modal component closes. Much more seamless experience.
      commit('setLoggedIn')
      commit('setUserName', user.username)
      commit('setUserRole', user.role)
      commit('setOrganizationName', organization.name)
      commit('setOrganizationId', organization.id)
      commit('setOrgEvents', organization.events)
      commit('setOrgServices', organization.services) 
      commit('setOrgClients', organization.clients)
      commit('setOrgEventServices', organization.eventServices)
      commit('setOrgEventClients', organization.eventClients)
    },
    // this action occurs on "App.vue" when the user clicks the router link "Logout" it clears user information, which prevents them from seeing or accessing links other than "Login" and "Dashboard"
    logOut({ commit }) {
      commit('setUserRole', null)
      commit('setUserName', null)
      commit('setOrganizationId', null)
      commit('setOrganizationName', null)
    }    
  }
})

// allow other components to use the store
export default store
