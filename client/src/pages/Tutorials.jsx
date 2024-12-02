import React from 'react';
import himage from "../utils/Images/h.png";


function TextPage() {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '10px',
    
    };

    const instructionsStyle = {
        Weigh: '100vh',
        backgroundColor: '#2a9d8f',
        padding: '60px',
        maxWidth: '600px',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        overflowY: 'auto',
        
    };

    const headingStyle = {
        marginBottom: '10px',
        fontSize: '3em', 
        backgroundColor: '#457b9d',
    };

    const imageStyle = {
        maxWidth: '100%',
        marginBottom: '20px',
    };
    const scrollDownStyle = {
        position: 'absolute',
        bottom: '20px',
        padding: '10px',
        right: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '100px',
        fontSize: '2em',
    };

    return (
        <div style={pageStyle}>
            <img src={himage} style={imageStyle} alt="AFit Exercise" />
            <div style={instructionsStyle} className="instructions">
                <div style={scrollDownStyle}>↓</div>
                <h2 style={headingStyle}>How To Use AFit</h2>
                <ol>
                    <li>
                        You can add the muscle you want to exercise, such as:
                        <ul>
                            <li>#Legs</li>
                            <li>#Shoulders</li>
                            <li>#Backs</li>
                            <li>#ABS</li>
                            <li>Add anything you want</li>
                            <li>(#) must be placed before the word.</li>
                        </ul>
                    </li>
                    <li>
                        Add the type of exercise machine you want to exercise this muscle with, such as:
                        <ul>
                            <li>-Leg press</li>
                            <li>-Bench press</li>
                            <li>-Shoulder press</li>
                            <li>-Back Extension</li>
                            <li>Add anything you want</li>
                            <li>(-) must be placed before the word</li>
                        </ul>
                    </li>
                    <li>
                        Add exercises and groups as shown in the picture.
                        <ul>
                            <li>-5 sets X 15 reps</li>
                            <li>Add anything you want</li>
                            <li>(-) must be placed before the word</li>
                        </ul>
                    </li>
                    <li>
                        Add the weight as shown in the picture.
                        <ul>
                            <li>-30 Kg</li>
                            <li>Add anything you want</li>
                            <li>(-) must be placed before the word</li>
                        </ul>
                    </li>
                    <li>
                        Add the Time as shown in the picture.
                        <ul>
                            <li>-10 min</li>
                            <li>Add anything you want</li>
                            <li>(-) must be placed before the word</li>
                            
                        </ul>
                        <div style={scrollDownStyle}>↓</div>
                    </li>
                    
                </ol>
                
            </div>
            
        </div>
    );
}

export default TextPage;
