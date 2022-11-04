import { Fragment } from "react";
import styles from "../../styles/BtnPayment.module.css"

const BtnPayment = (props) => {
    return (
        <Fragment>
            <button onClick={props.onClick} className={`${props.className} ${styles.btn}`}>{props.text}</button>
        </Fragment>
    );
}

export default BtnPayment;