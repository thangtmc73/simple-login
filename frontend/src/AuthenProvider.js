import { useState } from "react";
import AuthenContext from "./AuthenContext";
import login from "./api/login";

function AuthenProvider({ children }) {
  let [user, setUser] = useState(null);

  function signIn({ userName, password }, successCallback, errorCallback) {
    return login({ userName, password }).then(resp => resp.json()).then(resp => {
      const { returncode } = resp;
      if (returncode === 1) {
        const { username, token } = resp;
        setUser({ username, token });
        successCallback && successCallback(resp);
        return;
      }
      const { returnmessage } = resp;
      errorCallback && errorCallback(returnmessage);
    });
  }

  function signOut(callback) {
    return new Promise(resolve => {
      resolve();
      setUser(null);
      callback();
    })
  }

  return (
    <AuthenContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthenContext.Provider>
  );
}

export default AuthenProvider