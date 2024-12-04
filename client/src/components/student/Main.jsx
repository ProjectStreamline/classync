import React, { useState, useEffect, useRef } from "react";

const Nebula = ({ children }) => {
  const nebulaRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { left, top, width, height } =
        nebulaRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nebulaStyle = {
    transform: `
      perspective(1000px)
      rotateY(${mousePosition.x * 10 - 5}deg)
      rotateX(${mousePosition.y * -10 + 5}deg)
    `,
  };

  return (
    <div ref={nebulaRef} className="relative w-full h-full" style={nebulaStyle}>
      <div className="absolute inset-0 bg-gradient-radial from-nebula-pink via-nebula-purple to-transparent opacity-50 animate-pulse-slow"></div>
      {children}
    </div>
  );
};

const CosmicObject = ({ type, delay, size, content, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition);
  const [showContent, setShowContent] = useState(false);
  const objectRef = useRef(null);

  useEffect(() => {
    const randomPosition = () => {
      const x = Math.random() * 80 + 10;
      const y = Math.random() * 80 + 10;
      setPosition({ x, y });
    };

    const interval = setInterval(randomPosition, 15000 + delay * 1000);

    return () => clearInterval(interval);
  }, [delay]);

  const handleMouseMove = (e) => {
    if (!objectRef.current) return;
    const rect = objectRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    objectRef.current.style.transform = `translate3d(${x / 5}px, ${
      y / 5
    }px, 50px) rotate(${x / 10}deg)`;
  };

  const handleMouseLeave = () => {
    if (objectRef.current) {
      objectRef.current.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
    }
  };

  let objectClass = `absolute rounded-full transition-all duration-300 ease-out cursor-pointer`;
  let innerContent = null;

  switch (type) {
    case "planet":
      objectClass += ` w-${size} h-${size} bg-gradient-to-br from-nebula-blue to-nebula-purple`;
      innerContent = (
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white opacity-30"></div>
      );
      break;
    case "star":
      objectClass += ` w-${size} h-${size} bg-yellow-200 animate-twinkle`;
      break;
    case "nebula":
      objectClass += ` w-${size} h-${size} bg-gradient-radial from-nebula-pink via-nebula-purple to-transparent animate-pulse-slow`;
      break;
    case "blackhole":
      objectClass += ` w-${size} h-${size} bg-black`;
      innerContent = (
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-transparent via-nebula-purple to-black animate-spin-slow"></div>
      );
      break;
    default:
      objectClass += ` w-${size} h-${size} bg-gray-600`;
  }

  return (
    <div
      ref={objectRef}
      className={objectClass}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transition:
          "transform 0.3s ease-out, left 15s ease-in-out, top 15s ease-in-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setShowContent(!showContent)}
    >
      {innerContent}
      {showContent && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-space-300 bg-opacity-90 rounded-lg text-starlight text-sm z-10 whitespace-nowrap">
          {content}
        </div>
      )}
    </div>
  );
};

const ParallaxStars = () => {
  const starsRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { left, top, width, height } =
        starsRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const layers = [
    { count: 50, size: 1, speed: 0.5 },
    { count: 30, size: 2, speed: 1 },
    { count: 20, size: 3, speed: 1.5 },
  ];

  return (
    <div ref={starsRef} className="absolute inset-0 overflow-hidden">
      {layers.map((layer, layerIndex) => (
        <div key={layerIndex} className="absolute inset-0">
          {Array.from({ length: layer.count }).map((_, starIndex) => {
            const left = `${Math.random() * 100}%`;
            const top = `${Math.random() * 100}%`;
            const transform = `translate(
              ${mousePosition.x * layer.speed * 100 - 50}px,
              ${mousePosition.y * layer.speed * 100 - 50}px
            )`;
            return (
              <div
                key={starIndex}
                className="absolute rounded-full bg-white"
                style={{
                  left,
                  top,
                  width: `${layer.size}px`,
                  height: `${layer.size}px`,
                  transform,
                  transition: "transform 0.1s ease-out",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Main = () => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-space-400 rounded-lg shadow-lg mb-8">
      <div className="absolute inset-0 bg-gradient-to-br from-space-300 to-space-400 opacity-50" />
      <ParallaxStars />
      <Nebula>
        <div className="relative z-10 w-full h-full p-8">
          <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-nebula-pink via-nebula-purple to-nebula-blue mb-8 animate-float">
Upcoming Events
          </h2>
          <p
            className="text-xl text-center text-starlight mb-12 animate-float"
            style={{ animationDelay: "0.2s" }}
          >

          </p>
          <CosmicObject
            type="planet"
            delay={1}
            size="32"
            content="Upcoming Assignments"
            initialPosition={{ x: 20, y: 30 }}
          />
          <CosmicObject
            type="star"
            delay={1}
            size="8"
            content="Latest Grades"
            initialPosition={{ x: 70, y: 20 }}
          />
          <CosmicObject
            type="nebula"
            delay={1}
            size="8"
            content="Campus Events"
            initialPosition={{ x: 50, y: 50 }}
          />
          <CosmicObject
            type="blackhole"
            delay={2}
            size="24"
            content="Research Opportunities"
            initialPosition={{ x: 80, y: 70 }}
          />
          <CosmicObject
            type="nebula"
            delay={2}
            size="32"
            content="Course Schedule"
            initialPosition={{ x: 30, y: 60 }}
          />
          <CosmicObject
            type="star"
            delay={0}
            size="32"
            content="Study Resources"
            initialPosition={{ x: 60, y: 40 }}
          />
        </div>
      </Nebula>
    </div>
  );
};

export default Main;
