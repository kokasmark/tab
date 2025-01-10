import React, { useEffect, useState } from 'react';

const GradientBackground = ({ colors }) => {
  const [newGradient, setNewGradient] = useState(null);
  const [oldGradient, setOldGradient] = useState(`linear-gradient(90deg, #ff6347 0%, #ffd700 100%)`); // Default gradient
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [newGradientVisible, setNewGradientVisible] = useState(false); // Tracks when new gradient should be visible

  useEffect(() => {
    if (colors) {
      const gradient = `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)`;

      setNewGradient(gradient);
      setNewGradientVisible(false);
      setIsTransitioning(true);


      let timeout = setTimeout(() => {
        setNewGradientVisible(true); 
        setOldGradient(gradient);
        setNewGradientVisible(false); 
            
        setIsTransitioning(false);
      }, 500);

      // Cleanup the previous timeout if colors change mid-transition
      return () => clearTimeout(timeout);
    }
  }, [colors]); // Effect triggered whenever colors change

  return (
    <div className="gradient-background-wrapper">
      {/* Old Gradient: Initially visible, transitioning out */}
      <div
        className="gradient-background"
        style={{
          background: oldGradient,
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 1s ease', // Hardcoded transition for fading out
        }}
      />
      {/* New Gradient: Initially hidden, transitioning in */}
      <div
        className="gradient-background new-gradient"
        style={{
          background: newGradient,
          opacity: newGradientVisible ? 1 : 0, // Start at opacity 0 and transition in after a short delay
          transition: 'opacity 1s ease', // Hardcoded transition for fading in
        }}
      />
    </div>
  );
};

export default GradientBackground;
