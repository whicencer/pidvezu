export const emailValidation = (email, callback, rejected) => {
  if (
    email.match(
      /^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
    )
  ) {
    callback()
  } else {
    rejected()
  }
};