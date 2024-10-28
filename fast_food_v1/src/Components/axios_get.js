import axios from "axios"
const axos_get= async (url)=>{
  try{
    const res = await axios.get("http://localhost:3000/api/categories")
   return res.data
  }catch(err){
    throw err
  }
}
export default axos_get;