import React from "react";

export function responseAdaptor(error) {
  return {
    message:
      error?.response.data ||
      error?.response.statusText ||
      error?.message ||
      "something went wrong",
    status: error?.response.status || -1,
  };
}
