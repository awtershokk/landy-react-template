import { validateProps } from "../../common/types";

export default function validate(values: validateProps) {
  let errors = {} as validateProps;

  if (!values.name) {
    errors.name = "";
  }
  if (!values.email) {
    errors.email = "";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Адрес электронной почты недействителен";
  }
  if (!values.message) {
    errors.message = "";
  }
  return errors;
}
