/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import BtnPayment from "../../components/BtnPayment/index.jsx";
import styles from "../../styles/payment.module.css";
// import { useRouter } from "next/router";
import axios from "../../utilities/axiosClient";
// import axios from "utilities/axiosClient";
// import Cookies from "js-cookie";
import swal from "sweetalert";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/index.jsx";
import { useRouter } from "next/router.js";
import { useDispatch } from "react-redux";
import { getDataUserById } from "stores/action/user.js";
import Cookies from "js-cookie";
// import { useState, useEffect } from "react";

export const getServerSideProps = async (context) => {
  try {
    const params = context.query;
    const result = await axios.get(
      `${process.env.URL_BACKEND}/api/vehicle/${params.vehicleId}`
    );
    const vehicle = result.data.data[0];
    const image = vehicle
      ? vehicle.image1
        ? `https://res.cloudinary.com/dnhoxflfj/image/upload/v1667823115/${vehicle.image1}`
        : require("../../../public/Item-Empty.webp")
      : require("../../../public/Item-Empty.webp");
    console.log(result.data.data[0].image1);
    return {
      props: { vehicle, image },
    };
  } catch (error) {
    console.log(error);
  }
};

const Payment = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  const { vehicle, image } = props;
  const admin = false;
  const rentalStatus = "";
  const days = query.totalPayment / vehicle.price / query.quantity;
  const [user, setUser] = useState("");
  const userId = Cookies.get("userId");

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = () => {
    dispatch(getDataUserById(userId)).then((response) => {
      setUser(response.value.data.data[0]);
    });
  };

  const handlePayment = async () => {
    const result = await axios.post(
      `http://localhost:8000/api/reservation/`,
      query
    );
    // .then((res) => (window.location.href = res.value.data.data.redirectUrl))
    // .catch((err) => {
    //   swal("Error", "Rental failed, please check vehicle info", "error");
    // });
    // console.log(result.data.data.redirectUrl);
    window.location.href = result.data.data.redirectUrl;
  };

  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

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
            <span className="fw-bold d-block ms-3">Payment</span>
          </div>
          <div className="mainContainer">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <img className="img-history" src={image} alt="imgVechile" />
              </div>
              <div className={`${styles.rightItem} col-12 col-md-6 col-lg-6`}>
                <span className={`d-block ${styles.itemTitle}`}>
                  {vehicle.name}
                </span>
                <span className={`d-block ${styles.itemLoc}`}>
                  {vehicle.locationName}
                </span>
                <span className={`d-block ${styles.itemPay}`}>Available</span>
                <span className={`d-block ${styles.bookingCode}`}>
                  #FG1209878YZS
                </span>
                <button className={`${styles.btnCopy} bg-orange`}>
                  Copy Booking Code
                </button>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12 col-md-6 col-lg-4">
                <div className={styles.box}>
                  <span className={styles.boxtitle}>
                    Quantity : {query.quantity} vehicle
                  </span>
                </div>
                <div className={styles.box}>
                  <span className={`${styles.boxtitle} mb-3 d-block`}>
                    Order details :{" "}
                  </span>
                  {/* {vehicle_count.map((index) => ( */}
                  <span
                    //   key={index}
                    className="d-block"
                  >
                    1 vehicle : {currency.format(vehicle.price)} x {days} day
                  </span>
                  {/* ))} */}
                  <span className={`mt-3 d-block ${styles.boxtitle}`}>
                    Total : {currency.format(query.totalPayment)}
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className={styles.boxRes}>
                  <span className={styles.boxtitle}>Reservation Date :</span>
                  <span className="d-inline-block ms-0 ms-md-0 ms-lg-5">
                    {query.startDate} to {query.returnDate}
                  </span>
                </div>
                <div className={styles.boxIden}>
                  <span className={styles.boxtitle}>Identity : </span>
                  <span className="d-block">{user.name}</span>
                  <span className="d-block">{user.email}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-8 col-lg-7 position-relative">
                <span className={styles.paytitle}>Payment Code : </span>
                <span
                  className={`${styles.box} ${styles.boxPay} mt-3 mb-3 d-inline-block`}
                >
                  <span className={`d-block ${styles.bookingCodeCpy}`}>
                    #FG1209878YZS
                  </span>
                  <button
                    className={`${styles.btncpy} bg-black`}
                    onClick={() =>
                      navigator.clipboard.writeText(
                        "Copy this text to clipboard"
                      )
                    }
                  >
                    Copy
                  </button>
                </span>
              </div>
              <div className={`${styles.boxPayRight} col-12 col-md-4 col-lg-4`}>
                <select
                  className={`${styles.box} ${styles.boxPay} mb-3 d-inline-block`}
                >
                  <option value="Cash">Select payment method</option>
                  <option value="Cash">Cash</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </div>
            </div>
          </div>
          {admin === true ? (
            rentalStatus === "pending" ? (
              <>
                <BtnPayment
                  onClick={handleApprovePayment}
                  text="Approve payment"
                  className="w-100 mt-lg-3 bg-black"
                />
                <BtnPayment
                  onClick={handleCancelRental}
                  text="Cancel this rental"
                  className="w-100 mt-lg-3 bg-orange"
                />
              </>
            ) : rentalStatus === "approved" ? (
              <>
                <BtnPayment
                  onClick={handleReturnedVehicle}
                  text="Return confirmation"
                  className="w-100 mt-lg-3 bg-black"
                />
              </>
            ) : rentalStatus === "canceled" ? (
              <>
                <BtnPayment
                  onClick={() =>
                    swal(
                      "Canceled",
                      "This transaction has been canceled",
                      "info"
                    )
                  }
                  text="Canceled"
                  className="w-100 mt-lg-3 bg-danger"
                />
              </>
            ) : rentalStatus === "returned" ? (
              <>
                <BtnPayment
                  onClick={() =>
                    swal(
                      "Returned vehicle",
                      "This transaction has been completed",
                      "info"
                    )
                  }
                  text="Vehicle returned"
                  className="w-100 mt-lg-3 bg-black"
                />
              </>
            ) : (
              <>
                <BtnPayment
                  onClick={() =>
                    swal(
                      "Not Paid Yet",
                      "This transaction not paid yet, waiting for user",
                      "info"
                    )
                  }
                  text="Not Paid Yet"
                  className="w-100 mt-lg-3 bg-danger"
                />
              </>
            )
          ) : rentalStatus === "pending" ? (
            <>
              <BtnPayment
                onClick={() =>
                  swal(
                    "Already Paid",
                    "This transaction has been paid, waiting for admin to approve",
                    "info"
                  )
                }
                text="Waiting for approve"
                className="w-100 mt-lg-3 bg-black"
              />
            </>
          ) : rentalStatus === "approved" ? (
            <>
              <BtnPayment
                onClick={() =>
                  swal("Approved", "This transaction has been approved", "info")
                }
                text="Waiting for approve"
                className="w-100 mt-lg-3 bg-black"
              />
            </>
          ) : rentalStatus === "canceled" ? (
            <>
              <BtnPayment
                onClick={() =>
                  swal("Canceled", "This transaction has been canceled", "info")
                }
                text="Canceled"
                className="w-100 mt-lg-3 bg-danger"
              />
            </>
          ) : (
            <>
              <BtnPayment
                onClick={handlePayment}
                text="Finish Payment"
                className="w-100 mt-lg-3 bg-black mb-3"
              />
              {/* <BtnPayment
                // onClick={handleCancelRental}
                text="Cancel rental"
                className="w-100 mt-lg-3 bg-orange"
              /> */}
            </>
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Payment;
