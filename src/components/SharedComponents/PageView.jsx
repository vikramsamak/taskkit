import React from "react";

function PageView({ window }) {
  return (
    <main className="grow flex justify-center items-center py-6 px-6">
      {window}
    </main>
  );
}

export default PageView;
