import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-400 min-h-screen flex flex-col justify-center items-center p-8 text-white">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-justify">Welcome to the Passion Framework</h1>
      <p className="text-lg lg:text-xl max-w-2xl mb-8">
        The Passion Framework, developed by Dr. Prakash Sharma, is a pioneering research framework designed to foster entrepreneurship and innovation in India's startup ecosystem. Dr. Sharma, a PhD in Marketing with a specialization in the startup ecosystem, has meticulously crafted this framework, comprising seven dimensions and 28 process areas. The framework aims to comprehensively build and enhance the entrepreneurship ecosystem in India, encouraging collaboration among incubators, accelerators, universities, institutes, and startups. With a focus on conducting startup audits, the Passion Framework empowers organizations to improve internal processes, secure better funding, and streamline governance, thus addressing common challenges faced by startups, including regulatory issues and legal hassles.
      </p>
    </div>
  );
};

export default About;
