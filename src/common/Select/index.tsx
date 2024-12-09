import React from "react";
import { withTranslation } from "react-i18next";
import { Container, StyledSelect } from "./styles";
import { Label } from "../TextArea/styles";
import { SelectProps } from "./types";

const Select = ({ name, placeholder, options, value, onChange, t }: SelectProps) => (
    <Container>
        <Label htmlFor={name}>{t(name)}</Label>
        <StyledSelect name={name} id={name} value={value || ""} onChange={onChange}>
            <option value="" disabled>
                {t(placeholder)}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {t(option.label)}
                </option>
            ))}
        </StyledSelect>
    </Container>
);

export default withTranslation()(Select);