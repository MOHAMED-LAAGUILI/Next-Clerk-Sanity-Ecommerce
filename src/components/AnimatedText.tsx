import React from 'react';

interface AnimatedTextProps {
  text: string;
  width?: string;  // Optional width property
  height?: string; // Optional height property
  size?: string;   // Optional font size property
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, width = '100%', height = '100%', size = '40px'}) => {
  // Set the initial theme when the component mounts


  return (
    <div className="wrapper">
      <svg className="logoanimated" width={width} height={height}>
        <text x="50%" y="50%" dy=".35em" textAnchor="middle" style={{ fontSize: size }}>
          {text}
        </text>
      </svg>

      <style>{`
    
        :root {
          --bg-color: #EF4444; 
          --text-color: #2563EB;
          --stroke-color: #FF5A1F;
          --stroke-hover-color: #EF4444;
        }

        .logoanimated {
          font-family: "Russo One", sans-serif;
          width: 100%;
          height: 100%;
        }

        .logoanimated text {
          animation: stroke 5s infinite alternate;
          stroke-width: 1;
          stroke: var(--stroke-color);
          font-size: ${size};
        }

        @keyframes stroke {
          0% {
            fill: rgba(72,138,204,0);
            stroke: var(--stroke-color);
            stroke-dashoffset: 25%; 
            stroke-dasharray: 0 50%; 
            stroke-width: 1;
          }
          70% { 
            fill: rgba(72,138,204,0); 
            stroke: var(--text-color); 
          }
          80% { 
            fill: rgba(72,138,204,0); 
            stroke: var(--stroke-hover-color); 
            stroke-width: 1; 
          }
          100% {
            fill: var(--text-color); 
            stroke: rgba(54,95,160,0);
            stroke-dashoffset: -25%; 
            stroke-dasharray: 50% 0; 
            stroke-width: 0;
          }
        }

        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 4vh;
        }
      `}</style>
    </div>
  );
};

export default AnimatedText;
