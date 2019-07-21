import React from "react";
import styled from "styled-components";

const FullWidthContainer = styled.div`
  width: 100%;
  text-align: right;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #7d4cdb;
`;

function Permalink(props) {
  return (
    <FullWidthContainer>
      <StyledLink
        href={`${window.location.origin}/files/${props.formattedFileName}`}
      >
        Permalink
      </StyledLink>
    </FullWidthContainer>
  );
}

export default Permalink;
