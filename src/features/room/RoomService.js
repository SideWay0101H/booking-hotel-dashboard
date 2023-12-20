import axios from "axios";
import { Base_Url } from "../../utils/Base_Url";

const getRooms = async() =>{
    const response = await axios.get(`${Base_Url}/v1/room`)
    return response.data
}

// const createRoom = async(room) =>{
//     const response = await axios.post(`${Base_Url}/v1/room`,room)
//     return response.data
// }

const RoomService = {
    getRooms,
    // createRoom,
}

export default RoomService