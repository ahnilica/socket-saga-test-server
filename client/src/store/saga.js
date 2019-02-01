import { eventChannel } from "redux-saga";
import { all, call, race, take, takeEvery, put, fork, flush, actionChannel } from "redux-saga/effects";

// Actions
import { 
  OPEN_SOCKET_CONNECTION,
  RECEIVED_SOCKET_DATA,
  CLOSE_SOCKET_CONNECTION,
  SEND_SOCKET_DATA,
  WRITE_TO_ACTION_CHANNEL_A,
  writeToActionChannelA,
  WRITE_TO_ACTION_CHANNEL_B,
  writeToActionChannelB,
  WRITE_TO_ACTION_CHANNEL_C,
  writeToActionChannelC,
  CONSUME_ACTION_CHANNEL_A,
  CONSUME_ACTION_CHANNEL_B,
  CONSUME_ACTION_CHANNEL_C,
  updateAValue,
  updateBValue,
  updateCValue,
  FLUSH_ACTION_CHANNEL_A,
  flushActionChannelA,
  FLUSH_ACTION_CHANNEL_B,
  flushActionChannelB,
  FLUSH_ACTION_CHANNEL_C,
  flushActionChannelC
} from "./actions";


/*** Web Socket Implementation ***/
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
  yield fork(createActionChannels);

  // process bi-directional socket data until connection is closed
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
    // pop action from the socket event channel
    const action = yield take(socketEventChanel);
    yield put(action);
  }
}

function* subscribeHandler(socket) {
  while(true) {

    // handle data stream subscription and unsubscription
    const action = yield take(SEND_SOCKET_DATA);
    socket.send(JSON.stringify(action.payload));

    // if unsubscribing, flush action channel
    const { instruction, subscription } = action.payload;
    if(instruction === "unsubscribe") {
      switch(subscription) {
        case "A":
          yield put(flushActionChannelA());
          break;
        case "B":
          yield put(flushActionChannelB());
          break;
        case "C":
          yield put(flushActionChannelC());
          break;
        default:
          break;
      }
    }
  }
}


/*** Action channel implementation ***/
function* createActionChannels() {
  yield all([
    fork(handleActionChannelA),
    fork(handleActionChannelB),
    fork(handleActionChannelC)
  ]);
}

function* handleActionChannelA() {
  const actionChannelA = yield actionChannel(WRITE_TO_ACTION_CHANNEL_A);

  while(true) {
    yield take(CONSUME_ACTION_CHANNEL_A);

    const { flushChannel } = yield race({
      consume: call(readActionChannelA, actionChannelA),
      flushChannel: take(FLUSH_ACTION_CHANNEL_A)
    });

    if(flushChannel) {
      yield flush(actionChannelA);
    }
  }
}
  
function* readActionChannelA(actionChannelA) {
  while(true) {
    const { payload: { value }} = yield take(actionChannelA);

    /*
      Note: in our platform, this is when we would use a selector to get the sequence ID returned from the 
      most recent API call. If the sequence ID of the buffered action is less than the API call's, do not 
      dispatch the action.
    */

    yield put(updateAValue(value));
  }
}

function* handleActionChannelB() {
  const actionChannelB = yield actionChannel(WRITE_TO_ACTION_CHANNEL_B);

  while(true) {
    yield take(CONSUME_ACTION_CHANNEL_B);
    
    const { flushChannel } = yield race({
      consume: call(readActionChannelB, actionChannelB),
      flushChannel: take(FLUSH_ACTION_CHANNEL_B)
    });

    if(flushChannel) {
      yield flush(actionChannelB);
    }
  }
}

function* readActionChannelB(actionChannelB) {
  while(true) {
    const { payload: { value }} = yield take(actionChannelB);
    yield put(updateBValue(value));
  }
}

function* handleActionChannelC() {
  const actionChannelC = yield actionChannel(WRITE_TO_ACTION_CHANNEL_C);

  while(true) {
    yield take(CONSUME_ACTION_CHANNEL_C);
    
    const { flushChannel } = yield race({
      consume: call(readActionChannelC, actionChannelC),
      flushChannel: take(FLUSH_ACTION_CHANNEL_C)
    });

    if(flushChannel) {
      yield flush(actionChannelC);
    }
  }
}

function* readActionChannelC(actionChannelC) {
  while(true) {
    const { payload: { value }} = yield take(actionChannelC);
    yield put(updateCValue(value));
  }
}

function* sortReceivedData(action) {
  const { subscription, value } = action.payload;

  // sort inbound socket data into an action channel that corresponds to its data stream type
  switch(subscription) {
    case "A":
      yield put(writeToActionChannelA(value));
      break;
    case "B":
      yield put(writeToActionChannelB(value));
      break;
    case "C":
      yield put(writeToActionChannelC(value));
      break;
    default:
      break;
  }
}


export default function* rootSaga() {
  yield takeEvery(OPEN_SOCKET_CONNECTION, initializeWebSocketConnection);
  yield takeEvery(RECEIVED_SOCKET_DATA, sortReceivedData);
}