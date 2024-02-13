import style from "./index.module.css";
import logo from "../../assets/logo.svg";
import hero from "../../assets/male.png";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../loader";

export default function SignIn() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const loginRef = useRef();
  const passwordRef = useRef();

  function validate() {
    if (!loginRef.current.value.trim().length) {
      alert("username kiritilishi shart !!!");
      loginRef.current.focus();
      loginRef.current.value = "";
      return false;
    }
    if (!passwordRef.current.value.trim().length) {
      alert("password kiritilishi shart !!!");
      passwordRef.current.focus();
      passwordRef.current.value = "";
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      setLoader(true);
      let user = {
        username: loginRef.current.value,
        email: loginRef.current.value + "@" + loginRef.current.value,
        password: passwordRef.current.value,
      };
      axios
        .post(import.meta.env.VITE_API_URL + "/auth/signin", user)
        .then((el) => {
          setLoader(false);
          localStorage.setItem("userInfo", JSON.stringify(el.data));
          localStorage.setItem("token", JSON.stringify(el.data.accessToken));
          navigate("/");
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    }
  }

  return (
    <>{loader && <Loader/>}
      {!loader && (
        <div className={style.wrapper}>
          <div className={style.texts}>
            <div className={style.logo}>
              <img src={logo} alt="Company logo" />
            </div>
            <h2 className={style.formTitle}>Xush kelibsiz!</h2>
            <p className={style.formDesc}>
              Login parolingizni kiritib o'z kabinentingizga kiring.
            </p>
            <form onSubmit={handleSubmit} className={style.form}>
              <label htmlFor="login">Username</label>
              <input
                ref={loginRef}
                type="text"
                id="login"
                placeholder="Username ni kiriting"
              />

              <label htmlFor="password">Parol</label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                placeholder="Parolingizni kiriting"
              />

              <button>Kirish</button>
            </form>
            <p className={style.link}>
              Yangi akkaunt yarating <Link to="/signup">Sign Up</Link>
            </p>
            <p className={style.companyDesc}>
              Copyright ©  2024 Vim kompaniyasi
            </p>
          </div>
          <div className={style.img}>
            <img src={hero} alt="" />
          </div>
        </div>
      )}
    </>
  );
}
