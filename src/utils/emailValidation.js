export const emailValidation = (email) => {
  if (
    email.match(
      /^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
    )
  ) {
    return true
  } else {
    return false
  }
};