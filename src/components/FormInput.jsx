import { Fragment } from "react/cjs/react.development";
import styled from "styled-components";
import { StyledInput, Errors } from "../styledComponents/usedStyled";
export const FormInput = ({ showError, error, ...rest }) => {
  return (
    <Fragment>
      <StyledInput {...rest} />
      {showError ? <Errors>{error}</Errors> : null}
    </Fragment>
  );
};
