import { createStore } from 'vuex';
import { getUserById, getOrgById } from '../../api/api'

export default createStore({
  state: {
    username: null,
    role: null,
    orgName: null,
  },
  mutations: {
    setUserData(state, { username, role, orgName }) {
      state.username = username;
      state.role = role;
      state.orgName = orgName;
      console.log('New user data:', state.username, state.role, state.orgName);
    },
  },
  actions: {
    async fetchUserData({ commit }, { userId, orgId } ) {
      // Call the API to get user information and organization name
      console.log('store userId:', userId)
      const user = await getUserById(userId);
      const org = await getOrgById(orgId);

      commit('setUserData', {
        username: user.username,
        role: user.role,
        orgName: org.name,
      });
    },
  },
  getters: {
    username: (state) => state.username,
    role: (state) => state.role,
    orgName: (state) => state.orgName,
  },
});
