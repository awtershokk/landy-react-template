import { useState } from "react";
import { notification } from "antd";

const fieldMapping = {
  "Тип услуги": 'serviceType',
  "Дополнительные опции": 'additionalOptions',
  "Тип проекта": 'projectType',
  "Тип материала": 'materialType',
  "Срочность": 'urgency',
};

interface IValues {
  name: string;
  email: string;
  message: string;
  serviceType: string;
  quantity: string;
  additionalOptions: string;
  projectType: string;
  materialType: string;
  urgency: string;
}

const initialValues: IValues = {
  name: "",
  email: "",
  message: "",
  serviceType: "",
  quantity: "",
  additionalOptions: "",
  projectType: "",
  materialType: "",
  urgency: "",
};

export const useForm = (validate: (values: IValues) => IValues) => {
  const [formState, setFormState] = useState<{
    values: IValues;
    errors: IValues;
  }>({
    values: { ...initialValues },
    errors: { ...initialValues },
  });

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = formState.values;
    const errors = validate(values);
    setFormState((prevState) => ({ ...prevState, errors }));

    if (Object.keys(errors).length === 0) {
      notification["success"]({
        message: "Отлично",
        description: "Ваше сообщение отправлено!",
      });
    } else {
      notification["error"]({
        message: "Ошибка",
        description: "Проверьте правильность заполнения формы!",
      });
    }
  };

  const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    event.persist();
    const { name, value } = event.target;

    // Маппинг русских имен на английские ключи
    const englishName = fieldMapping[name as keyof typeof fieldMapping] || name;

    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [englishName]: value,
      },
      errors: {
        ...prevState.errors,
        [englishName]: "",
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
