"use client";
import { getFilters } from "@/lib/api/filters";
import { useQuery } from "@tanstack/react-query";
import { Field, Formik, Form } from "formik";
import {
  CAMPER_FORM_LABELS,
  TRANSMISSION_LABELS,
  ENGINE_LABELS,
} from "@/types/constants";
import css from "./FilterPanel.module.css";
import { CamperForm, Transmission, Engine } from "@/types/filters";
import { CampersFilters } from "@/types/campers";

interface FilterPanelProps {
  onSearch: (filters: CampersFilters) => void;
}
interface FormValues {
  location: string;
  form: string;
  transmission: string;
  engine: string;
}
const initialValues: FormValues = {
  location: "",
  form: "",
  transmission: "",
  engine: "",
};

export default function FilterPanel({ onSearch }: FilterPanelProps) {
  const { data } = useQuery({
    queryKey: ["filters"],
    queryFn: () => getFilters(),
  });
  const forms = data?.forms;
  const transmissions = data?.transmissions;
  const engines = data?.engines;

  const handlesubmit = (values: FormValues) => {
    onSearch({
      location: values.location.trim() || undefined,
      form: (values.form || undefined) as CamperForm | undefined,
      transmission: (values.transmission || undefined) as
        | Transmission
        | undefined,
      engine: (values.engine || undefined) as Engine | undefined,
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handlesubmit}>
      {({ resetForm }) => (
        <Form className={css.form}>
          <label htmlFor="locationInput" className={css.inputLabel}>
            Location
          </label>
          <Field
            type="text"
            name="location"
            id="locationInput"
            placeholder="City"
            className={css.input}
          />

          <div className={css.radioContainer}>
            <h3 className={css.filterTitle}>Filters</h3>

            <span className={css.radioLegend} id="camper-form-title">
              Camper form
            </span>
            <div
              className={css.radioFieldset}
              role="group"
              aria-labelledby="camper-form-title"
            >
              {forms?.map((form) => (
                <label key={form} className={css.radioLabel}>
                  <Field
                    type="radio"
                    className={css.radioInput}
                    name="form"
                    value={form}
                  />
                  {CAMPER_FORM_LABELS[form]}
                </label>
              ))}
            </div>

            <span className={css.radioLegend} id="engine-title">
              Engine
            </span>
            <div
              className={css.radioFieldset}
              role="group"
              aria-labelledby="engine-title"
            >
              {engines?.map((engine) => (
                <label key={engine} className={css.radioLabel}>
                  <Field
                    type="radio"
                    className={css.radioInput}
                    name="engine"
                    value={engine}
                  />
                  {ENGINE_LABELS[engine]}
                </label>
              ))}
            </div>

            <span className={css.radioLegend} id="transmission-title">
              Transmission
            </span>
            <div
              className={css.radioFieldset}
              role="group"
              aria-labelledby="transmission-title"
            >
              {transmissions?.map((transmission) => (
                <label key={transmission} className={css.radioLabel}>
                  <Field
                    type="radio"
                    name="transmission"
                    value={transmission}
                    className={css.radioInput}
                  />
                  {TRANSMISSION_LABELS[transmission]}
                </label>
              ))}
            </div>
          </div>
          <div className={css.buttonContainer}>
            <button type="submit" className={css.searchButton}>
              Search
            </button>
            <button
              type="button"
              className={css.clearButton}
              onClick={() => {
                resetForm();
                onSearch({});
              }}
            >
              Clear filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
