"use client";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import css from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}
interface FormValues {
  name: string;
  email: string;
}

const initialValues: FormValues = { name: "", email: "" };

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[^0-9]+$/, "Please enter your name.")
    .required("Please enter your name."),
  email: Yup.string()
    .trim()
    .email("Please enter your email.")
    .required("Please enter your email."),
});

interface TextFieldProps {
  name: keyof FormValues;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}

function TextField({
  name,
  placeholder,
  type = "text",
  autoComplete,
}: TextFieldProps) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);
  const id = `booking-${name}`;

  return (
    <div className={css.field}>
      <input
        {...field}
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={`${css.input} ${hasError ? css.inputError : ""}`}
      />

      {hasError && (
        <>
          <label htmlFor={id} className={css.floatingLabel}>
            {placeholder}
          </label>
          <svg
            className={css.errorIcon}
            width={24}
            height={24}
            // viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 7v6M12 16.5v.01" />
          </svg>
          <p id={`${id}-error`} className={css.errorText} role="alert">
            {meta.error}
          </p>
        </>
      )}
    </div>
  );
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    // TODO: надіслати на POST /campers/{camperId}/booking-requests
    console.log(camperId, values);
    resetForm();
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form} noValidate>
            <TextField name="name" placeholder="Name*" autoComplete="name" />
            <TextField
              name="email"
              type="email"
              placeholder="Email*"
              autoComplete="email"
            />
            <button
              type="submit"
              className={css.button}
              disabled={isSubmitting}
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}