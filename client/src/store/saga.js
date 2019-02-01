import { eventChannel } from "redux-saga";
import { call, race, take, takeEvery, put } from "redux-saga/effects";

// Actions
import { 
  OPEN_SOCKET_CONNECTION,
  RECEIVED_SOCKET_DATA,
  CLOSE_SOCKET_CONNECTION,
  SEND_SOCKET_DATA,
  updateAValue,
  updateBValue,
  updateCValue
} from "./actions";


function createWebSocketEventChannel(socket) {
  return eventChannel(emitter => {
    // handle incoming data from socket connection
    socket.onmessage = event => {
      return emitter({ type: RECEIVED_SOCKET_DATA, payload: JSON.parse(event.data) });
    }

    return () => socket.close();
  });
}

function* initializeWebSocketConnection() {
  const socket = new WebSocket("ws://localhost:40510");
  const socketEventChanel = yield call(createWebSocketEventChannel, socket);

  const { cancel } = yield race({
    receiveData: call(receiveInboundData, socketEventChanel),
    sendData: call(subscribeHandler, socket),
    cancel: take(CLOSE_SOCKET_CONNECTION)
  });

  if(cancel) {
    socketEventChanel.close();
  }
}

function* receiveInboundData(socketEventChanel) {
  while(true) {
    const action = yield take(socketEventChanel);
    yield put(action);
  }
}

function* subscribeHandler(socket) {
  while(true) {
    const action = yield take(SEND_SOCKET_DATA);
    socket.send(JSON.stringify(action.payload));
  }
}


function* sortReceivedData(action) {
  const { subscription, value } = action.payload;
  switch(subscription) {
    case "A":
      yield put(updateAValue(value));
      break;
    case "B":
      yield put(updateBValue(value));
      break;
    case "C":
      yield put(updateCValue(value));
      break;
    default:
      break;
  }
}


export default function* rootSaga() {
  yield takeEvery(OPEN_SOCKET_CONNECTION, initializeWebSocketConnection);
  yield takeEvery(RECEIVED_SOCKET_DATA, sortReceivedData);
}