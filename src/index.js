import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import { fetchAsyncData } from "./fakeApi";

const data = fetchAsyncData();

const HomePage = () => {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <DisplayUserData />
    </Suspense>
  );
};

const DisplayUserData = () => {
  const userData = data.userData.read();
  return (
    <ul>
      {userData.map(data => (
        <li key={data.name}>
          Name: {data.name}, Age: {data.age}
        </li>
      ))}
    </ul>
  );
};

ReactDOM.render(<HomePage />, document.getElementById("root"));
