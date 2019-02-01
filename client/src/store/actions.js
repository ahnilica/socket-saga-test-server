import { createAction } from "redux-actions";

// Open socket connection
export const OPEN_SOCKET_CONNECTION = "OPEN_SOCKET_CONNECTION";
export const openSocketConnection = createAction(OPEN_SOCKET_CONNECTION);

// Handle data received from socket connection
export const RECEIVED_SOCKET_DATA = "RECEIVED_SOCKET_DATA";
export const receivedSocketData = (data) => createAction(RECEIVED_SOCKET_DATA)({ data });

// Subscribe/unsubscribe to data streams
export const SEND_SOCKET_DATA = "SEND_SOCKET_DATA";
export const subscribe = (subscription) => createAction(SEND_SOCKET_DATA)({ instruction: "subscribe", subscription });
export const unsubscribe = (subscription) => createAction(SEND_SOCKET_DATA)({ instruction: "unsubscribe", subscription });

// Close socket connection
export const CLOSE_SOCKET_CONNECTION = "CLOSE_SOCKET_CONNECTION";
export const closeSocketConnection = createAction(CLOSE_SOCKET_CONNECTION);

// Update Values
export const UPDATE_A_VALUE = "UPDATE_A_VALUE";
export const updateAValue = (value) => createAction(UPDATE_A_VALUE)({ value });

export const UPDATE_B_VALUE = "UPDATE_B_VALUE";
export const updateBValue = (value) => createAction(UPDATE_B_VALUE)({ value });

export const UPDATE_C_VALUE = "UPDATE_C_VALUE";
export const updateCValue = (value) => createAction(UPDATE_C_VALUE)({ value });