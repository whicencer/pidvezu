export const phoneValidation = (phone, callback, rejected) => {
  if(phone.length && phone.match(/\+38\d{3}\d{3}\d{2}\d{2}/)) {
    callback()
  } else {
    rejected()
  }
}