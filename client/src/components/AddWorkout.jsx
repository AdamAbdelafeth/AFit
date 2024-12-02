import React, { useState } from "react";
import { Link } from "react-router-dom"
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";

const Card = styled.div`
    flex: 1;
    min-width: 280px;
    padding: 24px;
    border: 1px solid ${({ theme }) => theme.text_primary + 20};
    border-radius: 14px;
    box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
    display: flex;
    flex-direction: column;
    gap: 6px;
    @media (max-width: 600px) {
        padding: 16px;
    }
`;
const Title = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) => theme.primary};
    @media (max-width: 600px) {
        font-size: 14px;
    }
`;
const linkStyle = {
    color: 'red',  // Change link color
    textDecoration: 'none',  // Remove underline
    border: '1px #ccc',
    borderRadius: '40px',
    fontSize: '15px',
    width: '50%'
};

const inputStyle = {
    width: '100%',  // Make the input fill the container width
    padding: '10px',  // Add padding
    fontSize: '16px',  // Set font size
    border: '1px solid #ccc',  // Add border
    borderRadius: '4px'  // Add border radius
};
const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
    return (
        <Card>
            <Title>Add New Workout</Title>
            <Link to="/tutorials" style={linkStyle}>
                How To Use
            </Link> {/* Use Link for internal navigation */}
            <TextInput
                style={inputStyle}
                label="Workout"
                textArea
                rows={10}
                placeholder={`Enter in this format:

#Category
-Workout Name
-Sets
-Reps
-Weight
-Duration`}
                value={workout}
                handelChange={(e) => setWorkout(e.target.value)}
            />
            <Button
                text="Add Workout"
                small
                onClick={() => addNewWorkout()}
                isLoading={buttonLoading}
                isDisabled={buttonLoading}
            />
        </Card>
        
    );
};

export default AddWorkout;
