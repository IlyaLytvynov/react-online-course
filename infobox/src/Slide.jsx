import React from "react";
import styles from "./Slide.module.scss";

export class Slide extends React.Component {
  constructor() {
    super();
    console.log("CONSTRUCTOR");
  }

  componentDidMount() {
    console.log("DID MOUNT!");
  }

  render() {
    console.log("RENDER", this.props);
    const { isActive, img, title, description, onButtonClick } = this.props;
    return (
      <div className={`${styles.slide} ${isActive ? styles.active : ""}`}>
        <img className={styles.img} src={img} alt="" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => onButtonClick("Hello" + title)}>Click Me</button>
      </div>
    );
  }
}

// export const Slide = props => {
//   console.log(props);
//   return (
//     <div className={`${styles.slide} ${props.isActive ? styles.active : ""}`}>
//       <img className={styles.img} src={props.slide.img} alt="" />
//       <h2>{props.slide.title}</h2>
//       <p>{props.slide.description}</p>
//     </div>
//   );
// };
