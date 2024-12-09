import { useState } from "react";
import { notification } from "antd";

interface IValues {
  name: string;
  email: string;
  message: string;
  serviceType: string;
  quantity: string;
  additionalOptions: string;
  projectType: string; // Новое поле
  materialType: string; // Новое поле
  urgency: string; // Новое поле
}

const initialValues: IValues = {
  name: "",
  email: "",
  message: "",
  serviceType: "",
  quantity: "",
  additionalOptions: "",
  projectType: "", // Новое поле
  materialType: "", // Новое поле
  urgency: "", // Новое поле
};

export const useForm = (validate: (values: IValues) => IValues) => {
  const [formState, setFormState] = useState<{
    values: IValues;
    errors: Partial<IValues>; // Ошибки могут быть не у всех полей
  }>({
    values: { ...initialValues },
    errors: {},
  });

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = formState.values;
    const errors = validate(values);
    setFormState((prevState) => ({ ...prevState, errors }));
      notification["success"]({
        message: "Отлично",
        description: "Ваше сообщение отправлено!",
      });

  };

  const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    event.persist();
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values: formState.values,
    errors: formState.errors,
  };
};
