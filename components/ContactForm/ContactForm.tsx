"use client";
import { Formik, Form, useField, useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

interface ContactFormProps {
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
const { submitCount } = useFormikContext();
const [field, meta] = useField(name);
const hasError =
Boolean(meta.error) && (submitCount > 0 || (meta.touched && field.value !== ""));
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
            viewBox="0 0 24 24"
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

export default function ContacForm({ camperId }: ContactFormProps) {
  const router = useRouter();

  const handleSubmit = (values: FormValues) => {
   const params = new URLSearchParams({
    name: values.name.trim(),
    email: values.email.trim(),
  });
  router.push(`/catalog/${camperId}/reviews?${params.toString()}`);;
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
            <Button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}