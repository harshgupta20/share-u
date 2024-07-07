import React from "react";

const Badge = ({ text, type }) => {
  return (
    <>
      {type == "success" ? (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          {text}
        </span>
      ) : type == "warning" ? (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
          {text}
        </span>
      ) : (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
          {text}
        </span>
      )}
    </>
  );
};

export default Badge;
