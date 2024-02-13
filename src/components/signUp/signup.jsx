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

export default function SignUp() {
  const navigate = useNavigate();
  const loginRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();
  const [loader, setLoader] = useState(false);


  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validate() {
    if (!usernameRef.current.value.trim().length) {
      alert("username kiritilishi shart !!!");
      usernameRef.current.focus();
      usernameRef.current.value = "";
      return false;
    }
    if (!loginRef.current.value.trim().length) {
      alert("Email kiritilishi shart !!!");
      loginRef.current.focus();
      loginRef.current.value = "";
      return false;
    }
    const email = loginRef.current.value;
    if (!validateEmail(email)) {
      alert("Emailning to'g'ri formatda kiritilishi shart!!!");
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
    if (!repasswordRef.current.value.trim().length) {
      alert("password kiritilishi shart !!!");
      repasswordRef.current.focus();
      repasswordRef.current.value = "";
      return false;
    }
    if (passwordRef.current.value != repasswordRef.current.value) {
      alert("Parollar bir biriga mos emas!!");
      passwordRef.current.focus();
      repasswordRef.current.value = "";
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      setLoader(true);
      let user = {
        username: usernameRef.current.value,
        email: loginRef.current.value,
        password: passwordRef.current.value,
      };
      axios
        .post(import.meta.env.VITE_API_URL + "/signup", user)
        .then((el) => {
          setLoader(false)
          console.log(el);
          console.log(el.data.message);
          if (el.data.message == "User registered successfully!") {
            navigate("/signin");
          }
        })
        .catch((err) => {
          setLoader(false)
          alert(
            "Bunday foydalanuvchi nomi mavjud bo'lishi yoki serverda hatolik bo'lishi mumkin! "
          );
          usernameRef.current.focus();
        });
    }
  }

  return (
    <>
      {loader && <Loader/>}
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
              <label htmlFor="username">Username *</label>
              <input
                ref={usernameRef}
                type="text"
                id="username"
                placeholder="Username ni kiriting"
              />
              <label htmlFor="login">Email *</label>
              <input
                ref={loginRef}
                type="text"
                id="login"
                placeholder="Email ni kiriting"
              />
              <label htmlFor="password">Password *</label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                placeholder="Password ni kiriting"
              />

              <label htmlFor="repassword">Return Password</label>
              <input
                ref={repasswordRef}
                type="password"
                id="repassword"
                placeholder="Parolingizni kiriting"
              />

              <button>Kirish</button>
            </form>
            <p className={style.link}>
              Ro'yhatdan o'tgan bo'lsangiz <Link to="/signin">Sign In</Link>
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
