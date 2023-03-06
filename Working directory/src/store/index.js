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
    userRole: ''
  },
  mutations: {
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
    }    
  },
  getters: {}
})

export default store
