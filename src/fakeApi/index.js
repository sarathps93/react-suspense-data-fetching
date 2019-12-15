import userData from "../lib/userList";

const fetchUserData = () => {
  return new Promise(resolve => setTimeout(() => resolve(userData), 3000));
};

export const fetchAsyncData = () => {
  const userData = fetchUserData();
  return {
    userData: wrapPromise(userData)
  }
}

function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}
