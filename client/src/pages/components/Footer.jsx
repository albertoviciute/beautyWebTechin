import { styled } from "styled-components";

const StyledFooter = styled.footer`
  padding: 24px 16px;
  text-align: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>&copy; 2024 Beauty Web By Santa Albertovičiūtė </p>
    </StyledFooter>
  );
};

export default Footer;
