import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import default_image from './default_image.svg';


const ImageGenerator = () => {
    const [image_url, setImage_url] = useState(default_image);
    const inputRef = useRef(null);

    const generateImage = async () => {
        if (inputRef.current.value === "") {
            return;
        }

        try {
            const response = await fetch(
                "https://api.edenai.run/v2/image/generation",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmQ4ZWQwOWUtOTgwNi00MzIwLTk4ZDktZWFiMzRiMTBjMGFhIiwidHlwZSI6ImFwaV90b2tlbiJ9.1xCW_cV9QhqUXxLYhwdNB7hCpoErQT1HceHBHXqs_BE",
                        "User-Agent": "Chrome",
                    },
                    body: JSON.stringify({
                        prompt: inputRef.current.value,
                        n: 1,
                        size: "512x512",
                    }),
                }
            );

            const data = await response.json();
            console.log(data); // Log the response data
            // Assuming the API returns the URL of the generated image, update state
            setImage_url(data.url);
        } catch (error) {
            console.error('Error generating image:', error);
        }
    };

    return (
        <span className="border border-secondary">
            <div className="second">
                <h1>AI IMAGE <span className="zero">GENERATOR</span></h1>
                <div className='third'><h3>Generate a <span className='zero'>new image</span></h3></div>
            </div>
            
            <img src={default_image=="/"?(default_image):(image_url)} className="rounded float-right" alt="Default Image" className="image" />
            
            <div className="placeholder-container">
                <input className="form-control" ref={inputRef} placeholder='Enter the description of image you want and we will generate it' />
            </div>
            
            <div>
                <button className="glow-on-hover" type="button" style={{ marginTop: 40 }} onClick={generateImage}>Click Me For Image</button>
            </div>
        </span>
    );
}

export default ImageGenerator;
