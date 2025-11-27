'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { FaRocket, FaUsers, FaShieldAlt, FaChartLine } from 'react-icons/fa';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const features = [
    {
      icon: <FaRocket className="text-4xl text-blue-500" />,
      title: 'Quick Hiring',
      description: 'Find and hire skilled professionals in minutes, not days.'
    },
    {
      icon: <FaUsers className="text-4xl text-green-500" />,
      title: 'Verified Talent',
      description: 'All professionals are verified with proven track records.'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-purple-500" />,
      title: 'Secure Platform',
      description: 'Your data and transactions are protected with enterprise-grade security.'
    },
    {
      icon: <FaChartLine className="text-4xl text-orange-500" />,
      title: 'Growth Opportunities',
      description: 'Scale your business or career with our extensive network.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Connect. Collaborate. <span className="text-yellow-300">Succeed.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find the perfect talent for your projects or showcase your skills to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/post-skill" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300"
              >
                Post Your Skill
              </Link>
              <Link 
                href="/hire-skill" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Hire Talent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Work Roots?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a seamless platform that connects businesses with top-tier talent, 
              ensuring quality, reliability, and success for all parties involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg card-hover text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div data-aos="zoom-in">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-xl text-gray-600">Skilled Professionals</div>
            </div>
            <div data-aos="zoom-in" data-aos-delay="200">
              <div className="text-4xl font-bold text-green-600 mb-2">1,200+</div>
              <div className="text-xl text-gray-600">Projects Completed</div>
            </div>
            <div data-aos="zoom-in" data-aos-delay="400">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-xl text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl opacity-90">
              Hear from professionals and businesses who have found success with Work Roots
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of professionals and businesses already using Work Roots to achieve their goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register" 
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
              >
                Sign Up Free
              </Link>
              <Link 
                href="/hire-skill" 
                className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
              >
                Browse Talent
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}