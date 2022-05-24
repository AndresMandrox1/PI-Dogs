/* eslint-disable no-useless-escape */
let validate = (e, Breed, errors) => {
  if (e.target.name === "max_height") {
    if (parseInt(e.target.value) <= parseInt(Breed.min_height)) {
      errors.max_height = "The Max value should be highter than Min value";
      errors.disable = "disabled";
    } else {
      delete errors.max_height;
    }
  }
  if (e.target.name === "max_weight") {
    if (parseInt(e.target.value) <= parseInt(Breed.min_weight)) {
      errors.max_weight = "The Max value should be highter than Min value";
      errors.disable = "disabled";
    } else {
      delete errors.max_weight;
    }
  }

  if (e.target.name === "img") {
    var pattern = new RegExp(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (!pattern.test(e.target.value)) {
      errors.img = "Enter valid url";
      errors.disable = "disabled";
    } else {
      delete errors.img;
    }
  }

  if (Object.keys(errors).length === 1) {
    errors.disable = "";
  }
  
  return errors;
};
export default validate;
