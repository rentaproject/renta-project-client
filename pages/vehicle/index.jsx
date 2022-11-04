import React from "react";
import Layout from "layout/main.jsx";
import styles from "styles/Vehicle.module.css";
import {} from "react-bootstrap-icons";
import Image from "next/image";
import { ChevronRight, StarFill } from "react-bootstrap-icons";

export default function LandingPage() {
  return (
    <Layout>
      <section className={`row ${styles.searchContainer}`}>
        <div className={`col-sm-12 col-md-6 col-lg-3 pe-2 mb-2`}>
          <input
            type="text"
            placeholder="Vehicle name"
            className={styles.inputType}
          />
        </div>
        <div className={`col-sm-12 col-md-6 col-lg-3 pe-2 pb-2`}>
          <select name="cars" id="cars" className={styles.inputLocation}>
            <option value="saab">Location</option>
            <option value="volvo">Yogyakarta</option>
            <option value="saab">Malang</option>
            <option value="mercedes">Kalimantan</option>
          </select>
        </div>
        <div className={`col-sm-12 col-md-6 col-lg-3 pe-2 pb-2`}>
          <input
            type="text"
            placeholder="Date"
            className={styles.inputDate}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
        <div className={`col-sm-12 col-md-6 col-lg-3 pe-2 pb-2`}>
          <div className={styles.inputButton}>Search</div>
        </div>
      </section>
      <section className={styles.popularContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>Popular in town</div>
          <div className={styles.view}>
            View all <ChevronRight />
          </div>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.item}>
            <Image
              src={require("../../public/Background-1.png")}
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
          <div className={styles.item}>
            <Image
              src={require("../../public/Background-1.png")}
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
          <div className={styles.item}>
            <Image
              src={require("../../public/Background-1.png")}
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
          <div className={styles.item}>
            <Image
              src={require("../../public/Item-Empty.webp")}
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
