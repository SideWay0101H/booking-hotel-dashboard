// import { configureStore } from "@reduxjs/toolkit"
// import roomReducer from '../src/features/room/RoomSlice'
// import userReducer from '../src/features/user/UserSlice'
// export const store = configureStore({
//     reducer: {
//         room: roomReducer,
//         user: userReducer
//     }

// }); 


import { legacy_createStore as createStore } from "redux";
import appReducers from "./redux/reducers/reducers";

const store = createStore(appReducers) 
export default store
