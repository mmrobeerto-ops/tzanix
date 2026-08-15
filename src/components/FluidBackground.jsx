import React from 'react';
import './FluidBackground.css';

const FluidBackground = () => {
  return (
    <div className="fluid-container absolute top-0 left-0 w-full h-full z-0 overflow-hidden opacity-30 pointer-events-none">
      <div className="fluid-gradient"></div>
    </div>
  );
};

export default FluidBackground;
