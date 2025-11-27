'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import SkillCard from '../../../components/SkillCard';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const categories = [
  'All',
  'Web Development',
  'Mobile Development',
  'Design',
  'Writing',
  'Marketing',
  'Consulting',
  'Other'
];
export const dynamic = 'force-dynamic';

export default function HireSkill() {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiring, setHiring] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All',
    search: '',
    minExperience: '',
    maxExperience: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const { currentUser } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://server-v2-one.vercel.app/api';

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    filterSkills();
  }, [skills, filters]);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${API_URL}/skills`);
      setSkills(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch skills: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterSkills = () => {
    let filtered = skills.filter(skill =>
      skill.userId !== currentUser?.uid // Don't show user's own skills
    );

    if (filters.category !== 'All') {
      filtered = filtered.filter(skill => skill.category === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(skill =>
        skill.title.toLowerCase().includes(searchLower) ||
        skill.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.minExperience) {
      filtered = filtered.filter(skill =>
        skill.yearsOfExperience >= parseInt(filters.minExperience)
      );
    }

    if (filters.maxExperience) {
      filtered = filtered.filter(skill =>
        skill.yearsOfExperience <= parseInt(filters.maxExperience)
      );
    }

    setFilteredSkills(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      search: '',
      minExperience: '',
      maxExperience: ''
    });
  };

  const handleHire = async (skillId) => {
    setHiring(skillId);
    try {
      await axios.post(`${API_URL}/hires`, { skillId }, {
        headers: { Authorization: `Bearer ${currentUser.uid}` }
      });
      toast.success('Successfully hired!');
      fetchSkills(); // Refresh the list
    } catch (error) {
      toast.error('Failed to hire: ' + error.response?.data?.error || error.message);
    } finally {
      setHiring(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Talent</h1>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search skills, descriptions..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700" // ADDED text-gray-700
              >
                <FaFilter className="mr-2 text-gray-700" /> {/* ADDED text-gray-700 */}
                Filters
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Experience
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.minExperience}
                      onChange={(e) => handleFilterChange('minExperience', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Experience
                    </label>
                    <input
                      type="number"
                      placeholder="50"
                      value={filters.maxExperience}
                      onChange={(e) => handleFilterChange('maxExperience', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      <FaTimes className="mr-1" />
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredSkills.length} of {skills.length} skills
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No skills found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map(skill => (
              <SkillCard
                key={skill._id}
                skill={skill}
                onHire={() => handleHire(skill._id)}
                showHireButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}