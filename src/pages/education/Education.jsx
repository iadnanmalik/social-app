import React from "react";
import { useFormik } from "formik";
import { useEffect, useState, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as Yup from "yup";
export const Education = () => {
  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
    },
    validationSchema: Yup.object({
      startDate: Yup.date()
        .required("This field is required")
        .min(6, "Password must be atleast 6 characters"),
    }),

    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <DatePicker
        selected={formik.startDate}
        value={formik.values.startDate}
        {...formik.getFieldProps("startDate")}
        name="startDate"
        onChange={(date) => formik.setFieldValue("startDate", date)}
      />
      <button type="submit">insert item</button>
    </form>
    // <div>Hey</div>
  );
};
