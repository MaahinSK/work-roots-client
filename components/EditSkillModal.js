'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
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

export default function EditSkillModal({ skill, isOpen, onClose, onUpdate }) {
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

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://work-roots-server-new.vercel.app/api';

  useEffect(() => {
    if (skill) {
      setFormData({
        title: skill.title || '',
        description: skill.description || '',
        category: skill.category || '',
        yearsOfExperience: skill.yearsOfExperience || '',
        hourlyCharge: skill.hourlyCharge || '',
        availableDays: skill.availableDays || [],
        imageUrl: skill.imageUrl || ''
      });
    }
  }, [skill]);

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
      const response = await axios.put(`${API_URL}/skills/${skill._id}`, formData, {
        headers: { Authorization: `Bearer ${currentUser.uid}` }
      });

      toast.success('Skill updated successfully!');
      onUpdate(response.data.data);
      onClose();
    } catch (error) {
      toast.error('Failed to update skill: ' + error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Skill</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
                Skill Title *
              </label>
              <input
                type="text"
                id="edit-title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="edit-description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  id="edit-category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="edit-experience" className="block text-sm font-medium text-gray-700">
                  Years of Experience *
                </label>
                <input
                  type="number"
                  id="edit-experience"
                  name="yearsOfExperience"
                  required
                  min="0"
                  max="50"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="edit-hourlyCharge" className="block text-sm font-medium text-gray-700">
                Hourly Charge ($) *
              </label>
              <input
                type="number"
                id="edit-hourlyCharge"
                name="hourlyCharge"
                required
                min="0"
                step="0.01"
                value={formData.hourlyCharge}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Days
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {daysOfWeek.map(day => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      name="availableDays"
                      value={day}
                      checked={formData.availableDays.includes(day)}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="edit-imageUrl" className="block text-sm font-medium text-gray-700">
                Image URL (Optional)
              </label>
              <input
                type="url"
                id="edit-imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? <Spinner /> : 'Update Skill'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}