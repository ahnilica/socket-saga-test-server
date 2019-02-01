import React from "react";
import { connect } from "react-redux";

// Actions
import { 
  openSocketConnection, 
  closeSocketConnection,
  subscribe,
  unsubscribe
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

  onClick = (subscription) => () => {
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
        <button onClick={this.onClick("A")}>{subscribedA ? "UNSUBSCRIBE A" : "SUBSCRIBE A"}</button>
        <br />
        <br />
        <br />
        <button onClick={this.onClick("B")}>{subscribedB ? "UNSUBSCRIBE B" : "SUBSCRIBE B"}</button>
        <br />
        <br />
        <br />
        <button onClick={this.onClick("C")}>{subscribedC ? "UNSUBSCRIBE C" : "SUBSCRIBE C"}</button>
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
  unsubscribe: (subscription) => dispatch(unsubscribe(subscription))
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketSagaTest);