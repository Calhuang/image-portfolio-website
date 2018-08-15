import React from "react";
import styles from "./Images.css";
import HeartIcon from "../../assets/like2.png";
import LazyLoad from "react-lazyload";

const Images = props => {
  const imgurl = props.imgLink;
  var img = new Image();
  img.src = props.imgLink;
  return (
    <LazyLoad
      height={img.height}
      once
      scroll
      placeholder={
        <img
          src={"https://dummyimage.com/300x300/c7c1c7/fff.jpg&text=Loading"}
          alt="placeholder"
        />
      }
    >
      <div className={styles.ImageContainer}>
        <div
          className={styles.ImageInfo}
          onClick={() => props.onLike(props.likes + 1, props.id)}
        >
          <img src={HeartIcon} alt="heart_icon" />
          <p>{props.likes}</p>
        </div>
        <img src={imgurl} alt="cat" onClick={() => props.onClick(imgurl)} />
      </div>
    </LazyLoad>
  );
};

export default Images;
