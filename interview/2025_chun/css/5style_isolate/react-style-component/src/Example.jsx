import React from 'react';
import styled from 'styled-components';

const ExampleComponent = () => {
  return (
    <StyledExample>
      <p>这是一个带有 styled-components 样式的示例</p>
    </StyledExample>
  );
};

const StyledExample = styled.div`
  background-color: lightblue;

  p {
    color: red;
  }
`;

export default ExampleComponent;