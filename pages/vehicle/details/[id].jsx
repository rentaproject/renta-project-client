import React from "react";
import Layout from "layout/main.jsx";
import styles from "styles/Details.module.css";
import Image from "next/image";
import { ChevronLeft, Plus, Dash, HeartFill } from "react-bootstrap-icons";

export default function LandingPage() {
  return (
    <Layout>
      <div className={styles.title}>
        <ChevronLeft />
        <div>Detail</div>
      </div>
      <div className={`row ${styles.detailContainer}`}>
        <div className={`col-sm-12 col-md-12 col-lg-6 ${styles.leftContainer}`}>
          <div className={styles.mainImageContainer}>
            <Image
              src={require("../../../public/Item-Empty.webp")}
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
                src={require("../../../public/Item-Empty.webp")}
                alt="item"
                className={styles.sideImage}
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
            <div className={styles.sideImageContainer}>
              <Image
                src={require("../../../public/Item-Empty.webp")}
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
          <div className={styles.name}>Title</div>
          <div className={styles.location}>Yogyakarta</div>
          <div className={styles.stock}>Available</div>
          <div className={styles.repayment}>No prepayment</div>
          <div className={styles.description}>
            <div>Capacity : 1 person</div>
            <div>Type : Bike</div>
            <div>Reservation before 2 PM</div>
          </div>
          <div className={styles.price}>Rp. 78.000/day</div>
          <div className={styles.quantityContainer}>
            <div className={styles.plusButton}>
              <Plus />
            </div>
            <div className={styles.quantity}>3</div>
            <div className={styles.minusButton}>
              <Dash />
            </div>
          </div>
        </div>
      </div>
      <div className={`row justify-content-between ${styles.buttonContainer}`}>
        <div className={`col-sm-12 col-md-4 col-lg-4  ${styles.chatAdmin}`}>
          Chat Admin
        </div>
        <div className={`col-sm-12 col-md-4 col-lg-4  ${styles.reservation}`}>
          Reservation
        </div>
        <div className={`col-sm-12 col-md-2 col-lg-3  ${styles.like}`}>
          <HeartFill /> Like
        </div>
      </div>
    </Layout>
  );
}
