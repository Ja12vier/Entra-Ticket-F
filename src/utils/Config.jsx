
const Config=()=>({
   headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`
   }
});

export default Config;  

