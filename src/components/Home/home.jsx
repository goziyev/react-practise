import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import Confetti from "react-dom-confetti";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/signin");
    } else {
      setConfetti(true);
    }
  }, [navigate]);

  const confettiConfig = {
    angle: 90,
    spread: 200,
    startVelocity: 40,
    elementCount: 150,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    position: "absolute",
  };

  return (
    <div className={style.cardWrapper}>
      <Confetti active={confetti} config={confettiConfig} />
      <h2 className={style.title}>Asosiy sahifaga xush kelibsiz ✔</h2>
      <p className={style.link}>
        Qayta sinab ko'rish uchun
        <Link className={style.routerLink} to="/signin">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Home;
