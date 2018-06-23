import React from "react";

const Spinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: 60,
    }}
  >
    <style>
      {`
.loader,
.loader:after {
  border-radius: 50%;
  width: 6em;
  height: 6em;
}
.loader {
  font-size: 10px;
  position: relative;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
      `}
    </style>
    <div className="loader" />
  </div>
);

export default Spinner;
