'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Spinner';
import axios from 'axios';

const categories = [
  'Web Development',
  'Mobile Development',
  'Design',
  'Writing',
  'Marketing',
  'Consulting',
  'Other'
];

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const dynamic = 'force-dynamic';

export default function PostSkill() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    yearsOfExperience: '',
    hourlyCharge: '',
    availableDays: [],
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://server-v2-one.vercel.app/api';

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        availableDays: checked
          ? [...prev.availableDays, value]
          : prev.availableDays.filter(day => day !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/skills`, formData, {
        headers: { Authorization: `Bearer ${currentUser.uid}` }
      });

      toast.success('Skill posted successfully!');
      setFormData({
        title: '',
        description: '',
        category: '',
        yearsOfExperience: '',
        hourlyCharge: '',
        availableDays: [],
        imageUrl: ''
      });
      router.push('/my-skill-listings');
    } catch (error) {
      toast.error('Failed to post skill: ' + error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Post Your Skill
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Skill Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" // ADDED text colors
                placeholder="e.g., Senior React Developer"
              />
            </div>

            {/* Description Input */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" // ADDED text colors
                placeholder="Describe your skills, experience, and what you can offer..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Select */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" // ADDED text color
                >
                  <option value="" className="text-gray-500">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="text-gray-900">{category}</option>
                  ))}
                </select>
              </div>

              {/* Years of Experience */}
              <div>
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  required
                  min="0"
                  max="50"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" // ADDED text color
                />
              </div>
            </div>

            {/* Hourly Charge */}
            <div>
              <label htmlFor="hourlyCharge" className="block text-sm font-medium text-gray-700">
                Hourly Charge ($) *
              </label>
              <input
                type="number"
                id="hourlyCharge"
                name="hourlyCharge"
                required
                min="0"
                step="0.01"
                value={formData.hourlyCharge}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" // ADDED text colors
                placeholder="e.g., 50.00"
              />
            </div>

            {/* Available Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Days
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {daysOfWeek.map(day => (
                  <label key={day} className="flex items-center text-gray-900"> {/* ADDED text color */}
                    <input
                      type="checkbox"
                      name="availableDays"
                      value={day}
                      checked={formData.availableDays.includes(day)}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-900">{day}</span> {/* CHANGED to gray-900 */}
                  </label>
                ))}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Image URL (Optional)
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" // ADDED text colors
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? <Spinner /> : 'Post Skill'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}