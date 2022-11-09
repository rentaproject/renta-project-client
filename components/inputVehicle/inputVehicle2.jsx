import { Fragment } from "react";
import styles from "../../styles/inputVehicle2.module.css";

const InputVehicle2 = (props) => {
  return (
    <Fragment>
      <span className={styles.inputTitle}>{props.title}</span>
      <input
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        name={props.name}
        type="text"
        placeholder={props.placeholder}
        className={`${props.className} ${styles.input}`}
      />
    </Fragment>
  );
};

export default InputVehicle2;
