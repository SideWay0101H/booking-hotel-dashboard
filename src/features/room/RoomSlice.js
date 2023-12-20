import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roomService from "./RoomService";

export const getRooms = createAsyncThunk("v1/room", async(thunkAPI) => {
    try {
        return await roomService.getRooms();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
// export const createRoom = createAsyncThunk("v1/room", async(roomData,thunkAPI) => {
//     try {
//         return await roomService.createRoom(roomData);
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error);
//     }
// })

const initialState = {
    rooms: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRooms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRooms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rooms= action.payload;
            })
            .addCase(getRooms.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // .addCase(createRoom.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(createRoom.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = false;
            //     state.isSuccess = true;
            //     state.createRoom= action.payload;
            // })
            // .addCase(createRoom.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.isSuccess = false;
            //     state.message = action.error;
            // });
    }
});
export default roomSlice.reducer;