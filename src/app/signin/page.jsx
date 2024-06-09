import PageView from "@/components/SharedComponents/PageView";
import UserLoginForm from "@/components/User/UserLoginForm";
import React from "react";

function page() {
  return <PageView window={<UserLoginForm />}></PageView>;
}

export default page;
