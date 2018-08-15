import React, { Component } from "react";
import styles from "./Navbar.css";
import Image from "../../assets/cat.gif";
// import Logo from "../../assets/logo.png";

class Navbar extends Component {
  render() {
    return (
      <div className={styles.Navbar}>
        {/* <div>
        <img className={styles.Logo} src={Logo} alt="prof" />
      </div> */}
        <div className={styles.ProfileContainer}>
          <img className={styles.Profile} src={Image} alt="prof" />
        </div>
        <div className={styles.Name} />
        {/* <ul>
          <li>Home</li>
          <li>Portfolio</li>
          <li>Contact</li>
        </ul> */}
      </div>
    );
  }
}

export default Navbar;
