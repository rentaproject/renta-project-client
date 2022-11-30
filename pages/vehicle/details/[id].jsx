import React from "react";
import Layout from "layout/main.jsx";
import styles from "styles/Details.module.css";
import Image from "next/image";
import { ChevronLeft, Plus, Dash, HeartFill } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import axiosApiIntances from "utilities/axiosClient";
import { useEffect } from "react";
import { useState } from "react";

export default function Vehicle() {
  const [vehicleData, setVehicleData] = useState();
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getVehicleById();
  }, []);

  const getVehicleById = async () => {
    try {
      const result = await axiosApiIntances.get(`/api/vehicle/${id}`);
      setVehicleData(result.data.data[0]);
    } catch (error) {}
  };

  const increaseHandler = () => {
    if (quantity > 4) {
      return;
    }
    setQuantity(quantity + 1);
  };
  const decreaseHandler = () => {
    if (quantity === 0) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <Layout title="Vehicle">
      <div className={styles.title}>
        <ChevronLeft />
        <div>Detail</div>
      </div>
      <div className={`row m-0 ${styles.detailContainer}`}>
        <div className={`col-sm-12 col-md-12 col-lg-6 ${styles.leftContainer}`}>
          <div className={styles.mainImageContainer}>
            <Image
              src={
                vehicleData
                  ? vehicleData.image1
                    ? `${process.env.URL_CLOUDINARY}${vehicleData.image1}`
                    : require("../../../public/Item-Empty.webp")
                  : require("../../../public/Item-Empty.webp")
              }
              alt="item"
              className={styles.mainImage}
              width={250}
              height={150}
              layout="responsive"
            />
          </div>
          <div className={styles.sideImageWrapper}>
            <div className={styles.sideImageContainer}>
              <Image
                src={
                  vehicleData
                    ? vehicleData.image2
                      ? `${process.env.URL_CLOUDINARY}${vehicleData.image2}`
                      : require("../../../public/Item-Empty.webp")
                    : require("../../../public/Item-Empty.webp")
                }
                alt="item"
                className={styles.sideImage}
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
            <div className={styles.sideImageContainer}>
              <Image
                src={
                  vehicleData
                    ? vehicleData.image3
                      ? `${process.env.URL_CLOUDINARY}${vehicleData.image3}`
                      : require("../../../public/Item-Empty.webp")
                    : require("../../../public/Item-Empty.webp")
                }
                alt="item"
                className={styles.sideImage}
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
          </div>
        </div>
        <div
          className={`col-sm-12 col-md-12 col-lg-6 ${styles.rightContainer}`}
        >
          <div className={styles.name}>
            {vehicleData ? vehicleData.name : ""}
          </div>
          <div className={styles.location}>
            {vehicleData ? vehicleData.locationName : ""}
          </div>
          <div className={styles.stock}>
            {vehicleData
              ? vehicleData.stock > 0
                ? "Available"
                : "Out of Stock"
              : ""}
          </div>
          <div className={styles.repayment}>No prepayment</div>
          <div className={styles.description}>
            <div>
              {vehicleData
                ? vehicleData.description
                  ? `Description : ${vehicleData.description}`
                  : "Capacity : 1 person"
                : ""}
            </div>
            <div>
              {vehicleData
                ? vehicleData.typeName
                  ? `Type : ${vehicleData.typeName}`
                  : "Type : unknown"
                : ""}
            </div>
            <div>Reservation before 2 PM</div>
          </div>
          <div className={styles.price}>
            {vehicleData
              ? vehicleData.price
                ? // ? `Rp. ${vehicleData.price}`
                  currency.format(vehicleData.price)
                : "Out of Stock"
              : ""}
          </div>
          <div className={styles.quantityContainer}>
            <div className={styles.plusButton} onClick={increaseHandler}>
              <Plus />
            </div>
            <div className={styles.quantity}>{quantity}</div>
            <div className={styles.minusButton} onClick={decreaseHandler}>
              <Dash />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`row justify-content-between m-0 ${styles.buttonContainer}`}
      >
        <div className={`col-sm-12 col-md-4 col-lg-4  ${styles.chatAdmin}`}>
          Chat Admin
        </div>
        <div
          className={`col-sm-12 col-md-4 col-lg-4  ${styles.reservation}`}
          onClick={() => {
            router.push(
              {
                pathname: `/reservation/${id}`,
                query: {
                  name: vehicleData.name,
                  location: vehicleData.locationName,
                  quantity: quantity,
                  price: vehicleData.price,
                  image: vehicleData.image1,
                },
              },
              `/reservation/${id}`
            );
          }}
        >
          Reservation
        </div>
        <div className={`col-sm-12 col-md-2 col-lg-3  ${styles.like}`}>
          <HeartFill /> Like
        </div>
      </div>
    </Layout>
  );
}
