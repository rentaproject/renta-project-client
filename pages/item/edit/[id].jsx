/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "layout/main";
import styles from "styles/addItem.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import InputVehicle1 from "components/inputVehicle/inputVehicle1";
import InputVehicle2 from "components/inputVehicle/inputVehicle2";
import BtnPayment from "components/BtnPayment/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getVehicleById } from "stores/action/vehicle";
import axios from "utilities/axiosClient";
import swal from "sweetalert";

export default function Add2() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router?.query;

  const dataVehicle = useSelector((state) => state.vehicle.dataVehicle[0]);
  const [types, setTypes] = useState();
  const [status, setstatus] = useState("Select status");
  const [dropdowncategory, setdropdowncategory] = useState(0);
  const [textCategory, settextCategory] = useState("");
  const [imagePreview1, setImagePreview1] = useState("");
  const [imagePreview2, setImagePreview2] = useState("");
  const [imagePreview3, setImagePreview3] = useState("");
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

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

      setImagePreview1(urlImage1);
    } else if (inputId === "image2") {
      setForm({
        ...form,
        image2: e.target.files[0],
      });

      setImagePreview2(urlImage2);
    } else {
      setForm({
        ...form,
        image3: e.target.files[0],
      });

      setImagePreview3(urlImage3);
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
  const cancel1 = () => {
    setForm({
      ...form,
      image1: dataVehicle?.image1,
    });
    setImagePreview1("");
  };
  const cancel2 = () => {
    setForm({
      ...form,
      image2: dataVehicle?.image2,
    });
    setImagePreview2("");
  };
  const cancel3 = () => {
    setForm({
      ...form,
      image3: dataVehicle?.image3,
    });
    setImagePreview3("");
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
    setLoading(true);
    axios
      .patch(`/api/vehicle/${form.vehicleId}`, form)
      .then((response) => {
        setLoading(false);
        swal(response.data.msg);
      })
      .catch((error) => swal(error.response?.data.msg));
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

            <label htmlFor="image1" className={styles.mainImageContainer}>
              <div className={styles.mainImageContainer}>
                <Image
                  src={
                    imagePreview1
                      ? imagePreview1
                      : form.image1
                      ? `${process.env.URL_CLOUDINARY}${form.image1}`
                      : require("../../../public/Item-Empty.webp")
                  }
                  alt="item"
                  className={styles.mainImage}
                  width={250}
                  height={150}
                  layout="responsive"
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
            {imagePreview1 ? (
              <div className="text-center">
                <button className={styles.cancel} onClick={cancel1}>
                  cancel
                </button>
              </div>
            ) : (
              ""
            )}
            <div className={styles.sideImageWrapper}>
              <label htmlFor="image2" className={styles.sideImageContainer}>
                <Image
                  src={
                    imagePreview2
                      ? imagePreview2
                      : form.image2
                      ? `${process.env.URL_CLOUDINARY}${form.image2}`
                      : require("../../../public/Item-Empty.webp")
                  }
                  alt="item"
                  className={styles.sideImage}
                  width={250}
                  height={150}
                  layout="responsive"
                />
                <input
                  onChange={(e) => handleImg(e)}
                  className="d-none"
                  type="file"
                  name="image2"
                  id="image2"
                />
              </label>

              <label htmlFor="image3" className={styles.sideImageContainer}>
                <Image
                  src={
                    imagePreview3
                      ? imagePreview3
                      : form.image3
                      ? `${process.env.URL_CLOUDINARY}${form.image3}`
                      : require("../../../public/Item-Empty.webp")
                  }
                  alt="item"
                  className={styles.sideImage}
                  width={250}
                  height={150}
                  layout="responsive"
                />
                <input
                  onChange={(e) => handleImg(e)}
                  className="d-none"
                  type="file"
                  name="image3"
                  id="image3"
                />
              </label>
            </div>
            <div className="d-flex justify-content-center gap-5">
              {imagePreview2 ? (
                <div className="text-center me-5">
                  <button className={styles.cancel} onClick={cancel2}>
                    cancel
                  </button>
                </div>
              ) : (
                ""
              )}
              {imagePreview3 ? (
                <div className="text-center ">
                  <button className={styles.cancel} onClick={cancel3}>
                    cancel
                  </button>
                </div>
              ) : (
                ""
              )}
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
            {loading ? (
              <div className="spinner-border text-dark" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <BtnPayment
                onClick={handleUpdataItem}
                text="Save"
                className="w-100 bg-orange"
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
