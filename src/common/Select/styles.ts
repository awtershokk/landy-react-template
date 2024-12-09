import styled from "styled-components";

export const Container = styled("div")`
  display: inline-block;
  width: 100%;
  padding: 10px 5px;
`;

export const StyledSelect = styled("select")`
    width: 100%;
    padding: 8px;
    font-size: 0.875rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    appearance: none;
    cursor: pointer;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

export const Result = styled.div`
    margin-top: 20px;
    font-size: 1rem;
    font-weight: bold;
    color: #333;
`;
