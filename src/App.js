import React, { Component } from "react";
import styles from "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";

class App extends Component {
  state = {
    hide: false
  };
  hideToggler = () => {
    if (this.state.hide) {
      this.setState({ hide: false });
      console.log("NPT HIDING");
    } else {
      this.setState({ hide: true });
      console.log("HIDING");
    }
  };
  render() {
    return (
      <div className={styles.App}>
        {/* <Card style={{ width: "200px" }}>Hello</Card> */}

        <Navbar hide={this.state.hide} />
        <Layout hide={this.state.hide} />
      </div>
    );
  }
}

export default App;
