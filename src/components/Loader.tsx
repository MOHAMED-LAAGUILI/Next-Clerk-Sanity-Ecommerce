"use client"
import React from "react";

interface LoaderProps {
    width?: string; // Optional, with default value
    height?: string; // Optional, with default value
    color?: string; // Optional, with default value
}

const Loader: React.FC<LoaderProps> = ({
  width = '50px',
  height = '50px',
  color = "#766DF4"
}) => {

  return (
    <div
      className="custom-loader"
      style={{
        width,
        height,
        '--loader-color': color, // Passing color as CSS variable
      } as React.CSSProperties} // Type assertion to satisfy TypeScript
    ></div>
  );
};

export default Loader;

<style>{`
  .custom-loader {
    display: grid;
    width: var(--width, 50px); /* Fall back to 50px if not defined */
    height: var(--height, 50px); /* Fall back to 50px if not defined */
  }

  .custom-loader::before,
  .custom-loader::after {    
    content: "";
    grid-area: 1/1;
    --c: radial-gradient(farthest-side, var(--loader-color) 92%, #0000);
    background: 
      var(--c) 50% 0, 
      var(--c) 50% 100%, 
      var(--c) 100% 50%, 
      var(--c) 0 50%;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    animation: s2 1s infinite;
  }

  .custom-loader::before {
    margin: 4px;
    filter: hue-rotate(45deg);
    background-size: 8px 8px;
    animation-timing-function: linear;
  }

  @keyframes s2 { 
    100% { transform: rotate(.5turn); }
  }
`}</style>
