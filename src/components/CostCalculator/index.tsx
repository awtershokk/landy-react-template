import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import Block from "../Block";
import Select from "../../common/Select";
import { ContactContainer, FormGroup, Span, Result } from "./styles";

const CostCalculator = ({ title, content, id, t }: ContactProps) => {
    const { values, errors, handleChange, handleSubmit } = useForm(validate);

    const calculateCost = () => {
        const serviceType = values.serviceType as "basic" | "premium" | "consulting"; // Явное приведение типа
        const additionalOptions = values.additionalOptions === "yes" ? 500000 : 0; // Дополнительные услуги
        const projectType = values.projectType || "small";
        const materialType = values.materialType || "standard";
        const urgency = values.urgency === "yes" ? 1000000 : 0; // Срочность

        // Базовая стоимость услуг
        const baseCosts: Record<"basic" | "premium" | "consulting", number> = {
            basic: 1000000, // 1 млн
            premium: 3000000, // 3 млн
            consulting: 500000, // 500 тыс.
        };

        const baseCost = baseCosts[serviceType] || 0;

        // Множители для проекта и материалов
        const projectMultiplier = projectType === "large" ? 2 : projectType === "medium" ? 1.5 : 1;
        const materialMultiplier = materialType === "premium" ? 1.5 : 1;

        // Итоговая стоимость
        return (baseCost + additionalOptions) * projectMultiplier * materialMultiplier + urgency;
    };


    const ValidationType = ({ type }: ValidationTypeProps) => {
        const ErrorMessage = errors[type as keyof typeof errors];
        return <Span>{ErrorMessage}</Span>;
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
                                <Select
                                    name="Тип услуги"
                                    placeholder="Выберите тип услуги"
                                    options={[
                                        { label: "Базовая услуга", value: "basic" },
                                        { label: "Премиум услуга", value: "premium" },
                                        { label: "Консалтинг", value: "consulting" },
                                    ]}
                                    value={values.serviceType || ""}
                                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLSelectElement>)}
                                />
                            </Col>
                            <Col span={24}>
                                <Select
                                    name="Дополнительные опции"
                                    placeholder="Дополнительные опции"
                                    options={[
                                        { label: "Нет", value: "no" },
                                        { label: "Да", value: "yes" },
                                    ]}
                                    value={values.additionalOptions || ""}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col span={24}>
                                <Select
                                    name="Тип проекта"
                                    placeholder="Тип проекта"
                                    options={[
                                        { label: "Малый", value: "small" },
                                        { label: "Средний", value: "medium" },
                                        { label: "Крупный", value: "large" },
                                    ]}
                                    value={values.projectType || ""}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col span={24}>
                                <Select
                                    name="Тип материала"
                                    placeholder="Тип материала"
                                    options={[
                                        { label: "Стандартный", value: "standard" },
                                        { label: "Премиум", value: "premium" },
                                    ]}
                                    value={values.materialType || ""}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col span={24}>
                                <Select
                                    name="urgency"
                                    placeholder="Срочность"
                                    options={[
                                        { label: "Нет", value: "no" },
                                        { label: "Да", value: "yes" },
                                    ]}
                                    value={values.urgency || ""}
                                    onChange={handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <Result>
                            <strong>Ориентировочная стоимость:</strong> {calculateCost().toLocaleString()} ₽
                        </Result>
                    </Slide>
                </Col>
            </Row>
        </ContactContainer>
    );
};

export default withTranslation()(CostCalculator);
