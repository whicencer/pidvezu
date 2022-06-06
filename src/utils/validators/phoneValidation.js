// TODO
// Refactor validation

export const phoneValidation = (phone) => {
  if(phone.match(/\+38\d{3}\d{3}\d{2}\d{2}/)) {
    return true
  } else {
    return false
  }
}