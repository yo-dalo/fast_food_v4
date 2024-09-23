import axios from "axios"
const axos_get= async (url)=>{
  try{
    const res = await axios.get("/api/categories")
   return res.data
  }catch(err){
    throw err
  }
}
export default axos_get;