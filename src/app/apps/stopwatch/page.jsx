import PageView from "@/components/SharedComponents/PageView";
import Stopwatchwindow from "@/components/Stopwatch/StopwatchWindow";
import React from "react";

function page() {
  return <PageView window={<Stopwatchwindow />}></PageView>;
}

export default page;
