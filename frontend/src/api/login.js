import queryString from "query-string";

const URL = "http://localhost:4000/api/user/login"

export default function login({ userName, password }) {
  return fetch(
    URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
      },
      body: queryString.stringify({
        username: userName,
        password: password,
      })
    }
  );
}
