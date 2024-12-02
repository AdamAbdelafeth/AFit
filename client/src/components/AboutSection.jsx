import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <Container>
      <Title>About A-Fit</Title>
      <Paragraph>
        A-Fit is your ultimate destination for personalized fitness training and gym guidance. We're committed to helping you achieve your fitness goals and live a healthier, happier life.
      </Paragraph>
      <Features>
        <Feature>
          <FeatureIcon>💪</FeatureIcon>
          <FeatureTitle>Personalized Training Plans</FeatureTitle>
          <FeatureDescription>Our expert trainers will create a tailored workout plan that suits your fitness level, goals, and preferences.</FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon>🏋️‍♀️</FeatureIcon>
          <FeatureTitle>State-of-the-Art Equipment</FeatureTitle>
          <FeatureDescription>Train with the latest fitness equipment in our modern and well-maintained gym facilities.</FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon>🏆</FeatureIcon>
          <FeatureTitle>Expert Guidance</FeatureTitle>
          <FeatureDescription>Benefit from the knowledge and support of our experienced trainers who will motivate and guide you every step of the way.</FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon>👥</FeatureIcon>
          <FeatureTitle>Supportive Community</FeatureTitle>
          <FeatureDescription>Join a community of like-minded individuals who share your fitness journey and offer encouragement and motivation.</FeatureDescription>
        </Feature>
        <Feature>
          <FeatureIcon>⏱️</FeatureIcon>
          <FeatureTitle>Flexible Scheduling</FeatureTitle>
          <FeatureDescription>Choose training times that fit your busy schedule and lifestyle.</FeatureDescription>
        </Feature>
      </Features>
      <CallToAction>
        <Link to="/signup">
          <Button>Join A-Fit Today</Button>
        </Link>
      </CallToAction>
      <ImageContainer>
        <Image src={require('../utils/Images/aboutimage.jpg')} alt="A-Fit gym image" />
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  background-image: url('/images/aboutimage.jpg'); /* Replace with your image path */
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;   

  justify-content: center;
  align-items: center;   

  padding: 40px;
`;

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  color: #333; /* Dark text color */
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 40px;
  color: #666; /* Lighter text color */
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Feature = styled.div`
  width: 300px;
  margin-bottom: 40px;
  text-align: left;
  border: 1px solid #ccc; /* Border around feature */
  padding: 20px;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Shadow effect */
`;

const FeatureIcon = styled.span`
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333; /* Darker title color */
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #666; /* Lighter description color */
`;

const CallToAction = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px; /* Rounded button corners */
`;

const ImageContainer = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px; /* Rounded image corners */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Shadow effect */
`;

export default AboutSection;
