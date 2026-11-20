import { useState } from "react";
import emailjs from "emailjs-com";

const template = import.meta.env.VITE_APP_TEMPLATE_ID;
const userId = import.meta.env.VITE_APP_USER_ID;

export const useContact = (callback, validate) => {
  const [values, setValues] = useState({
    email: "",
    emailConf: "",
    userName: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((previous) => ({
      ...previous,
      [name]: value
    }));

    setSubmitStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setSubmitStatus("");

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        "service_qvtrcvs",
        template,
        e.currentTarget,
        userId
      );

      setSubmitStatus("success");

      setValues({
        email: "",
        emailConf: "",
        userName: "",
        phone: "",
        message: ""
      });

      if (callback) {
        callback();
      }
    } catch (error) {
      console.error("Erreur EmailJS :", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting,
    submitStatus
  };
};
