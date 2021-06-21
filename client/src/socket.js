import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";
import { isTyping, notTyping } from "./store/typing";

const socket = io(window.location.origin, { autoConnect: false });

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("user-connected", (user) => {
  store.dispatch(addOnlineUser(user.userID));
});

socket.on("remove-offline-user", (id) => {
  store.dispatch(removeOfflineUser(id));
});

socket.on("new-message", (data) => {
  store.dispatch(setNewMessage(data.message, data.sender));
});

socket.on("typing", (data) => {
  store.dispatch(isTyping(data));
});

socket.on("no-typing", (data) => {
  store.dispatch(notTyping(data));
});

export default socket;