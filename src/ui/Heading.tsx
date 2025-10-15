import styled, { css } from "styled-components";

interface HeadingProps {
  $level?: "h1" | "h2" | "h3";
}

const Heading = styled.h1<HeadingProps>`
  line-height: 1.4;

  ${({ $level }) => {
    switch ($level) {
      case "h1":
        return css`
          font-size: 3rem;
          font-weight: 600;
        `;
      case "h2":
        return css`
          font-size: 2rem;
          font-weight: 600;
        `;
      case "h3":
        return css`
          font-size: 2rem;
          font-weight: 500;
        `;
      default:
        return css`
          font-size: 1.6rem;
          font-weight: 400;
        `;
    }
  }}
`;

Heading.defaultProps = {
  as: "h1",
  $level: "h1",
};

export default Heading;
