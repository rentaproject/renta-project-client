import React, { useState } from "react";
import Layout from "layout/main";
import styles from "styles/addItem.module.css";
import Image from "next/image";
import InputVehicel1 from "components/inputVehicle/inputVehicle1";
import InputVehicle2 from "components/inputVehicle/inputVehicle2";
import BtnPayment from "components/BtnPayment/index.jsx";
import defaultItem from "public/defaultPhotoItem.png";

export default function Add2() {
  const [searchLocations, setsearchLocations] = useState("");
  const [dropdown, setdropdown] = useState(1);
  const [textCategory, settextCategory] = useState();
  const [dropdowncategory, setdropdowncategory] = useState(0);
  const [types, settypes] = useState();
  const [form, setform] = useState({
    location_id: "",
    type_id: "",
    vehicle_name: "",
    price: "",
    status: "",
    stock: "",
    description: "",
    vehicle_img: {},
  });
  const handleImg = (e) => {
    const urlImg = URL.createObjectURL(e.target.files[0]);
    const inputId = e.target.id;
    if (inputId === "img1") {
      setform({
        ...form,
        vehicle_img: e.target.files[0],
      });
      seturlImage(urlImg);
    } else if (inputId === "img2") {
      seturlImage2(urlImg);
    } else {
      seturlImage3(urlImg);
    }
  };
  const handleDrop = () => {
    if (dropdown === 0) {
      setdropdown(1);
    } else {
      setdropdown(0);
    }
  };
  const changetype = (e) => {
    setform({
      ...form,
      type_id: e.target.id,
    });
    settextCategory(e.target.textContent);
    setdropdowncategory(0);
  };

  const handleCategory = () => {
    if (dropdowncategory === 0) {
      setdropdowncategory(1);
    } else {
      setdropdowncategory(0);
    }
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
          <span className="fw-bold d-block ms-3">Add new item</span>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-7">
            <InputVehicel1
              className={styles.input}
              type="text"
              name="name"
              placeholder="Name (max up to 50 words"
            />
            <label htmlFor="image1" className={styles.cam}>
              <div className={styles.cam}>
                <Image
                  className=""
                  src={defaultItem}
                  alt="itempicture"
                  width={30}
                  height={30}
                  objectFit="cover"
                />
              </div>
            </label>
            <div className="row  mt-3">
              <div className="col-12 col-md-12 col-lg-6 text-center">
                <label htmlFor="image2">
                  <div className={styles.subcam}>
                    <Image
                      className=""
                      src={defaultItem}
                      alt="itempicture"
                      width={30}
                      height={30}
                      objectFit="cover"
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-md-12 col-lg-6 mt-3 mt-md-3 mt-lg-0 text-center">
                <label htmlFor="image3">
                  <div className={styles.subcam}>
                    <Image
                      className=""
                      src={defaultItem}
                      alt="itempicture"
                      width={30}
                      height={30}
                      objectFit="cover"
                    />
                  </div>
                </label>
              </div>
            </div>
            <input
              onChange={(e) => handleImg(e)}
              className="d-none"
              type="file"
              name="vehicle_img"
              id="img1"
            />
            <input
              onChange={(e) => handleImg(e)}
              className="d-none"
              type="file"
              name="vehicle_img"
              id="img1"
            />
            <input
              onChange={(e) => handleImg(e)}
              className="d-none"
              type="file"
              name="vehicle_img"
              id="img1"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <input
              className={styles.input}
              type="text"
              name="location_id"
              placeholder="Locations"
            />
            {searchLocations !== "" && (
              <div className={styles.dropdownlocations}>
                <div
                  className={styles.dropmenu}
                  onClick={() => setsearchLocations("")}
                >
                  <span className={styles.category}>
                    <b>
                      {locations ? "Choose location" : "Locations not found"}
                    </b>
                  </span>
                </div>
                {locations &&
                  locations.map((location, index) => (
                    <div
                      key={index}
                      className={styles.dropmenu}
                      onClick={(e) => changeLocations(e)}
                    >
                      <span
                        id={location.location_id}
                        className={styles.category}
                      >
                        {location.location_name}
                      </span>
                    </div>
                  ))}
              </div>
            )}
            <InputVehicel1
              onChange={(e) => handleForm(e)}
              name="description"
              placeholder="Description (max up to 150 words)"
            />
            <InputVehicle2
              onChange={(e) => handleForm(e)}
              name="price"
              placeholder="Type the price"
              title="Price : "
            />
            <span className={styles.inputTitle}>Status : </span>

            <div className="row mt-3">
              <div className="col-12 col-md-6 col-lg-6">
                <select
                  className={styles.status}
                  aria-label=".form-select-md fs-6 example"
                >
                  <option selected>
                    <BtnPayment
                      onClick={() => handleCategory()}
                      text={textCategory ? textCategory : "Select Status"}
                      className={styles.status}
                    />
                  </option>
                  <option value="1">Available</option>
                  <option value="2">Full Booked</option>
                </select>

                <div className={styles.dropdowncategory}></div>
              </div>
            </div>

            <InputVehicle2
              onChange={(e) => handleForm(e)}
              name="stock"
              placeholder="Insert stock"
              title="Stock : "
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
                  types.map((type, index) => (
                    <div
                      key={index}
                      onClick={(e) => changetype(e)}
                      className={styles.dropmenu}
                    >
                      <span id={type.type_id} className={styles.category}>
                        {type.type_name}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="col-12 col-md-6 col-lg-6 mt-3 mt-md-0 mt-lg-0">
            <BtnPayment
              onClick={() => handleSave()}
              text="Save"
              className="w-100 bg-orange"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
