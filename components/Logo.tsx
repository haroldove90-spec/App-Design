
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-[55px]" }) => {
  return (
    <img 
      src="https://appdesignmex.com/wp-content/uploads/2025/10/App-Design-Nueva-Imagen-05.png" 
      alt="App Design Logo" 
      className={`${className} w-auto object-contain`}
    />
  );
};

export default Logo;
