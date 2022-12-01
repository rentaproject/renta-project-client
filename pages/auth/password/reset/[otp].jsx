import React, { useState } from "react";
import Image from "next/image";
// import Link from "next/link";
import axios from "utilities/axiosClient";
import styles from "styles/Footer.module.css";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  // Link,
} from "react-bootstrap-icons";
import { useRouter } from "next/router";
import { Toast, ToastContainer } from "react-bootstrap";
export default function ChangePassword() {
  const router = useRouter();
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [succes, setSucces] = useState(false);
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { otp } = router.query;
  console.log(otp);
  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const result = await axios.patch(`api/auth/forgotpassword/${otp}`, form);
      console.log(form);
      setSucces(true);
      setLoading(false);
      setMsg(result.data.msg);
      setShowToast(true);
    } catch (error) {
      setMsg(error.response.data.msg);
      setLoading(false);
      setShowToast(true);
      //   console.log(error);
    }
  };
  return (
    <div>
      <div className="container-fluid w-100">
        <div className="row">
          <div
            className="col-6 bg-auth bg-primary auth-left"
            // className=""
            // style={{ marginLeft: "20px" }}
          >
            <Image
              src="/bg-auth.jpg"
              width={600}
              height={800}
              layout="responsive"
              // style={{ margin: "0" }}
            />
          </div>
          <div className="col-6 auth--right">
            <div
              className="form-auth "
              // style={{ marginTop: "300px" }}
            >
              <div className="form--header  mb-4">
                <p className="title--auth mb-4">Reset Password</p>
                <p className="desc-auth ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam adipisci facilis eveniet necessitatibus, aspernatur
                  reiciendis porro! Aspernatur dolor aperiam quasi dolorem ea
                  reprehenderit praesentium cumque. Cum adipisci odit provident
                  exercitationem?
                </p>
              </div>

              <input
                type="password"
                placeholder="New Password (min 6 character)"
                className="w-100 input--auth mb-3"
                name="newPassword"
                onChange={handleOnChange}
              />
              <input
                type="password"
                placeholder="Confirm Password "
                className="w-100 input--auth mb-5"
                name="confirmPassword"
                onChange={handleOnChange}
              />
              {!form.newPassword ||
              !form.confirmPassword ||
              form.newPassword.length < 6 ||
              form.newPassword !== form.confirmPassword ? (
                <button
                  type="button"
                  className="btn btn--auth w-100 mb-5"
                  onClick={handleChangePassword}
                  disabled
                  style={{ cursor: "notAllowed" }}
                  //   { form.confirmPassword === null && }
                >
                  Change Password
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn--auth w-100 mb-5"
                  onClick={handleChangePassword}
                  //   { form.confirmPassword === null && }
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner-border text-dark" role="status">
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    "Change Password"
                  )}
                </button>
              )}
              <ToastContainer
                position="top-center"
                className="p-3 position-fixed toast-container"
              >
                <Toast
                  show={showToast}
                  onClose={() => {
                    setShowToast(false);
                  }}
                >
                  <Toast.Header>
                    <strong className="me-auto">
                      {succes === true ? "Success" : "failed"}
                    </strong>
                    <small className="text-muted">just now</small>
                  </Toast.Header>
                  <Toast.Body>{msg}</Toast.Body>
                </Toast>
              </ToastContainer>
            </div>
            <div className="footer-auth " style={{ marginTop: "290px" }}>
              <div className={styles.footerContainer}>
                <div className={`${styles.footerMainContainer} `}>
                  <div className={` ${styles.footerMain}`}>
                    <div className={styles.footerLogoContainer}>
                      <Image
                        src={require("../../../../public/Logo-1.png")}
                        alt="logo"
                        className={styles.footerLogo}
                      />
                    </div>
                    <div className={styles.footerText}>
                      Plan and book your perfect trip with <br /> expert advice,
                      travel tips for vehicle information from us
                    </div>
                    <div className={styles.footerCopyRight}>
                      ©2020 Vehicle Rental Center. All rights reserved
                    </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
