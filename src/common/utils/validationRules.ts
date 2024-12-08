import { validateProps } from "../../common/types";

export default function validate(values: validateProps) {
  let errors = {} as validateProps;

  if (!values.name) {
    errors.name = "Поле ФИО не заполненно";
  }
  if (!values.email) {
    errors.email = "Поле Email не заполнено";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Адрес электронной почты недействителен";
  }
  if (!values.message) {
    errors.message = "Поле сообщение не заполнено";
  }
  return errors;
}
