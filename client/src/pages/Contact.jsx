import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.bg};
`;

const Title = styled.h2`
    color: ${({ theme }) => theme.text_primary};
    text-align: center;
`;

const ContactInfo = styled.p`
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
`;

// ContactSection component definition
const ContactSection = () => {
    return (
        <ContactContainer>
        <Title>Contact Us</Title>
        <ContactInfo>
            If you have any questions, feel free to reach out to us at:
        </ContactInfo>
        <ContactInfo>Email: support@example.com</ContactInfo>
        <ContactInfo>Phone: (123) 456-7890</ContactInfo>
        <ContactInfo>Address: 123 Fitness St, Health City, HC 12345</ContactInfo>
        </ContactContainer>
    );
};

export default ContactSection;
