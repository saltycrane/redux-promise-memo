import React from "react";
import styled from "styled-components";

const Select_ = ({ label, onChange, options, value }) => (
  <React.Fragment>
    <Label>{label}</Label>
    <Select onChange={onChange} value={value}>
      {options.map(opt => (
        <option key={opt} value={opt.startsWith("All") ? "" : opt}>
          {opt}
        </option>
      ))}
    </Select>
  </React.Fragment>
);

export default Select_;

const Label = styled.div`
  font-size: 14;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Select = styled.select`
  -webkit-appearance: none;
  background-color: white;
  border-radius: 2px;
  font-size: 16px;
  font-weight: 300;
  height: calc(2.25em + 2px);
  margin-bottom: 20px;
  padding: 0.5em 1.5em 0.5em 0.5em;
  width: 100%;
`;
