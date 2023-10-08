import React from "react";
import error from "../../assets/image/error.svg";
export default function Notdound() {
  return (
    <div>
      <img src={error} alt="error" className="w-75 h-75 p-5" />
    </div>
  );
}
