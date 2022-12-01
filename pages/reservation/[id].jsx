/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/reservation.module.css";
import { useState } from "react";
import Image from "next/image";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer";
import axios from "../../utilities/axiosClient";
import Cookies from "js-cookie";
import swal from "sweetalert";

export const getServerSideProps = async (context) => {
  try {
    const params = context.query;
    const result = await axios.get(
      `${process.env.URL_BACKEND}/api/vehicle/${params.id}`
    );
    const vehicle = result.data.data[0];
    const image = vehicle
      ? vehicle.image1
        ? `https://res.cloudinary.com/dnhoxflfj/image/upload/v1667823115/${vehicle.image1}`
        : require("../../../public/Item-Empty.webp")
      : require("../../../public/Item-Empty.webp");
    console.log(result.data.data[0].image1);
    return {
      props: { vehicle, image, params },
    };
  } catch (error) {
    console.log(error);
  }
};

const Reservation = (props) => {
  const { vehicle, image, params } = props;
  const router = useRouter();
  const { query } = router;
  const { back, push } = useRouter();
  let [amount, setamount] = useState(parseInt(params.quantity));
  const [date, setdate] = useState("Select date");
  const [day, setday] = useState(1);
  const dataDate = [
    { id: 1, text: "1 Day" },
    { id: 2, text: "2 Day" },
    { id: 3, text: "3 Day" },
  ];

  const [rental, setrental] = useState({
    vehicleId: vehicle.vehicleId,
    totalPayment: vehicle.price,
    startDate: "",
    returnDate: "",
    quantity: 1,
    status: "Pending",
    userId: Cookies.get("userId"),
  });
  const [reservation, setReservation] = useState({});

  useEffect(() => {
    rental;
    console.log(params);
    // console.log(amount + "amount");
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
    // const reservation = axios
    //   .post(`http://localhost:8000/api/reservation/`, rental)
    //   .then((res) => {
    //     swal("Success", "Rental Success, please finish the payment", "success");
    //     // .then(() => {
    //     //   // push('/history')
    //     // })
    //     return res
    //   })
    //   .catch((err) => {
    //     swal("Error", "Rental failed, please check vehicle info", "error");
    //     // console.log(err.response);
    //   });
    // setReservation({ reservation });
    router.push(
      {
        pathname: `/payment/${vehicle.vehicleId}`,
        query: rental,
      },
      `/payment/${vehicle.vehicleId}`
    );
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
            <span className="fw-bold d-block ms-3">Reservation</span>
          </div>
          <div className="row">
            <div
              className={`${styles.imgwrapper} col-12 col-md-6 col-lg-6 position-relative`}
            >
              <img
                src={image}
                className={styles.vehicleImg}
                alt="imgVechile"
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div
              className={`${styles.rightItem} col-12 col-md-6 col-lg-6 pe-lg-5 ps-lg-5`}
            >
              <span className={`d-block ${styles.itemTitle}`}>
                {vehicle.name}
              </span>
              <span className={`d-block ${styles.itemLoc}`}>
                {vehicle.locationName}
              </span>
              <span className={`d-block ${styles.itemPay}`}>No Prepayment</span>
              <span className={`d-block ${styles.itemavaiable}`}>
                Available vehicle : {vehicle.stock}
              </span>
              <div className="d-flex justify-content-between w-100 mt-5 align-items-center">
                <div>
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
                  <button
                    className={`bg-orange ${styles.btncountPlus}`}
                    onClick={() => handlePlus()}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
              <span className={styles.resdate}>Reservation Date : </span>
              <div className="column">
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
            Pay now : {currency.format(rental.totalPayment)}
          </button>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Reservation;
