import axios from "axios";
import socket from "../../socket";
import {
    gotConversations,
    addConversation,
    setNewMessage,
    setSearchedUsers,
} from "../conversations";
import { gotUser, setFetchingStatus } from "../user";

// Set up axios headers/cookies for CSRF token
axios.defaults.xsrfCookieName = "XSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
    dispatch(setFetchingStatus(true));
    try {
        const { data } = await axios.get("/auth/user");
        dispatch(gotUser(data));
    } catch (error) {
        console.error(error);
    } finally {
        dispatch(setFetchingStatus(false));
    }
};

export const register = (credentials) => async (dispatch) => {
    try {
        const { data } = await axios.post("/auth/register", credentials);
        dispatch(gotUser(data));
        socket.auth = {
            userID: data.id, 
            username: data.username
        };
        socket.connect();
    } catch (error) {
        console.error(error);
        dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
    }
};

export const login = (credentials) => async (dispatch) => {
    try {
        const { data } = await axios.post("/auth/login", credentials);
        dispatch(gotUser(data));
        socket.auth = {
            userID: data.id,
            username: data.username
        };
        socket.connect();
    } catch (error) {
        console.error(error);
        dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.delete("/auth/logout");
        dispatch(gotUser({}));
        socket.disconnect();
    } catch (error) {
        console.error(error);
    }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/conversations");
        dispatch(gotConversations(data));
    } catch (error) {
        console.error(error);
    }
};

const saveMessage = async (body) => {
    const { data } = await axios.post("/api/messages", body);
    return data;
};

const sendMessage = (data, body) => {
    socket.emit("new-message", {
        message: data.message,
        to: body.recipientId
    });
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch) => {
  try {
    const data = await saveMessage(body);
    if (!body.conversationId) {
      dispatch(addConversation(data.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message));
    }
      sendMessage(data, body);
  } catch (error) {
        console.error(error);
    }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/users/${searchTerm}`);
        dispatch(setSearchedUsers(data));
    } catch (error) {
        console.error(error);
    }
};
