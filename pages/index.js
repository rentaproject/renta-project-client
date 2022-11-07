import React, { useEffect, useState } from "react";
import Layout from "layout/main.jsx";
import styles from "styles/Landing.module.css";
import { ChevronRight, StarFill, DashLg } from "react-bootstrap-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllVehicle, getLocation } from "stores/action/vehicle";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const popularData = useSelector((state) => state.vehicle.popularData);
  const locationData = useSelector((state) => state.vehicle.location);

  useEffect(() => {
    getDataPopular();
    getLocationData();
  }, []);

  const getDataPopular = async () => {
    try {
      setIsLoading(true);
      await dispatch(getAllVehicle());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const getLocationData = async () => {
    try {
      await dispatch(getLocation());
    } catch (error) {}
  };
  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const searchHandler = () => {
    router.push(
      {
        pathname: "/vehicle",
        query: {
          keyword: form.keyword,
          date: form.date,
          location: form.location,
          search: true,
        },
      },
      "/vehicle"
    );
  };

  return (
    <Layout title="Home">
      <section className={styles.mainBanner}>
        <div className={styles.container}>
          <div className={styles.bannerTitle}>
            Explore and
            <br />
            Travel
          </div>
          <div className={styles.bannerSubtitle}>Vehicle Finder</div>
          <div className={styles.strip}>
            <DashLg />
          </div>
          <div>
            <input
              type="text"
              placeholder="Type the vehicle (ex. motorbike)"
              className={styles.inputType}
              name="keyword"
              onChange={formHandler}
            />
          </div>
          <div className={styles.inputContainer}>
            <select
              name="location"
              id="location"
              className={styles.inputLocation}
              onChange={formHandler}
            >
              <option value="">Location</option>
              {locationData.length > 0 ? (
                locationData.map((item) => {
                  return (
                    <option value={item.locationId} key={item.locationId}>
                      {item.name}
                    </option>
                  );
                })
              ) : (
                <></>
              )}
            </select>
            <input
              type="text"
              placeholder="Date"
              className={styles.inputDate}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              name="date"
              onChange={formHandler}
            />
          </div>
          <div
            className={styles.button}
            onClick={() => {
              searchHandler();
            }}
          >
            Search
          </div>
        </div>
      </section>
      <section className={styles.popularContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>Popular in town</div>
          <div
            className={styles.view}
            onClick={() => {
              router.push(`/vehicle/type/popular`);
            }}
          >
            View all <ChevronRight />
          </div>
        </div>
        {isLoading ? (
          <div className={styles.itemContainerEmpty}>
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className={styles.itemContainer}>
            {popularData.length > 0 ? (
              popularData.map((item, index) => {
                if (index > 3) {
                  return;
                }
                return (
                  <div
                    key={item.vehicleId}
                    className={styles.item}
                    onClick={() => {
                      router.push(`/vehicle/details/${item.vehicleId}`);
                    }}
                  >
                    <Image
                      src={
                        item.image1
                          ? `${process.env.URL_CLOUDINARY}${item.image1}`
                          : require("../public/Item-Empty.webp")
                      }
                      alt="item"
                      className={styles.itemImage}
                      width={250}
                      height={300}
                      unoptimized={true}
                    />
                    <div className={styles.itemDetail}>
                      <div className={styles.itemName}>{item.name}</div>
                      <div className={styles.itemLocation}>
                        {item.locationName ? item.locationName : "Indonesia"}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.itemContainerEmpty}>
                <div className={styles.notFound}>Sorry, vehicle not found</div>
              </div>
            )}
          </div>
        )}
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
