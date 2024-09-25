import axios from "axios";

// default url set karege->create karege
// env variable ka use karege
const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });
// jo functionality axios se use kar sakte the wo api se bhi API 
// bhi use kar sakte hai
API.interceptors.request.use((req) => {
  // authorisation token ki help se karege
  //token mila to if code execute
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
  }
  return req;
});

export default API;
