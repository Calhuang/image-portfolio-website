import React, { Component } from "react";
import styles from "./Layout.css";
import Images from "../Images/Images";
import Modal from "react-modal";
import firebase from "../../firebase";
import DownArrow from "../../assets/downarrow.svg";
import ReactLogo from "../../assets/reacttext.png";
import FirebaseLogo from "../../assets/firebase.svg";
import LazyLoad from "react-lazyload";

Modal.setAppElement("#root");

class Layout extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      imageURL: "https://dummyimage.com/350x150/c7c1c7/fff.jpg&text=Loading",
      images: ["null"]
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.likeHandler = this.likeHandler.bind(this);
  }
  openModal(props) {
    this.setState({
      modalIsOpen: true,
      imageURL: props
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  likeHandler(likes, key) {
    const db = firebase.database().ref("items/" + key);

    db.update({ likes: likes });
    //get id

    //make new state
    if (this.state !== undefined) {
      const stateCopy = {
        ...this.state
      };

      //modfiy state

      stateCopy.images[key].likes = likes;
      //set state
      this.setState({ images: stateCopy.images });
    }
  }

  componentDidMount() {
    const db = firebase.database().ref("items/");
    db.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          url: items[item].url,
          likes: items[item].likes,
          id: items[item].key
        });
      }
      this.setState({
        images: newState
      });
    });
  }

  render() {
    // const db = firebase.database();
    // const imageDB = [
    //   "https://source.unsplash.com/collection/369",
    //   "https://source.unsplash.com/collection/1131562",
    //   "https://source.unsplash.com/collection/221",
    //   "https://source.unsplash.com/collection/384",
    //   "https://source.unsplash.com/collection/349",
    //   "https://source.unsplash.com/collection/349",
    //   "https://source.unsplash.com/collection/384",
    //   "https://source.unsplash.com/collection/369",
    //   "https://source.unsplash.com/collection/1131562",
    //   "https://source.unsplash.com/collection/221"
    // ];
    // for (const index in imageDB) {
    //   db.ref("items/" + index).set({
    //     key: index,
    //     url: imageDB[index],
    //     likes: 0
    //   });
    // }
    let ImageObjects = [];
    for (let index in this.state.images) {
      ImageObjects.push(
        <Images
          onClick={this.openModal}
          onLike={this.likeHandler}
          imgLink={this.state.images[index].url}
          likes={this.state.images[index].likes}
          key={this.state.images[index].id + 1}
          id={this.state.images[index].id}
        />
      );
    }

    return (
      <div className={styles.Layout}>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Image Modal"
          overlayClassName={styles.ModalBackground}
          className={styles.Modal}
        >
          <div className={styles.ModalContainer}>
            <img src={this.state.imageURL} alt="description" />
          </div>
        </Modal>
        <div>
          <div className={styles.TopContainer}>
            <div className={styles.TopText}>About me</div>
            <p>
              Hi! My name is Calvin and I am a web designer. I build websites
              using ReactJS. In fact, this website is built using that same
              technology! I hope you enjoy the pictures I have below :D{" "}
            </p>
            <img
              src={DownArrow}
              alt="down arrow"
              className={styles.DownArrow}
            />
            <ul className={styles.Bubbles}>
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>
          </div>
        </div>
        <div className={styles.BottomLayout}>
          <div className={styles.BottomText}>Portfolio</div>

          <div className={styles.GridRow}>
            <div className={styles.GridColumn}>
              {/* <Images
              onClick={this.openModal}
              imgLink="https://source.unsplash.com/collection/369"
            />

            <Images
              onClick={this.openModal}
              imgLink="https://source.unsplash.com/collection/1131562"
            />
            <Images
              onClick={this.openModal}
              imgLink="https://source.unsplash.com/collection/221"
            />
            <Images
              onClick={this.openModal}
              imgLink="https://source.unsplash.com/collection/384"
            />
            <Images
              onClick={this.openModal}
              imgLink="https://source.unsplash.com/collection/349"
            /> */}
              {ImageObjects.slice(0, ImageObjects.length / 2)}
            </div>
            <div className={styles.GridColumn}>
              {/* <Images
              onClick={this.openModal}
              imgLink="https://source.unsplash.com/collection/349"
            />
            <Images
              onClick={this.openModal}
              imgLink="https://source.unsplash.com/collection/384"
            />
            <Images
              onClick={this.openModal}
              imgLink="https://source.unsplash.com/collection/369"
            />
            <Images
              onClick={this.openModal}
              imgLink="https://source.unsplash.com/collection/1131562"
            />
            <Images
              onClick={this.openModal}
              imgLink="https://source.unsplash.com/collection/221"
            /> */}
              {ImageObjects.slice(ImageObjects.length / 2, ImageObjects.length)}
            </div>
          </div>
        </div>
        <div className={styles.Footer}>
          <div className={styles.Section1}>
            <p>Designed and Developed by Calvin Huang © 2018</p>
          </div>
          <div className={styles.Section2}>
            <LazyLoad height={300} once>
              <div className={styles.Logos}>
                <img
                  src={ReactLogo}
                  alt="react logo"
                  width="30%"
                  height="30%"
                />
                <img
                  src={FirebaseLogo}
                  alt="firebase logo"
                  width="10%"
                  height="10%"
                />
              </div>
            </LazyLoad>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
