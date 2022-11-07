import Image from "next/image";
import React from "react";
import styles from "../../styles/Footer.module.css";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Link,
} from "react-bootstrap-icons";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={`${styles.footerMainContainer} row`}>
        <div className={`col-sm-12 col-md-6 col-lg-3 ${styles.footerMain}`}>
          <div className={styles.footerLogoContainer}>
            <Image
              src={require("../../public/Logo-1.png")}
              alt="logo"
              className={styles.footerLogo}
            />
          </div>
          <div className={styles.footerText}>
            Plan and book your perfect trip with expert advice, travel tips for
            vehicle information from us
          </div>
          <div className={styles.footerCopyRight}>
            ©2020 Vehicle Rental Center. All rights reserved
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <div className={styles.footerTitle}>Destinations</div>
          <div className={styles.footerItem}>Bali</div>
          <div className={styles.footerItem}>Yogyakarta</div>
          <div className={styles.footerItem}>Jakarta</div>
          <div className={styles.footerItem}>Kalimantan</div>
          <div className={styles.footerItem}>Malang</div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <div className={styles.footerTitle}>Vehicle</div>
          <div className={styles.footerItem}>Bike</div>
          <div className={styles.footerItem}>Cars</div>
          <div className={styles.footerItem}>Motorbike</div>
          <div className={styles.footerItem}>Return Times</div>
          <div className={styles.footerItem}>FAQs</div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <div className={styles.footerTitle}>Interests</div>
          <div className={styles.footerItem}>Adventure Travel</div>
          <div className={styles.footerItem}>Art And Culture</div>
          <div className={styles.footerItem}>Wildlife And Nature</div>
          <div className={styles.footerItem}>Family Holidays</div>
          <div className={styles.footerItem}>Culinary Trip</div>
        </div>
      </div>
      <div className={styles.footerSocmed}>
        <Twitter />
        <Facebook />
        <Instagram />
        <Linkedin />
        <Youtube />
      </div>
    </div>
  );
}

export default Footer;
