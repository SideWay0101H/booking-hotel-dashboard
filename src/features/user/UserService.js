import axios from "axios";
import { Base_Url } from "../../utils/Base_Url";
import requestApi from "../../helpers/api";

const getUsers = async() =>{
    const response = await axios.get(`${Base_Url}/v1/users`)
    return response.data
}


// const createUsers = async(user)=>{
//     const response = await axios.post(`${Base_Url}/v1/users`,user)
//     console.log(response.data)
//     return response.data
    
// }


const UserService = {
    getUsers,
    // createUsers
}

export default UserService