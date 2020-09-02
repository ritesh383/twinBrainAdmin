import '../../plugins/axios'

const contents = {
  state: {
    GetAllContents: []
  },
  mutations: {
    ALL_CONTENT(state, allData_response) {
      state.GetAllContents = allData_response
    },
  },
  actions: {
    async getContents({
      commit
    }) {
      let token = localStorage.getItem('token');
      //  console.log('token :', token);
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }
      }

      const response = await axios.get("contents/1", config);
    //    console.log(response.data);
      let allData_response = response.data
      commit("ALL_CONTENT", allData_response);

    }
  },
}
export default contents