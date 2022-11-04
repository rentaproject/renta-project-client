import React from "react";
import Layout from "layout/main.jsx";
import styles from "styles/VehicleMore.module.css";
import {} from "react-bootstrap-icons";
import Image from "next/image";
import { ChevronRight, StarFill } from "react-bootstrap-icons";
import { useRouter } from "next/router";

export default function Vehicle() {
  const router = useRouter();
  return (
    <Layout title="Vehicle">
      <section className={styles.popularContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>Popular in town</div>
        </div>
        <div className={styles.itemContainer}>
          <div
            className={styles.item}
            onClick={() => {
              router.push(`/vehicle/details/s`);
            }}
          >
            <Image
              src={require("../../../public/Background-1.png")}
              alt="item"
              className={styles.itemImage}
              width={250}
              height={300}
              unoptimized={true}
            />
            <div className={styles.itemDetail}>
              <div className={styles.itemName}>Name</div>
              <div className={styles.itemLocation}>Location</div>
            </div>
          </div>
          <div
            className={styles.item}
            onClick={() => {
              router.push(`/vehicle/details/s`);
            }}
          >
            <Image
              src={require("../../../public/Background-1.png")}
              alt="item"
              className={styles.itemImage}
              width={250}
              height={300}
              unoptimized={true}
            />
            <div className={styles.itemDetail}>
              <div className={styles.itemName}>Name</div>
              <div className={styles.itemLocation}>Location</div>
            </div>
          </div>
          <div
            className={styles.item}
            onClick={() => {
              router.push(`/vehicle/details/s`);
            }}
          >
            <Image
              src={require("../../../public/Background-1.png")}
              alt="item"
              className={styles.itemImage}
              width={250}
              height={300}
              unoptimized={true}
            />
            <div className={styles.itemDetail}>
              <div className={styles.itemName}>Name</div>
              <div className={styles.itemLocation}>Location</div>
            </div>
          </div>
          <div
            className={styles.item}
            onClick={() => {
              router.push(`/vehicle/details/s`);
            }}
          >
            <Image
              src={require("../../../public/Item-Empty.webp")}
              alt="item"
              className={styles.itemImage}
              width={250}
              height={300}
              unoptimized={true}
            />
            <div className={styles.itemDetail}>
              <div className={styles.itemName}>Name</div>
              <div className={styles.itemLocation}>Location</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
