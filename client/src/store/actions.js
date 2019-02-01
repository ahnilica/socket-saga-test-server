import { createAction } from "redux-actions";

/*** Socket Actions ***/

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


/*** Action Channel Managers */
export const WRITE_TO_ACTION_CHANNEL_A = "WRITE_TO_ACTION_CHANNEL_A";
export const writeToActionChannelA = (value) => createAction(WRITE_TO_ACTION_CHANNEL_A)({ value });

export const WRITE_TO_ACTION_CHANNEL_B = "WRITE_TO_ACTION_CHANNEL_B";
export const writeToActionChannelB = (value) => createAction(WRITE_TO_ACTION_CHANNEL_B)({ value });

export const WRITE_TO_ACTION_CHANNEL_C = "WRITE_TO_ACTION_CHANNEL_C";
export const writeToActionChannelC = (value) => createAction(WRITE_TO_ACTION_CHANNEL_C)({ value });

export const CONSUME_ACTION_CHANNEL_A = "CONSUME_ACTION_CHANNEL_A";
export const consumeActionChannelA = createAction(CONSUME_ACTION_CHANNEL_A);

export const CONSUME_ACTION_CHANNEL_B = "CONSUME_ACTION_CHANNEL_B";
export const consumeActionChannelB = createAction(CONSUME_ACTION_CHANNEL_B);

export const CONSUME_ACTION_CHANNEL_C = "CONSUME_ACTION_CHANNEL_C";
export const consumeActionChannelC = createAction(CONSUME_ACTION_CHANNEL_C);

export const FLUSH_ACTION_CHANNEL_A = "FLUSH_ACTION_CHANNEL_A";
export const flushActionChannelA = createAction(FLUSH_ACTION_CHANNEL_A);

export const FLUSH_ACTION_CHANNEL_B = "FLUSH_ACTION_CHANNEL_B";
export const flushActionChannelB = createAction(FLUSH_ACTION_CHANNEL_B);

export const FLUSH_ACTION_CHANNEL_C = "FLUSH_ACTION_CHANNEL_C";
export const flushActionChannelC = createAction(FLUSH_ACTION_CHANNEL_C);


/*** State Mutators ***/

// Update Values
export const UPDATE_A_VALUE = "UPDATE_A_VALUE";
export const updateAValue = (value) => createAction(UPDATE_A_VALUE)({ value });

export const UPDATE_B_VALUE = "UPDATE_B_VALUE";
export const updateBValue = (value) => createAction(UPDATE_B_VALUE)({ value });

export const UPDATE_C_VALUE = "UPDATE_C_VALUE";
export const updateCValue = (value) => createAction(UPDATE_C_VALUE)({ value });