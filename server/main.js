// web socket route
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 40510 })


const subscriptions = {
  A: null,
  B: null,
  C: null
};

const startIntervalFunction = (subscription, ws) => {
  if(subscriptions[subscription] === null) {
    console.log(`Started subscribing to ${subscription}`);

    subscriptions[subscription] = setInterval(
      () => ws.send(JSON.stringify({ subscription, value: Math.random() })),
      1000
    );
  }
}

const stopIntervalFunction = (subscription) => {
  if(subscriptions[subscription] !== null) {
    console.log(`Unsubscribed from ${subscription}`);
    clearInterval(subscriptions[subscription]);
    subscriptions[subscription] = null;
  }
}

wss.on("connection", ws => {

  console.log("CONNECTED!");

  ws.on("message", message => {
    const payload = JSON.parse(message);
    if(payload.instruction === "subscribe") {

      switch(payload.subscription) {
        case "A":
          startIntervalFunction("A", ws);
          break;
        case "B":
          startIntervalFunction("B", ws);
          break;
        case "C":
          startIntervalFunction("C", ws);
          break;
      }

    }
    else if(payload.instruction === "unsubscribe") {

      switch(payload.subscription) {
        case "A":
          stopIntervalFunction("A");
          break;
        case "B":
          stopIntervalFunction("B");
          break;
        case "C":
          stopIntervalFunction("C");
          break;
      }

    }
  });

});
