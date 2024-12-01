import React, { useRef, useEffect } from "react";

const Cosmic3DNotice = ({ notice, date, delay }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      container.style.transform = `
        perspective(1000px)
        rotateY(${x * 10 - 5}deg)
        rotateX(${y * -10 + 5}deg)
      `;
    };

    const animate = () => {
      const time = Date.now() * 0.001;
      container.style.boxShadow = `
        0 0 ${Math.abs(Math.sin(time) * 10 + 5)}px rgba(255, 97, 210, 0.4),
        0 0 ${Math.abs(Math.cos(time) * 10 + 5)}px rgba(77, 91, 206, 0.4)
      `;
      animationFrameId = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-space-100 p-4 rounded-md shadow-md border border-nebula-blue transition-transform duration-200 ease-out animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-lg font-semibold text-starlight mb-2">{notice}</p>
      <p className="text-sm text-gray-400">Date: {date}</p>
    </div>
  );
};

export default Cosmic3DNotice;
