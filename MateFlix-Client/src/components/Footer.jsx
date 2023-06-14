import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
    <footer className="footer">
      <div className="container">
        <p>
          Disclaimer: The content provided on this platform is for demonstration purposes only. It may not represent actual licensed content and should not be considered as such. All images, titles, and descriptions are placeholders.
        </p>
        <br/>
        <p>&copy; 2023 MateFlix.</p>
      </div>
    </footer>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
.footer{
    margin:1rem;
    text-align: center;
    .container{
        // margin:3rem;
    }
}
`;
