import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ContactProps } from "./types";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import { toast, ToastContainer } from "react-toastify";  // Правильный импорт ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

const Contact = ({ title, content, id, t }: ContactProps) => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const validateFields = () => {
    const errors: any = {};
    if (!values.name) errors.name = "Пожалуйста, введите ваше ФИО.";
    if (!values.email) errors.email = "Пожалуйста, введите ваш Email.";
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Неверный формат Email.";
    if (!values.message) errors.message = "Пожалуйста, введите ваше сообщение.";
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
    } else {
      setValues({
        name: "",
        email: "",
        message: "",
      });
      toast.success("Форма успешно отправлена!");
    }
  };

  return (
      <ContactContainer id={id}>
        <Row justify="space-between" align="middle">
          <Col lg={12} md={11} sm={24} xs={24}>
            <Slide direction="left" triggerOnce>
              <Block title={title} content={content} />
            </Slide>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Slide direction="right" triggerOnce>
              <FormGroup autoComplete="off" onSubmit={handleSubmit}>
                <Col span={24}>
                  <Input
                      type="text"
                      name="name"
                      placeholder="Ваше ФИО"
                      value={values.name}
                      onChange={handleChange}
                  />
                  {errors.name && <Span>{errors.name}</Span>}
                </Col>
                <Col span={24}>
                  <Input
                      type="text"
                      name="Электронная почта"
                      placeholder="Ваш Email"
                      value={values.email}
                      onChange={handleChange}
                  />
                  {errors.email && <Span>{errors.email}</Span>}
                </Col>
                <Col span={24}>
                  <TextArea
                      placeholder="Ваше сообщение"
                      value={values.message}
                      name="Сообщение"
                      onChange={handleChange}
                  />
                  {errors.message && <Span>{errors.message}</Span>}
                </Col>
                <ButtonContainer>
                  <Button name="submit">{t("Отправить")}</Button>
                </ButtonContainer>
              </FormGroup>
            </Slide>
          </Col>
        </Row>
        <ToastContainer />
      </ContactContainer>
  );
};

export default withTranslation()(Contact);
