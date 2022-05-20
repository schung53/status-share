import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getUsers,
    postStatusUpdate,
    updateUserPresence,
    updateUserProfile
} from "../api/usersAPI";
import {
    loadingUI,
    stopLoadingUI,
    setErrors
} from "./uiSlice";
import { setUpdateTime } from "./accountSlice";

const initialState = {
    users: [],
    user: {},
    loadingUsersData: false
};

export const getUserAsync = createAsyncThunk(
    "users/getUser",
    async (userId, { dispatch, getState }) => {
        dispatch(loadingUI());

        const users = getState().users.users;
        const user = users.find((element) => element.userId === userId);

        if (user) {
            dispatch(setUser(user));
        } else {
            dispatch(setUser(null));
        }
        dispatch(stopLoadingUI());
    }
);

export const getUsersAsync = createAsyncThunk(
    "users/getUsers",
    async (_, { dispatch }) => {
        dispatch(loadingUsersData());

        const response = await getUsers();
        const users = response.users;
        if (users) {
            dispatch(setUsers(users));
            dispatch(setUpdateTime());
        }

        return users;
    }
);

export const updateStatusAsync = createAsyncThunk(
    "users/updateStatus",
    async (statusObj, { dispatch }) => {
        try {
            dispatch(updateStatus(statusObj.statusData));
            const response = await postStatusUpdate(statusObj.userId, statusObj.statusData);
            return response;
        } catch (err) {
            console.error(err);
            dispatch(setErrors(err.response.data));
        }
    }
);

export const markPresentAsync = createAsyncThunk(
    "users/markPresent",
    async (userId, { dispatch }) => {
        try {
            dispatch(markPresent(userId));
            const response = await updateUserPresence(userId, true);
            return response;
        } catch (err) {
            console.error(err);
            dispatch(markNotPresent(userId));
        }
    }
);

export const markNotPresentAsync = createAsyncThunk(
    "users/markNotPresent",
    async (userId, { dispatch }) => {
        try {
            dispatch(markNotPresent(userId));
            const response = await updateUserPresence(userId, false);
            return response;
        } catch (err) {
            console.error(err);
            dispatch(markPresent(userId));
        }
    }
);

export const editProfileAsync = createAsyncThunk(
    "users/editProfile",
    async (profileObj, { dispatch }) => {
        try {
            dispatch(editUser(profileObj));
            const response = await updateUserProfile(profileObj);
            return response;
        } catch (err) {
            console.error(err);
        }
    }
);

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        loadingUsersData: (state) => {
            state.loadingUsersData = true;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            state.loadingUsersData = false;
        },
        markPresent: (state, action) => {
            let index1 = state.users.findIndex(
                (user) => user.userId === action.payload
            );
            state.users[index1].present = true;
            if (state.user.userId === action.payload) {
                state.user.present = true;
            }
        },
        markNotPresent: (state, action) => {
            let index2 = state.users.findIndex(
                (user) => user.userId === action.payload
            );
            state.users[index2].present = false;
            if (state.user.userId === action.payload) {
                state.user.present = false;
            }
        },
        updateStatus: (state, action) => {
            let index3 = state.users.findIndex(
                (user) => user.userId === action.payload.userId
            );
            state.users[index3].status = action.payload.status;
            state.users[index3].statusTime = action.payload.statusTime;
            if (state.user.userId === action.payload.userId) {
                state.user.status = action.payload.status;
                state.user.statusTime = action.payload.statusTime;
            }
        },
        editUser: (state, action) => {
            let index4 = state.users.findIndex(
                (user) => user.userId === action.payload.userId
            );
            state.users[index4].name = action.payload.name;
            state.users[index4].email = action.payload.email;
            state.users[index4].phone = action.payload.phone;
            state.users[index4].team = action.payload.team;
            state.users[index4].memo = action.payload.memo;
            if (state.user.userId === action.payload.userId) {
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.user.phone = action.payload.phone;
                state.user.team = action.payload.team;
                state.user.memo = action.payload.memo;
            }
        },
        decrementUnreadMessages: (state, action) => {
            let index5 = state.users.findIndex(
                (user) => user.userId === action.payload
            );
            state.users[index5].unreadMessages -= 1;
            if (state.user.userId === action.payload) {
                state.user.unreadMessages -= 1;
            }
        }
    }
});

export const {
    loadingUsersData,
    setUser,
    setUsers,
    markPresent,
    markNotPresent,
    updateStatus,
    editUser,
    decrementUnreadMessages
} = usersSlice.actions;

export default usersSlice.reducer;