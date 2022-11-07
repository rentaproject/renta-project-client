import { Fragment } from "react";
import styles from "../../styles/inputVehicle2.module.css";

const InputVehicle2 = (props) => {
  return (
    <Fragment>
      <span className={styles.inputTitle}>{props.title}</span>
      <input
        defaultValue={props.defaultValue}
        onChange={(e) => props?.onChange(e)}
        name={props.name}
        type="text"
        placeholder={props.placeholder}
        className={`${props.className} ${styles.input}`}
      />
    </Fragment>
  );
};

export default InputVehicle2;
