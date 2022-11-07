import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/Header.module.css";

function Header(props) {
  const role = "admin";
  const login = false;
  const router = useRouter();
  const title = props.title;

  return (
    <nav className="navbar navbar-expand-lg py-0">
      <div className={`container-fluid ${styles.navbar}`}>
        <div
          className={styles.logoContainer}
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src={require("../../public/Logo-1.png")}
            alt="Logo"
            className={styles.logo}
          />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div
                className={`nav-link active ${
                  title === "Home" ? styles.navItemActive : styles.navItem
                }`}
                aria-current="page"
                onClick={() => {
                  router.push("/");
                }}
              >
                Home
              </div>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link active ${
                  title === "Vehicle" ? styles.navItemActive : styles.navItem
                }`}
                aria-current="page"
                onClick={() => {
                  router.push("/vehicle");
                }}
              >
                Vehicle Type
              </div>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link active ${
                  title === "History" ? styles.navItemActive : styles.navItem
                }`}
                aria-current="page"
                onClick={() => {
                  if (role === "admin") {
                    return router.push("/history/admin");
                  }
                  if (role === "user") {
                    return router.push("/history/user");
                  }
                  router.push("/auth/signin");
                }}
              >
                History
              </div>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link active ${
                  title === "About" ? styles.navItemActive : styles.navItem
                }`}
                aria-current="page"
              >
                About
              </div>
            </li>
          </ul>
          <div className="nav-item dropdown">
            {login ? (
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <div
                  // class="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className={styles.profileContainer}>
                    <Image
                      src={require("../../public/Profile-Empty.png")}
                      alt="profile"
                      className={styles.profile}
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      History
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </ul>
            ) : (
              <div className={styles.buttonContainer}>
                <div
                  className={styles.whiteButton}
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                >
                  Login
                </div>
                <div
                  className={styles.yellowButton}
                  onClick={() => {
                    router.push("/auth/register");
                  }}
                >
                  Register
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
