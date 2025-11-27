'use client';
import { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

export default function SkillCard({ skill, onHire, onDetails, showHireButton = true }) {
  const [showFullDetails, setShowFullDetails] = useState(false);

  const shortDescription = skill.description.length > 100 
    ? skill.description.substring(0, 100) + '...' 
    : skill.description;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
      <div className="relative">
        <img
          src={skill.imageUrl || '/api/placeholder/300/200'}
          alt={skill.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
          {skill.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-sm">{skill.yearsOfExperience} years experience</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <FaDollarSign className="text-green-500 mr-1" />
          <span className="text-lg font-semibold">${skill.hourlyCharge}/hr</span>
        </div>

        <p className="text-gray-600 mb-4">
          {showFullDetails ? skill.description : shortDescription}
        </p>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <FaCalendarAlt className="mr-2" />
          <span>Available: {skill.availableDays?.join(', ') || 'Flexible'}</span>
        </div>

        <div className="flex justify-between items-center">
          {showHireButton && (
            <button
              onClick={onHire}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
            >
              Hire Now
            </button>
          )}
          
          <button
            onClick={() => {
              setShowFullDetails(!showFullDetails);
              if (onDetails) onDetails();
            }}
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            {showFullDetails ? 'Show Less' : 'Details'}
          </button>
        </div>
      </div>
    </div>
  );
}