// src/components/ContactSection.js
import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../utils/Images/FitnessBackground.png';

const ContactContainer = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto; /* Center the container */
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
`;

const ContactInfo = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  font-size: 16px;
  margin: 10px 0;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover}; /* Add a hover effect */
  }
`;

const ContactSection = () => {
  return (
    <ContactContainer>
      <Title>Contact Us </Title>
      <ContactInfo>If you have any questions, feel free to reach out to us at:</ContactInfo>
      <ContactInfo>Email: bahrcr7@gmail.com</ContactInfo>
      <ContactInfo>Phone: (+20) 1205484798</ContactInfo>
      <ContactInfo>Address: Cairo, EGYPT</ContactInfo>
      <ContactButton href="mailto:bahrcr7@gmail.com">Email Us</ContactButton>
    </ContactContainer>
  );
};

export default ContactSection;
