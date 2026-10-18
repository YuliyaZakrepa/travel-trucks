"use client";
import { FocusEvent } from "react";
import {
  Formik,
  Form,
  useField,
  useFormikContext,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { createBookingRequest } from "@/lib/api/bookings";
import css from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
  camperName?: string;
  initialName?: string;
  initialEmail?: string;
}

interface FormValues {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

const emptyValues: FormValues = {
  name: "",
  email: "",
  bookingDate: "",
  comment: "",
};

const todayString = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

const BookingSchema = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[^0-9]+$/, "Please enter your name.")
    .required("Please enter your name."),
  email: Yup.string()
    .trim()
    .email("Please enter your email.")
    .required("Please enter your email."),
  bookingDate: Yup.string()
    .required("Please choose a booking date.")
    .test(
      "not-in-past",
      "Date cannot be in the past.",
      (value) => !value || value >= todayString(),
    ),
  comment: Yup.string().max(500, "Comment is too long."),
});

interface TextFieldProps {
  name: keyof FormValues;
  placeholder: string;
  type?: string;
  multiline?: boolean;
  isDate?: boolean;
}

function TextField({
  name,
  placeholder,
  type = "text",
  multiline = false,
  isDate = false,
}: TextFieldProps) {
  const { submitCount } = useFormikContext();
  const [field, meta] = useField(name);
  const hasError =
    Boolean(meta.error) &&
    (submitCount > 0 || (meta.touched && field.value !== ""));
  const id = `booking-${name}`;

  const fieldClass = `${multiline ? css.textarea : css.input} ${
    hasError ? css.inputError : ""
  }`;

  return (
    <div className={css.fieldWrapper}>
      {multiline ? (
        <textarea
          {...field}
          id={id}
          placeholder={placeholder}
          rows={4}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={fieldClass}
        />
      ) : (
        <input
          {...field}
          id={id}
          type={isDate ? "text" : type}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={fieldClass}
          onFocus={
            isDate
              ? (e: FocusEvent<HTMLInputElement>) => (e.target.type = "date")
              : undefined
          }
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            field.onBlur(e);
            if (isDate && !e.target.value) e.target.type = "text";
          }}
        />
      )}

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
    <span id={`${id}-error`} className={css.error} role="alert">
      {meta.error}
    </span>
  </>
)}
    </div>
  );
}

export default function BookingForm({
  camperId,
  camperName,
  initialName = "",
  initialEmail = "",
}: BookingFormProps) {
  const initialValues: FormValues = {
    ...emptyValues,
    name: initialName,
    email: initialEmail,
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    // бекенд приймає лише name та email
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
    };

    try {
      await createBookingRequest(camperId, payload);
      toast.success("Your enquiry has been sent. We will contact you soon.");
      resetForm({ values: emptyValues });
    } catch {
      toast.error("Could not send your enquiry. Please try again.");
    }
  };

  return (
    <div className={css.formContainer}>
      <h3 className={css.formTitle}>Book your campervan now</h3>
      <p className={css.formSubtitle}>
        Tell us about your trip. We&apos;ll help you check availability
        {camperName ? ` for ${camperName}.` : "."}
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form} noValidate>
            <TextField name="name" placeholder="Name*" />
            <TextField name="email" type="email" placeholder="Email*" />
            <TextField name="bookingDate" placeholder="Booking date*" isDate />
            <TextField name="comment" placeholder="Comment" multiline />

            <p className={css.note}>
              * Required fields. Include your return date and any questions in
              the comment.
            </p>

            <Button
              type="submit"
              className={css.submitBtn}
              disabled={isSubmitting}
            >
              Send enquiry
            </Button>

            <p className={css.caption}>
              This is an enquiry, not a confirmed booking.
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}