import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    organizations: [],
    organizationName: '',
    organizationId: null,
    organizationEvents: [],
    organizationServices: [],
    organizationClients: [],
    organizationEventServices: [],
    organizationEventClients: [],
    userRole: ''
  },
  mutations: {
    // consider deleting
    setOrganizations(state, organizations) {
      state.organizations = organizations
    },
    setOrganizationName(state, organizationName) {
      state.organizationName = organizationName
    },
    setOrganizationId(state, organizationId) {
      state.organizationId = organizationId
    },
    setUserRole(state, userRole) {
      state.userRole = userRole
    },
    setOrgEvents(state, organizationEvents) {
      state.organizationEvents = organizationEvents
    },
    setOrgServices(state, organizationServices) {
      state.organizationServices = organizationServices
    },
    setOrgClients(state, organizationClients) {
      state.organizationClients = organizationClients
    },
    setOrgEventServices(state, organizationEventServices) {
      state.organizationEventServices = organizationEventServices
    },
    setOrgEventClients(state, organizationEventClients) {
      state.organizationEventClients = organizationEventClients
    },
    addClient(state, client) {
      state.organizationClients.push(client)
    },
    updateClient(state, updatedClient) {
      const clientIndex = state.organizationClients.findIndex(client => client.id === updatedClient.id)
      if (clientIndex !== -1) {
        state.organizationClients[clientIndex] = updatedClient
      }
    },
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
    deleteClient(state, clientId) {
      // Delete client from organizationClients store
      state.organizationClients = state.organizationClients.filter(client => client.id !== clientId)

      // Update the eventClients array to remove the client from all events
      state.organizationEventClients.forEach(eventClient => {
        eventClient.clientIds = eventClient.clientIds.filter(id => id !== clientId)
      })
    },
    addEvent(state, payload) {
      state.organizationEvents.push(payload.event)
      state.organizationEventServices.push({
        "eventId": payload.event.id,
        "serviceIds": payload.eventServiceIds
      })
    },
    updateEvent(state, updatedEvent) {
      const eventIndex = state.organizationEvents.findIndex(event => event.id === updatedEvent.id)
      if (eventIndex !== -1) {
        state.organizationEvents[eventIndex] = updatedEvent
      }
    },
    updateEventServices(state, { eventId, eventServiceIds }) {
      console.log('eventid', eventId)
      console.log('eventServiceIds', eventServiceIds)
      state.organizationEventServices = state.organizationEventServices.map(event => {
        if (event.eventId === eventId) {
          return { ...event, serviceIds: eventServiceIds }
        } else {
          return event
        }
      })
    },
    deleteEvent(state, eventId) {
      // Delete event from organizationEvents store
      state.organizationEvents = state.organizationEvents.filter(event => event.id !== eventId)

      // Delete event from organizationEventClients store:
      state.organizationEventClients = state.organizationEventClients.filter(eventClient => eventClient.eventId !== eventId);

      // Delete event from organizationEventServices store:
      state.organizationEventServices = state.organizationEventServices.filter(eventService => eventService.eventId !== eventId)
      
    },
    addService(state, service) {
      state.organizationServices.push(service)
    },
    updateService(state, updatedService) {
      console.log('updatedService: ', updatedService)
      const serviceIndex = state.organizationServices.findIndex(service => service.id === updatedService.id)
      if (serviceIndex !== -1) {
        state.organizationServices[serviceIndex] = updatedService
      }
    },
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
  actions: {
    async fetchOrganizations({ commit }) {
      const response = await axios.get('/data/db.json')
      const organizations = response.data.organizations
      commit('setOrganizations', organizations)
    },
    login({ state, commit }, { username, password }) {
      const organization = state.organizations.find(org => {
        const user = org.users.find(user => user.username === username && user.password === password)
        return user !== undefined
      })
      if (organization) {
        const user = organization.users.find(user => user.username === username && user.password === password)
        commit('setOrganizationName', organization.name)
        commit('setOrganizationId', organization.id)
        commit('setUserRole', user.role)
        commit('setOrgEvents', organization.events)
        commit('setOrgServices', organization.services)
        commit('setOrgClients', organization.clients)
        commit('setOrgEventServices', organization.eventServices)
        commit('setOrgEventClients', organization.eventClients)
        return { success: true }
      }
      return { success: false, message: 'Invalid username or password' }
    },
    clearSessionStates({ commit }) {
      commit('setUserRole', null)
      commit('setOrganizationName', '')
      commit('setOrganizationId', null)
      commit('setOrgEvents', [])
      commit('setOrgServices', [])
      commit('setOrgClients', [])
      commit('setOrgEventServices', [])
      commit('setOrgEventClients', [])
    }    
  },
  getters: {}
})

export default store
