import { Fragment } from "react";
import styles from "../../styles/inputVehicle1.module.css";

const InputVehicle = (props) => {
  return (
    <Fragment>
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

export default InputVehicle;
