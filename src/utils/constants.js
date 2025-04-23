export const BASE_URL = import.meta.env.PROD ? "/api" : "http://localhost:8000";

export const GENDER_OPTIONS = [
  { value: "", label: "-- Choose Gender --", disabled: true},
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Other" },
];
