import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../styles/Footer.module.css";
import axios from "utilities/axiosClient";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  // Link,
} from "react-bootstrap-icons";
import { Toast, ToastContainer } from "react-bootstrap";
export default function Signup() {
  const Router = useRouter();
  const [succes, setSucces] = useState(false);
  const [msg, setMsg] = useState();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/auth/user/register", form);
      setSucces(true);
      setLoading(false);
      setMsg(result.data.msg);
      setShowToast(true);
      Router.push("signin");
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.msg);
      // Router.push("signup");

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
            className="col-6 bg-auth auth-left"
            // className=""
            // style={{ marginLeft: "20px" }}
          >
            <Image
              src="/bg-auth.jpg"
              width={600}
              height={800}
              layout="responsive"
              style={{ margin: "0" }}
            />
          </div>
          <div className="col-6 auth--right">
            <div className="form-auth" style={{ marginTop: "135px" }}>
              <div className="form--header  mb-5">
                <p className="title--auth">Register</p>
              </div>

              <input
                type="text"
                placeholder="Name"
                className="w-100 input--auth mb-3"
                name="name"
                onChange={handleOnChange}
              />
              <input
                type="text"
                placeholder="Email"
                className="w-100 input--auth mb-3"
                name="email"
                onChange={handleOnChange}
              />
              <input
                onChange={handleOnChange}
                name="password"
                type="password"
                placeholder="Password (min 6 character)"
                className="w-100 input--auth mb-5 "
              />
              {!form.email ||
              !form.password ||
              !form.name ||
              form.password.length < 6 ? (
                <button
                  type="button"
                  className="btn btn--auth w-100 mb-2"
                  onClick={handleSignup}
                  disabled
                >
                  Signup
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn--auth w-100 mb-2"
                  onClick={handleSignup}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner-border text-dark" role="status">
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    "Sign up"
                  )}
                </button>
              )}

              <p className="legend mt-5 mb-5">
                <span> or try another way</span>
              </p>
              <button
                type="button"
                className="btn btn--google w-100 mb-4 "
                //   onClick={handleSignup}
              >
                <img src="/google.png" alt="" style={{ marginRight: "5px" }} />
                Signup With Google
              </button>
              <button
                // type="button"
                className="btn btn--or w-100 mb-3"
                onClick={() => {
                  Router.push("/");
                }}
              >
                Signin
              </button>
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

            <div className="footer-auth ">
              <div className={styles.footerContainer}>
                <div className={`${styles.footerMainContainer} `}>
                  <div className={` ${styles.footerMain}`}>
                    <div className={styles.footerLogoContainer}>
                      <Image
                        src={require("../../../public/Logo-1.png")}
                        alt="logo"
                        className={styles.footerLogo}
                        onClick={() => {
                          Router.push("/");
                        }}
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
