/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Image from "next/image";
import BtnPayment from "../../components/BtnPayment/index.jsx";
import styles from "../../styles/payment.module.css";
// import { useRouter } from "next/router";
// import axios from "axios";
import swal from "sweetalert";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/index.jsx";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

const Approve = () => {
  const admin = false;
  const rentalStatus = "";

  return (
    <Fragment>
      <Header />
      <div className="container m-auto ">
        <div className="container m-auto  p-5">
          <div className="d-flex align-items-center mt-3 mb-lg-5 mb-md-4 mb-4">
            <Image
              src={require("../../assets/icons/backButton.png")}
              alt="back Icon"
              width="20px"
              height="30px"
              style={{ cursor: "pointer" }}
              onClick={() => back()}
            />
            <span className="fw-bold d-block ms-3">Approve Payment</span>
          </div>
          <div className="mainContainer">
            <div className="row justifay-content-center gap-3 mb-3 w-100">
              <div className="col-12 col-md-6 col-lg-4">
                <img
                  className="img-history"
                  src={`https://res.cloudinary.com/di6rwbzkv/image/upload/v1667466293/User/robert-bye-tG36rvCeqng-unsplash_3_qbhxiv.png`}
                  alt="imgVechile"
                />
              </div>
              <div className={`${styles.rightItem} col-12 col-md-6 col-lg-6`}>
                <span className={`d-block ${styles.itemTitle}`}>Fixie</span>
                <span className={`d-block ${styles.itemLoc}`}>Jakarta</span>
                <span className={`d-block ${styles.itemPay}`}>Available</span>
                <span className={`d-block ${styles.bookingCode}`}>
                  #FG1209878YZS
                </span>
                <button className={`${styles.btnCopy} bg-orange`}>
                  Copy Booking Code
                </button>
              </div>
            </div>
            <div className="row mt-2 w-100">
              <div className="col-12 col-md-6 col-lg-4 ">
                <div className={styles.box}>
                  <span className={styles.boxtitle}>Quantity : 1 bikes</span>
                </div>
                <div className={styles.box}>
                  <span className={`${styles.boxtitle} mb-3 d-block `}>
                    Order details :{" "}
                  </span>
                  {/* {vehicle_count.map((index) => ( */}
                  <span
                    //   key={index}
                    className="d-block"
                  >
                    1 Bike : Rp. 10000 x 3 day
                  </span>
                  {/* ))} */}
                  <span className={`mt-2 d-block ${styles.boxtitle}`}>
                    Total : Rp. 30000
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8 ">
                <div className={`${styles.boxRes} `}>
                  <span className={styles.boxtitle}>Reservation Date :</span>
                  <span className="d-inline-block ms-0 ms-md-0 ms-lg-5">
                    01-01-2022 to 04-2-2022
                  </span>
                </div>
                <div className={styles.boxIden}>
                  <span className={styles.boxtitle}>Identity : </span>
                  <span className="d-block">User 0818181818</span>
                  <span className="d-block mb-4">user@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-12 col-md-8 col-lg-8 position-relative d-lg-flex d-md-block justify-content-center gap-3">
                <div className={`${styles.paytitle} mt-3  pt-3 w-50`}>
                  Payment Code :{" "}
                </div>
                <div
                  className={`${styles.box} ${styles.boxPay} mt-3 mb-3 w-100  `}
                >
                  <div className={`d-flex gap-2${styles.bookingCodeCpy}`}>
                    <span className={`d-block ${styles.bookingCodeCpy}  `}>
                      #FG1209878YZS
                    </span>
                    <button className={`${styles.btncpy} bg-black me-1  `}>
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              <div className={`${styles.boxPayRight} col-12 col-md-4 col-lg-4`}>
                <span
                  className={`${styles.box} ${styles.boxPay} mb-3 d-inline-block w-100 `}
                >
                  Select payment method
                </span>
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
                // onClick={handleCancelRental}
                text="Approve Payment"
                className="w-100 mt-lg-3 bg-orange"
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Approve;
