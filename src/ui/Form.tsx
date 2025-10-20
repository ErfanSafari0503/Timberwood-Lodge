import React from "react";
import styled, { css } from "styled-components";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  variant?: "modal" | "regular";
}

const StyledForm = styled.form<FormProps>`
  ${(props) =>
    props.variant !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.variant === "modal" &&
    css`
      width: 80rem;
    `}


overflow: hidden;
  font-size: 1.4rem;
`;

const Form: React.FC<FormProps> = ({
  variant = "regular",
  children,
  ...rest
}) => (
  <StyledForm variant={variant} {...rest}>
    {children}
  </StyledForm>
);

export default Form;
