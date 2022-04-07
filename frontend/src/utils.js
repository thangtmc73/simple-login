export function validateUserName(username){
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(username);
}

export function validatePassword(password) {
  return password && password.length;
}