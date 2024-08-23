import React, { useState, useEffect } from "react";
import homeImage from "./Images/home.jpeg";
import homeImage2 from "./Images/pcombinator.png";
import Vision from "./Vision/Vision";

function HomePage() {
  const [currentImage, setCurrentImage] = useState(homeImage);
  const [nextImage, setNextImage] = useState(homeImage2);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev === homeImage ? homeImage2 : homeImage));
        setNextImage((prev) => (prev === homeImage2 ? homeImage : homeImage2));
        setIsSliding(false);
      }, 1000); // Animation duration
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col z-10">
              <h1 className="text-5xl md:text-5xl font-bold mb-4">Welcome to the Passion Framework</h1>
              <p className="text-lg md:text-lg mb-8">A cutting-edge tool for advancing entrepreneurship and innovation in India.</p>
              <p className="text-lg md:text-lg mb-4">
                Our platform serves as a hub for entrepreneurs, investors, corporate thought leaders,<br />
                academic professionals, and students to engage with the latest research, resources,<br />
                and insights in the startup ecosystem.
              </p>
              <p className="text-sm md:text-sm mb-4">
                Explore our comprehensive framework, discover success stories,<br />
                and access valuable tools to propel your entrepreneurial journey forward.
              </p>
            </div>
            <div className="relative w-80 h-60 md:w-80 md:h-72 overflow-hidden">
              <img
                src={currentImage}
                alt="Home"
                className={`absolute top-0 right-0 w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-1000 ${isSliding ? "translate-x-full" : ""}`}
              />
              <img
                src={nextImage}
                alt="Home"
                className={`absolute top-0 right-0 w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-1000 ${isSliding ? "translate-x-0" : "-translate-x-full"}`}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Vision section */}
      <Vision />
    </div>
  );
}

export default HomePage;
