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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [popularData, setPopularData] = useState([]);
  const router = useRouter();
  const { id, name } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    getVehicleByType();
    getPopularData();
  }, [page]);

  const getPopularData = async () => {
    try {
      window.scrollTo(0, 0);
      setIsLoading(true);
      const result = await axios.get(
        `/api/vehicle?page=${page}&limit=8&orderBy=rentCount&orderType=asc&`
      );
      setTotalPage(result.data.pagination.totalPage);
      setPopularData(result.data.data);
      setIsLoading(false);
    } catch (error) {
      setTotalPage(1);
      setPopularData([]);
      setIsLoading(false);
    }
  };
  const getVehicleByType = async () => {
    if (id === "popular") {
      return;
    }
    try {
      window.scrollTo(0, 0);
      setIsLoading(true);
      const result = await axios.get(
        `/api/vehicle/type/${id}?limit=8&page=${page}`
      );
      setTotalPage(result.data.pagination.totalPage);
      setData(result.data.data);
      setIsLoading(false);
    } catch (error) {
      setTotalPage(1);
      setIsLoading(false);
      setData([]);
    }
  };
  const nextPageHandler = () => {
    if (page === totalPage) {
      return;
    }
    setPage(page + 1);
  };
  const prevPageHandler = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  return (
    <Layout title="Vehicle">
      {id === "popular" ? (
        <section className={styles.popularContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>Popular in town</div>
          </div>
          <div className={styles.itemContainer}>
            {popularData.length > 0 && !isLoading ? (
              popularData.map((item, index) => {
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
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className={styles.empty}>Sorry, vehicle not found</div>
            )}
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
            {data.length > 0 && !isLoading ? (
              data.map((item, index) => {
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
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className={styles.empty}>Sorry, vehicle not found</div>
            )}
          </div>
        </section>
      ) : (
        <></>
      )}

      {id !== "popular" ? (
        data.length > 0 && !isLoading ? (
          <div className={styles.pagination}>
            <div onClick={prevPageHandler} className={styles.prevButton}>
              prev
            </div>
            <div className={styles.page}>
              {page}/{totalPage}
            </div>
            <div onClick={nextPageHandler} className={styles.nextButton}>
              next
            </div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      {id === "popular" ? (
        popularData.length > 0 && !isLoading ? (
          <div className={styles.pagination}>
            <div onClick={prevPageHandler} className={styles.prevButton}>
              prev
            </div>
            <div className={styles.page}>
              {page}/{totalPage}
            </div>
            <div onClick={nextPageHandler} className={styles.nextButton}>
              next
            </div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </Layout>
  );
}
