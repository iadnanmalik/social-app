import styled from "styled-components";

export const Spinner = styled.div`
  display: block;
  position: fixed;
  z-index: 1031; /* High z-index so it is on top of the page */
  top: 50%;
  right: 50%; /* or: left: 50%; */
`;
export const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 10px;
  color: #808080;
  font-weight: 300;
`;
export const Errors = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 12px;
  color: red;
  font-weight: 300;
`;
export const StyledInput = styled.input`
  width: 75%;
  max-width: 350px;
  min-width: 150px;
  height: 50px;
  border: none;
  margin-left: 30px;

  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  transition: all 0.2s ease-in;
  &:hover {
    transform: translateY(-3px);
  }
`;
