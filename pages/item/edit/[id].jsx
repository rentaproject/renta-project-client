/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "layout/main";
import styles from "styles/addItem.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import InputVehicle1 from "components/inputVehicle/inputVehicle1";
import InputVehicle2 from "components/inputVehicle/inputVehicle2";
import BtnPayment from "components/BtnPayment/index.jsx";
import defaultItem from "public/defaultPhotoItem.png";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleById } from "stores/action/vehicle";
import InputVehicle from "components/inputVehicle/inputVehicle1";
import axios from "utilities/axiosClient";

export default function Add2() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router?.query;

  const dataVehicle = useSelector((state) => state.vehicle.dataVehicle[0]);
  const [types, setTypes] = useState();
  const [status, setstatus] = useState("Select status");
  const [dropdowncategory, setdropdowncategory] = useState(0);
  const [textCategory, settextCategory] = useState("");
  const [textLocation, settextLocation] = useState("");

  const [urlImage1, seturlImage1] = useState("");
  const [urlImage2, seturlImage2] = useState(defaultItem.src);
  const [urlImage3, seturlImage3] = useState(defaultItem.src);
  const [form, setForm] = useState({});
  const [locationId, setLocationId] = useState("");
  const [category, setCategory] = useState({});

  useEffect(() => {
    getDataVehicle();
    getTypes();
  }, [id]);
  console.log(id);
  console.log(dataVehicle);

  const getDataVehicle = () => {
    dispatch(getVehicleById(id))
      .then((response) => {
        setForm(response.value.data.data[0]);
      })
      .catch((error) => console.log(error));
  };
  const getTypes = () => {
    axios
      .get(`/api/category`)
      .then((result) => {
        console.log(result);
        setTypes(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputData = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  const handleImg = (e) => {
    const urlImage1 = URL.createObjectURL(e.target.files[0]);
    const urlImage2 = URL.createObjectURL(e.target.files[0]);
    const urlImage3 = URL.createObjectURL(e.target.files[0]);
    const inputId = e.target.id;
    if (inputId === "image1") {
      setForm({
        ...form,
        image1: e.target.files[0],
      });
      seturlImage1(urlImage1);
    } else if (inputId === "image2") {
      setForm({
        ...form,
        image2: e.target.files[0],
      });
      seturlImage2(urlImage2);
    } else {
      setForm({
        ...form,
        image3: e.target.files[0],
      });
      seturlImage3(urlImage3);
    }
  };
  const handleCategory = () => {
    if (dropdowncategory === 0) {
      setdropdowncategory(1);
    } else {
      setdropdowncategory(0);
    }
  };

  const changeStatus = (e) => {
    setstatus(e.target.textContent);
    setForm({
      ...form,
      status: e.target.value,
    });
  };

  const changetype = (e) => {
    setForm({
      ...form,
      typeId: e.target.id,
    });
    settextCategory(e.target.textContent);
    setdropdowncategory(0);
  };

  const handleUpdataItem = () => {
    axios
      .patch(`/api/vehicle/${form.vehicleId}`, form)
      .then((response) => {
        alert(response.data.msg);
      })
      .catch((error) => alert(error.response?.data.msg));
  };

  return (
    <Layout>
      <div className="container mb-5 pb-5">
        <div className="d-flex align-item-center mt-3 mb-lg-5 mb-md-4 mb-4">
          <button
            className="btn px-1 py-0 me-2 button-update-profile"
            onClick={() => router.back()}
          >
            <i className="bi bi-chevron-left fw-bold"></i>
          </button>
          <span className="fw-bold d-block ms-3">Edit Item</span>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-7">
            <InputVehicle1
              className={styles.input}
              type="text"
              name="name"
              value={form.name}
              placeholder="Name (max up to 50 words)"
              onChange={(e) => inputData(e)}
            />

            <label htmlFor="image1" className={styles.cam}>
              <div className={styles.cam}>
                <Image
                  className=""
                  src={
                    urlImage1
                      ? urlImage1
                      : form.image1
                      ? process.env.URL_CLOUDINARY + `${form?.image1}`
                      : defaultItem
                  }
                  alt="itempicture"
                  width={600}
                  height={300}
                  objectFit="cover"
                />
              </div>
              <input
                onChange={(e) => handleImg(e)}
                className="d-none"
                type="file"
                name="image1"
                id="image1"
              />
            </label>

            <div className="row  mt-3">
              <div className="col-12 col-md-12 col-lg-6 text-center">
                <label htmlFor="image2">
                  <div className={styles.subcam}>
                    <Image
                      className=""
                      src={process.env.URL_CLOUDINARY + `${form.image2}`}
                      alt="itempicture"
                      width={350}
                      height={200}
                      objectFit="cover"
                    />
                  </div>
                  <input
                    onChange={(e) => handleImg(e)}
                    className="d-none"
                    type="file"
                    name="image2"
                    id="image2"
                  />
                </label>
              </div>
              <div className="col-12 col-md-12 col-lg-6 mt-3 mt-md-3 mt-lg-0 text-center">
                <label htmlFor="image3">
                  <div className={styles.subcam}>
                    <Image
                      className=""
                      src={process.env.URL_CLOUDINARY + `${form.image3}`}
                      alt="itempicture"
                      width={350}
                      height={200}
                      objectFit="cover"
                    />
                  </div>
                  <input
                    onChange={(e) => handleImg(e)}
                    className="d-none"
                    type="file"
                    name="image3"
                    id="image3"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <span className={styles.inputTitle}>Location : </span>
            <InputVehicle1
              onChange={(e) => inputData(e)}
              name="locationName"
              value={form.locationName}
              placeholder="Description (max up to 150 words)"
            />

            <span className={styles.inputTitle}>Description : </span>
            <InputVehicle1
              onChange={(e) => inputData(e)}
              name="description"
              placeholder="Description (max up to 150 words)"
            />
            <InputVehicle2
              onChange={(e) => inputData(e)}
              name="price"
              type="text"
              placeholder="Type the price"
              title="Price : "
              value={form.price}
            />
            <span className={styles.inputTitle}>Status : </span>

            <div className="row mt-3">
              <div className="col-12 col-md-6 col-lg-6">
                <select
                  className={styles.status}
                  aria-label=".form-select-md fs-6 example"
                  name="status"
                >
                  <option selected>
                    <BtnPayment
                      onClick={(e) => changeStatus(e)}
                      text={"Select Status"}
                      className={styles.status}
                    />
                  </option>
                  <option value="Available" onClick={(e) => changeStatus(e)}>
                    Available
                  </option>
                  <option value="Full Booking" onClick={(e) => changeStatus(e)}>
                    Full Booked
                  </option>
                </select>
              </div>
            </div>
            <InputVehicle2
              onChange={(e) => inputData(e)}
              name="stock"
              type="text"
              placeholder="Insert stock"
              title="Stock : "
              value={form.stock}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-md-6 col-lg-6">
            <BtnPayment
              onClick={() => handleCategory()}
              text={textCategory ? textCategory : "Add item to"}
              className="w-100 bg-black"
            />
            {dropdowncategory === 1 && (
              <div className={styles.dropdowncategory}>
                <div
                  className={styles.dropmenu}
                  onClick={() => setdropdowncategory(0)}
                >
                  <span className={styles.category}>
                    <b>Choose Category</b>
                  </span>
                </div>
                {types &&
                  types?.map((type, index) => (
                    <div
                      key={index}
                      onClick={(e) => changetype(e)}
                      className={styles.dropmenu}
                    >
                      <span id={type.typeId} className={styles.category}>
                        {type.name}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="col-12 col-md-6 col-lg-6 mt-3 mt-md-0 mt-lg-0">
            <BtnPayment
              onClick={handleUpdataItem}
              text="Save"
              className="w-100 bg-orange"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
