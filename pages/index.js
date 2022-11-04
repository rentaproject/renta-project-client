import React from "react";
import Layout from "layout/main.jsx";
import styles from "styles/Landing.module.css";
import { ChevronRight, StarFill } from "react-bootstrap-icons";
import Image from "next/image";
export default function LandingPage() {
  return (
    <Layout>
      <section className={styles.mainBanner}>
        <div className={styles.container}>
          <div className={styles.bannerTitle}>
            Explore and
            <br />
            Travel
          </div>
          <div className={styles.bannerSubtitle}>Vehicle Finder</div>
          <span className={`material-symbols-outlined ${styles.strip}`}>
            horizontal_rule
          </span>
          <div>
            <input
              type="text"
              placeholder="Type the vehicle (ex. motorbike)"
              className={styles.inputType}
            />
          </div>
          <div className={styles.inputContainer}>
            <select name="cars" id="cars" className={styles.inputLocation}>
              <option value="saab">Location</option>
              <option value="volvo">Yogyakarta</option>
              <option value="saab">Malang</option>
              <option value="mercedes">Kalimantan</option>
            </select>
            <input
              type="text"
              placeholder="Date"
              className={styles.inputDate}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>
          <div className={styles.button}>Search</div>
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
              src={require("../public/Background-1.png")}
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
              src={require("../public/Background-1.png")}
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
              src={require("../public/Background-1.png")}
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
              src={require("../public/Item-Empty.webp")}
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
      <section className={styles.testiContainer}>
        <div className={styles.title}>Testimonials</div>
        <div className={styles.testiItem}>
          <div className={`col-sm-12 col-md-12 col-lg-6 ${styles.testi}`}>
            <div className={styles.testiStars}>
              <StarFill />
              <StarFill />
              <StarFill />
              <StarFill />
              <StarFill />
            </div>
            <div className={styles.testiText}>
              ”It was the right decision to rent vehicle here, I spent less
              money and enjoy the trip. It was an amazing experience to have a
              ride for wildlife trip!”
            </div>
            <div>
              <div className={styles.testiName}>Edward Newgate</div>
              <div className={styles.testiJob}>Founder Circle</div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 text-center">
            <Image
              src={require("../public/Profile-Testi.png")}
              alt="item"
              width={312}
              height={393}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
