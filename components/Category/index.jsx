import React from "react";
import { ChevronRight } from "react-bootstrap-icons";
import Image from "next/image";
import styles from "styles/Vehicle.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "utilities/axiosClient";
import { useRouter } from "next/router";

function Category(props) {
  const { item } = props;
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `/api/vehicle/type/${item.typeId}?limit=4`
      );
      setCategoryData(result.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <section className={styles.typeContainer} key={item.typeId}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{item.name}</div>
        <div
          className={styles.view}
          onClick={() => {
            router.push(
              {
                pathname: `/vehicle/type/${item.typeId}`,
                query: {
                  name: item.name,
                },
              },
              `/vehicle/type/${item.typeId}`
            );
          }}
        >
          View all <ChevronRight />
        </div>
      </div>
      <div className={styles.itemContainer}>
        {isLoading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : categoryData && categoryData.length > 0 ? (
          categoryData.map((item) => {
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
                      : require("../../public/Item-Empty.webp")
                  }
                  alt="item"
                  className={styles.itemImage}
                  width={250}
                  height={300}
                  unoptimized={true}
                />
                <div className={styles.itemDetail}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemLocation}>{item.locationName}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.notFound}>
            Sorry, vehicle not found for this category
          </div>
        )}
      </div>
    </section>
  );
}

export default Category;
