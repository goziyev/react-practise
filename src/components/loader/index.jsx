import React from "react";
import './index.css'
export default function Loader() {


  return (
    <div>
      <div className="loading">
        <h1>Loading...</h1>
      </div>
      <div className="animation">
        {[...Array(13)].map((_, index) => (
          <span
            key={index}
            style={{
              "--i": 12 - index,
              "--a": index,
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}
