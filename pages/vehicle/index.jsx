import React, { useEffect, useState } from "react";
import Layout from "layout/main.jsx";
import styles from "styles/Vehicle.module.css";
import { Windows } from "react-bootstrap-icons";
import Image from "next/image";
import { X, ChevronRight } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import axios from "utilities/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "stores/action/vehicle";
import Category from "components/Category";

export default function Vehicle() {
  const [searchActive, setSearchActive] = useState(false);
  const [form, setForm] = useState({});
  const [searchData, setSearchData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [popularData, setPopularData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageUpdate, setPageUpdate] = useState(false);
  const locationData = useSelector((state) => state.vehicle.location);
  const router = useRouter();
  const data = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    getCategory();
    getLocationData();
    getPopularData();
    if (data.search) {
      getSearchDataFromHome();
    }
  }, []);

  useEffect(() => {
    if (pageUpdate) {
      getSearchData();
    }
  }, [pageUpdate]);

  const getCategory = async () => {
    try {
      const result = await axios.get("/api/category");
      setCategory(result.data.data);
    } catch (error) {
      setCategory([]);
    }
  };
  const getLocationData = async () => {
    try {
      await dispatch(getLocation());
    } catch (error) {}
  };
  const getSearchData = async () => {
    try {
      window.scrollTo(0, 0);
      setSearchLoading(true);
      setSearchData([]);
      const location = form.location || "";
      const keyword = form.keyword || "";
      const result = await axios.get(
        `/api/vehicle?page=${page}&limit=${8}&orderBy=${"rentCount"}&orderType=${"asc"}&location=${location}&keyword=${keyword}`
      );
      console.log(result);
      setTotalPage(result.data.pagination.totalPage);
      setSearchData(result.data.data);
      setSearchLoading(false);
      setPageUpdate(false);
      setSearchActive(true);
    } catch (error) {
      setSearchData([]);
      setSearchLoading(false);
      setPageUpdate(false);
      console.log(error);
    }
  };
  const getSearchDataFromHome = async () => {
    try {
      window.scrollTo(0, 0);
      setSearchLoading(true);
      setSearchData([]);
      const location = data.location || "";
      const keyword = data.keyword || "";
      setForm({ ...form, location, keyword });
      const result = await axios.get(
        `/api/vehicle?page=${page}&limit=${8}&orderBy=${"rentCount"}&orderType=${"asc"}&location=${location}&keyword=${keyword}`
      );
      console.log(result);
      setTotalPage(result.data.pagination.totalPage);
      setSearchData(result.data.data);
      setSearchLoading(false);
      setPageUpdate(false);
      setSearchActive(true);
    } catch (error) {
      setSearchData([]);
      setSearchLoading(false);
      setPageUpdate(false);
      console.log(error);
    }
  };
  const getPopularData = async () => {
    try {
      const result = await axios.get(
        `/api/vehicle?page=1&limit=4&orderBy=rentCount&orderType=asc`
      );
      setPopularData(result.data.data);
    } catch (error) {
      setPopularData([]);
    }
  };
  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const closeHandler = () => {
    setSearchActive(false);
    setSearchData([]);
    setPage(1);
    setTotalPage(1);
  };
  const nextPageHandler = () => {
    if (page === totalPage) {
      return;
    }
    setPage(page + 1);
    setPageUpdate(true);
  };
  const prevPageHandler = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
    setPageUpdate(true);
  };

  return (
    <Layout title="Vehicle">
      <section className={`row m-0 ${styles.searchContainer}`}>
        <div className={`col-sm-12 col-md-6 col-lg-3 pb-1 pe-1`}>
          <input
            type="text"
            placeholder="Vehicle name"
            name="keyword"
            className={styles.inputType}
            defaultValue={data.keyword}
            onChange={formHandler}
          />
        </div>
        <div className={`col-sm-12 col-md-6 col-lg-3 pb-1 pe-1`}>
          <select
            name="location"
            id="location"
            className={styles.inputLocation}
            defaultValue={data.location}
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
        </div>
        <div className={`col-sm-12 col-md-6 col-lg-3 pb-1 pe-1`}>
          <input
            type="text"
            placeholder="Date"
            name="date"
            className={styles.inputDate}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            defaultValue={data.date}
            onChange={formHandler}
          />
        </div>
        <div className={`col-sm-12 col-md-6 col-lg-3 pb-1 pe-1`}>
          <div className={styles.inputButton} onClick={getSearchData}>
            Search
          </div>
        </div>
      </section>

      {searchActive && !searchLoading ? (
        <div className={styles.closeContainer}>
          <div onClick={closeHandler} className={styles.closeButton}>
            <X />
            Close Search
          </div>
        </div>
      ) : (
        <></>
      )}

      {searchLoading ? (
        <div className={styles.loadingContainer}>
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <></>
      )}

      <section className={styles.resultContainer}>
        <div className={styles.resultItemContainer}>
          {searchActive ? (
            searchData.length > 0 ? (
              searchData.map((item, index) => {
                return (
                  <div
                    key={index}
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
                      <div className={styles.itemLocation}>
                        {item.locationName}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : searchLoading ? (
              <></>
            ) : (
              <section className={styles.emptyContainer}>
                <div className={styles.notFound}>Sorry, vehicle not found</div>
              </section>
            )
          ) : (
            <></>
          )}
        </div>
        {searchActive ? (
          searchData.length > 0 ? (
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
      </section>

      {!searchActive && !searchLoading ? (
        <div>
          <section className={styles.typeContainer}>
            {popularData.length > 0 ? (
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
            ) : (
              <></>
            )}

            <div className={styles.itemContainer}>
              {popularData && popularData.length > 0 ? (
                popularData.map((item) => {
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
                        <div className={styles.itemLocation}>
                          {item.locationName}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </section>
        </div>
      ) : (
        <></>
      )}

      {!searchActive && !searchLoading ? (
        <div>
          {category.length > 0 ? (
            category.map((item) => {
              return <Category item={item} key={item.typeId} />;
            })
          ) : (
            <section className={styles.popularContainer}></section>
          )}
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
}
