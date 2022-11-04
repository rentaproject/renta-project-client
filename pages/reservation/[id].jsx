/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/reservation.module.css";
import { useState } from "react";
import Image from "next/image";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer";
// import ButtonCount from "../../../components/base/ButtonCount";
// import InputOpt from "../../../components/base/InputOpt";
// import ButtonPay from "../../../components/base/ButtonPay";
// import axios from "axios";
// import swal from "sweetalert";

export const getServerSideProps = async (context) => {
  try {
    const vehicleId = context.query.id;
    const vehicle = {
      vehicleId,
      name: "Fixie",
      location: "Jakarta",
      price: 10000,
      stock: 5,
      rented: 5,
      image:
        "https://res.cloudinary.com/di6rwbzkv/image/upload/v1667466293/User/robert-bye-tG36rvCeqng-unsplash_3_qbhxiv.png",
    };
    const image = `https://res.cloudinary.com/di6rwbzkv/image/upload/v1667466293/User/robert-bye-tG36rvCeqng-unsplash_3_qbhxiv.png`;
    return {
      props: { vehicle, image },
    };
  } catch (error) {
    console.log(error);
  }
};

const Reservation = (props) => {
  const { back, push } = useRouter();
  let [amount, setamount] = useState(5);
  const [date, setdate] = useState("Select date");
  const [day, setday] = useState(1);
  const dataDate = [
    { id: 1, text: "1 Day" },
    { id: 2, text: "2 Day" },
    { id: 3, text: "3 Day" },
  ];

  const { vehicle, image } = props;
  const [rental, setrental] = useState({
    vehicleId: vehicle.vehicleId,
    totalPayment: vehicle.price,
    startDate: "",
    returnDate: "",
    quantity: 5,
  });

  useEffect(() => {
    rental;
    console.log(rental);
    console.log(amount + "amount");
  }, [rental]);

  const handlePlus = () => {
    if (amount >= vehicle.stock) {
      setamount(vehicle.stock);
    } else {
      setamount((amount += 1));
    }
    setrental({
      ...rental,
      totalPayment: vehicle.price * amount * day,
      quantity: amount,
    });
    console.log(rental.quantity);
  };

  const handleMinus = () => {
    if (amount <= 1) {
      setamount(1);
    } else {
      setamount((amount -= 1));
    }
    setrental({
      ...rental,
      totalPayment: vehicle.price * amount * day,
      quantity: amount,
    });
  };

  const handleDay = (e) => {
    setday(e.target.value);
    const sliceDateOnly =
      parseInt(date.slice(-2)) + parseInt(e.target.value, 36);
    const dateReturn = `${date.substring(0, 8)}${sliceDateOnly}`;
    setrental({
      ...rental,
      totalPayment: vehicle.price * amount * e.target.value,
      returnDate: dateReturn,
    });
  };

  const handleStartDate = (e) => {
    setrental({ ...rental, startDate: e.target.value });
    const startdate = e.target.value;
    setdate(startdate);
  };

  const handlePay = () => {
    console.log(rental);
  };

  return (
    <Fragment>
      <Header />
      <div className="">
        <div className="container">
          <div className="d-flex align-items-center mt-3 mb-lg-5 mb-md-4 mb-4">
            <Image
              src={require("../../assets/icons/backButton.png")}
              alt="back Icon"
              width="20px"
              height="30px"
              style={{ cursor: "pointer" }}
              onClick={() => back()}
            />
            <span className="fw-bold d-block ms-3">Reservation</span>
          </div>
          <div className="row">
            <div
              className={`${styles.imgwrapper} col-12 col-md-6 col-lg-6 position-relative`}
            >
              <img src={image} className={styles.vehicleImg} alt="imgVechile" />
            </div>
            <div
              className={`${styles.rightItem} col-12 col-md-6 col-lg-6 pe-lg-5 ps-lg-5`}
            >
              <span className={`d-block ${styles.itemTitle}`}>
                {vehicle.name}
              </span>
              <span className={`d-block ${styles.itemLoc}`}>
                {vehicle.location}
              </span>
              <span className={`d-block ${styles.itemPay}`}>No Prepayment</span>
              <span className={`d-block ${styles.itemavaiable}`}>
                Available vehicle : {vehicle.stock}
              </span>
              <div className="d-flex justify-content-between w-100 mt-5 align-items-center">
                <div>
                  {/* <ButtonCount text="-" onClick={() => handleMinus()} /> */}
                  <button
                    className={styles.btncount}
                    onClick={() => handleMinus()}
                  >
                    {" "}
                    -
                  </button>
                </div>
                <span className={styles.count}>{amount}</span>
                <div>
                  {/* <ButtonCount
                    text="+"
                    bg="bg-orange"
                    onClick={() => handlePlus()}
                  /> */}
                  <button
                    className={`bg-orange ${styles.btncount}`}
                    onClick={() => handlePlus()}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
              <span className={styles.resdate}>Reservation Date : </span>
              <div className="row">
                <div className="col-12 col-md-12 col-lg-6">
                  <input
                    type="date"
                    name=""
                    id="date"
                    className={`${styles.inputDate} pb-2 pe-2`}
                    onChange={(e) => handleStartDate(e)}
                  />
                </div>
                <div className="col-12 col-md-12 col-lg-6 pt-3 pt-md-3 pt-lg-0">
                  {/* <InputOpt
                    name="day"
                    placeholder="Day"
                    data={[
                      { id: 1, text: "1 Day" },
                      { id: 2, text: "2 Day" },
                      { id: 3, text: "3 Day" },
                    ]}
                    onChange={(e) => handleDay(e)}
                  /> */}
                  <select
                    name="day"
                    id=""
                    className={styles.opt}
                    onChange={(e) => handleDay(e)}
                  >
                    <option value="1" id="default-opt-value">
                      Day
                    </option>
                    {dataDate &&
                      dataDate.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.text}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handlePay}
            className={`${styles.btn} bg-orange w-100 mt-5 mb-5`}
          >
            Pay now : Rp. {rental.totalPayment}
          </button>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Reservation;
