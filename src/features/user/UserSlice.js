import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import userService from "./UserService";

export const getUsers = createAsyncThunk("v1/users", async(thunkAPI) => {
    try {
        return await userService.getUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
export const createUsers = createAsyncThunk("v1/users", async(userData,thunkAPI) => {
    try {
        return await userService.createUsers(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all")

const initialState = {
    users: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.users= action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // .addCase(createUsers.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(createUsers.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = false;
            //     state.isSuccess = true;
            //     state.createdUser= action.payload;
            // })
            // .addCase(createUsers.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.isSuccess = false;
            //     state.message = action.error;
            // })
            // .addCase(resetState, () =>
            // initialState)
    }
});
export default userSlice.reducer;