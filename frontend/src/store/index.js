// This is the file that uses Vuex to manage session states.

// import Vuex functionalities
import { createStore } from 'vuex';

// import API calls
import { getUserById, getOrgById } from '../../api/api'

export default createStore({
  // create session states for username, role, and organization name
  state: {
    username: null,
    role: null,
    orgName: null,
  },
  mutations: {
    // when user logs in, session stores are set
    setUserData(state, { username, role, orgName }) {
      state.username = username;
      state.role = role;
      state.orgName = orgName;
    },
    // when user logs out, session stores are cleared
    clearSessionData(state) {
      state.username = null;
      state.role = null;
      state.orgName = null;
    }
  },
  actions: {
    // when user logs in, API calls are made to get their information
    async fetchUserData({ commit }, { userId, orgId } ) {
      try {
        // Call the API to get user information and organization name        
        const user = await getUserById(userId);
        const org = await getOrgById(orgId);

        commit('setUserData', {
          username: user.username,
          role: user.role,
          orgName: org.name,
        });
      } catch (error) {
        throw error;
      }
    },
    // when user logs out, session stores are cleared
    clearSessionData({ commit }) {
      commit('clearSessionData');
    }
  },
  // getters for stores, so they may be referenced in frontend code
  getters: {
    username: (state) => state.username,
    role: (state) => state.role,
    orgName: (state) => state.orgName,
  },
});
