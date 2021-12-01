import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
require('dotenv').config()

const template= process.env.REACT_APP_TEMPLATE_ID;
const userId= process.env.REACT_APP_USER_ID;

export const useContact = (callback, validate) => {
  const [values, setValues] = useState({
    email: "",
    emailConf: "",
    userName: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    setErrors(validate(values));

    if (Object.keys(validate(values)).length === 0) {
      emailjs.sendForm("gmail", template, e.target, userId).then(
        (result) => {
          console.log(result);
        },
        (errors) => {
          console.log(errors);
        }
      );

      e.target.reset();
      localStorage.clear();
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};