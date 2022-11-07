import React, { useEffect } from "react";
import Layout from "layout/main.jsx";
import styles from "styles/VehicleMore.module.css";
import {} from "react-bootstrap-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAllVehicle } from "stores/action/vehicle";
import axios from "utilities/axiosClient";
import { useState } from "react";

export default function Vehicle() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id, name } = router.query;
  const dispatch = useDispatch();
  const popularData = useSelector((state) => state.vehicle.popularData);

  useEffect(() => {
    getVehicleByType();
    dispatch(getAllVehicle());
  }, []);

  const getVehicleByType = async () => {
    if (id === "popular") {
      return;
    }
    try {
      setIsLoading(true);
      const result = await axios.get(`/api/vehicle/type/${id}`);
      console.log(result);
      setData(result.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Vehicle">
      {id === "popular" ? (
        <section className={styles.popularContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>Popular in town</div>
          </div>
          <div className={styles.itemContainer}>
            {popularData.length > 0
              ? popularData.map((item, index) => {
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
                            : require("../../../public/Item-Empty.webp")
                        }
                        alt="item"
                        className={styles.itemImage}
                        width={250}
                        height={300}
                        unoptimized={true}
                      />
                      <div className={styles.itemDetail}>
                        <div className={styles.itemName}>
                          {item.name ? item.name : "Cooming Soon"}
                        </div>
                        <div className={styles.itemLocation}>
                          {item.locationName ? item.locationName : "Indonesia"}
                        </div>
                      </div>
                    </div>
                  );
                })
              : "Sorry, vehicle not found"}
          </div>
        </section>
      ) : (
        <></>
      )}
      {id !== "popular" ? (
        <section className={styles.popularContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>{name}</div>
          </div>
          <div className={styles.itemContainer}>
            {data.length > 0 ? (
              data.map((item, index) => {
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
                          : require("../../../public/Item-Empty.webp")
                      }
                      alt="item"
                      className={styles.itemImage}
                      width={250}
                      height={300}
                      unoptimized={true}
                    />
                    <div className={styles.itemDetail}>
                      <div className={styles.itemName}>
                        {item.name ? item.name : "Cooming Soon"}
                      </div>
                      <div className={styles.itemLocation}>
                        {item.locationName ? item.locationName : "Indonesia"}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : isLoading ? (
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div>Sorry, vehicle not found</div>
            )}
          </div>
        </section>
      ) : (
        <></>
      )}
    </Layout>
  );
}
