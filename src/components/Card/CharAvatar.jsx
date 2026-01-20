import React from "react";
import { getInitials } from "../../utils/helper";

function CharAvatar({ style, height, width, fullName }) {
  return (
    <div
      className={`${height || "h-12"} ${width || "w-12 "}  ${style || ""} flex items-center justify-center rounded-full text-gray-950 font-medium bg-gray-100 `}
    >
      {getInitials(fullName || "")}
    </div>
  );
}

export default CharAvatar;
