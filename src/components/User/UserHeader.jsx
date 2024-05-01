import React from "react";
import WindowHeader from "../SharedComponents/AppWindowHeader";
import { PROFILE } from "@/helpers/Constants";

function UserHeader() {
  return <WindowHeader windowName={PROFILE}></WindowHeader>;
}

export default UserHeader;
