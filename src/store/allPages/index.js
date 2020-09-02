import '../../plugins/axios'

const pages = {
   state: {
       GetAllPage: []
     },
     mutations: {
       ALL_DATA(state, allData_response) {
         state.GetAllPage = allData_response
       },
     },
     actions: {
       async getPages({
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

         const response = await axios.get("pages", config);
        //   console.log(response.data);


         let pageDataArray = []
         let data = response.data
         data.forEach(element => {
        //    console.log('element', element)
            let pageName = element.page_label.toString();
            let Page_url = pageName.split(/[ ,]+/).join('-')
           let resp = {
             ...element,
             Page_url
           }

           pageDataArray.push(resp);

         });




         let allData_response = pageDataArray
         commit("ALL_DATA", allData_response);

       }
     },
}
export default pages