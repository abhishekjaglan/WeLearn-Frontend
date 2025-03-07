// src/pages/Landing.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureCard } from '../components/FeatureCards';
import { FaFileAlt, FaHeadphones, FaLink } from 'react-icons/fa';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary to-neutral">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-primary text-white px-6 py-4 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">WeLearn</h1>
          <div className="flex space-x-4">
            <Link
              to="/signin"
              className="border-2 border-accent text-accent px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-all duration-300 ease-in-out"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="border-2 border-accent text-accent px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-all duration-300 ease-in-out"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center  pt-24 pb-16">
        <div className="text-center px-4">
          <div className="w-72 h-72 bg-accent rounded-full mx-auto mb-8 flex items-center justify-center text-white text-2xl font-semibold animate-fade-in">
            Illustration Here
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-text mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Unlock Insights from Any Media
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Summarize your media effortlessly with WeLearn.
          </p>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-neutral">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-text text-center mb-12">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card: Documents */}
            <div className="flex-row justify-center items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">
              <div className="flex justify-center items-center text-4xl mb-4">📄</div>
              <h4 className="flex justify-center items-center text-xl font-medium text-text mb-2">Documents</h4>
              <p className="flex justify-center items-center text-sm text-gray-600">
                Upload PDFs, Word docs, and more to get concise summaries.
              </p>
            </div>
            {/* Feature Card: Audio/Video */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">
              <div className="flex justify-center items-center text-4xl mb-4">🎧</div>
              <h4 className="flex justify-center items-center text-xl font-medium text-text mb-2">Audio/Video</h4>
              <p className="flex justify-center items-center text-sm text-gray-600">
                Transcribe and summarize audio and video files effortlessly.
              </p>
            </div>
            {/* Feature Card: URLs */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">
              <div className="flex justify-center items-center text-4xl mb-4">🔗</div>
              <h4 className="flex justify-center items-center text-xl font-medium text-text mb-2">URLs</h4>
              <p className="flex justify-center items-center text-sm text-gray-600">
                Enter a URL to fetch and summarize web content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-neutral text-center">
        <Link
          to="/signup"
          className="inline-block bg-secondary text-white px-8 py-3 rounded-full hover:bg-secondary-dark transition-colors duration-300 ease-in-out text-lg font-medium"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="flex space-x-6 mb-4">
            <a href="#" className="text-sm hover:underline">About</a>
            <a href="#" className="text-sm hover:underline">Contact</a>
            <a href="#" className="text-sm hover:underline">Privacy</a>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-xl hover:text-accent transition-colors duration-200">
              <FeatureCard title='Document' icon={<FaFileAlt/>}/>
            </a>
            <a href="#" className="text-xl hover:text-accent transition-colors duration-200">
              <FeatureCard title='Audio/Video' icon={<FaHeadphones/>} />
            </a>
            <a href="#" className="text-xl hover:text-accent transition-colors duration-200">
              <FeatureCard title='Links' icon={<FaLink/>}/>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;