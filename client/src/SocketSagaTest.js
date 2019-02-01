import React from "react";
import { connect } from "react-redux";

// Actions
import { 
  openSocketConnection, 
  closeSocketConnection,
  subscribe,
  unsubscribe,
  consumeActionChannelA,
  consumeActionChannelB,
  consumeActionChannelC
} from "./store/actions";

// Selectors
import { getA, getB, getC } from "./store/reducer";


class SocketSagaTest extends React.Component {

  state = { 
    subscribedA: false,
    subscribedB: false,
    subscribedC: false 
  };

  componentDidMount() {
    const { openConnection } = this.props;
    openConnection();
  }

  componentWillUnmount() {
    const { closeConnection } = this.props;
    closeConnection();
  }

  onSubscribeClick = (subscription) => () => {
    const { subscribe, unsubscribe } = this.props;
    const { subscribedA, subscribedB, subscribedC } = this.state;

    switch(subscription) {
      case "A":
        subscribedA ? unsubscribe("A") : subscribe("A");
        this.setState({ subscribedA: !subscribedA });
        break;
      case "B":
        subscribedB ? unsubscribe("B") : subscribe("B");
        this.setState({ subscribedB: !subscribedB });
        break;
      case "C":
        subscribedC ? unsubscribe("C") : subscribe("C");
        this.setState({ subscribedC: !subscribedC });
        break;
      default:
        break;
    }
  }

  onConsumeClick = (subscription) => () => {
    const { consumeA, consumeB, consumeC } = this.props;

    switch(subscription) {
      case "A":
        consumeA();
        break;
      case "B":
        consumeB();
        break;
      case "C":
        consumeC();
        break;
      default:
        break;
    }
  }

  render() {
    const { subscribedA, subscribedB, subscribedC } = this.state;
    const { a, b, c } = this.props;

    return(
      <div>
        <h1>Values</h1>
        <h3>{`A: ${a}`}</h3>
        <br />
        <h3>{`B: ${b}`}</h3>
        <br />
        <h3>{`C: ${c}`}</h3>
        <br />
        <br />
        <br />
        <button onClick={this.onSubscribeClick("A")}>{subscribedA ? "UNSUBSCRIBE A" : "SUBSCRIBE A"}</button>

        { subscribedA && 
          <button onClick={this.onConsumeClick("A")}>Consume Action Channel A</button>
        }
        
        <br />
        <br />
        <br />
        <button onClick={this.onSubscribeClick("B")}>{subscribedB ? "UNSUBSCRIBE B" : "SUBSCRIBE B"}</button>

        { subscribedB && 
          <button onClick={this.onConsumeClick("B")}>Consume Action Channel B</button>
        }

        <br />
        <br />
        <br />
        <button onClick={this.onSubscribeClick("C")}>{subscribedC ? "UNSUBSCRIBE C" : "SUBSCRIBE C"}</button>

        { subscribedC && 
          <button onClick={this.onConsumeClick("C")}>Consume Action Channel C</button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  a: getA(state),
  b: getB(state),
  c: getC(state)
});

const mapDispatchToProps = (dispatch) => ({
  openConnection: () => dispatch(openSocketConnection()),
  closeConnection: () => dispatch(closeSocketConnection()),
  subscribe: (subscription) => dispatch(subscribe(subscription)),
  unsubscribe: (subscription) => dispatch(unsubscribe(subscription)),
  consumeA: () => dispatch(consumeActionChannelA()),
  consumeB: () => dispatch(consumeActionChannelB()),
  consumeC: () => dispatch(consumeActionChannelC())
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketSagaTest);