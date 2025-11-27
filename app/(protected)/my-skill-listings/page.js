'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import SkillCard from '../../../components/SkillCard';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaExclamationTriangle } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default function MySkillListings() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const { currentUser } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchMySkills();
  }, []);

  const fetchMySkills = async () => {
    try {
      const response = await axios.get(`${API_URL}/skills/user`, {
        headers: { Authorization: `Bearer ${currentUser.uid}` }
      });
      setSkills(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch your skills: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (skill) => {
    setSkillToDelete(skill);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/skills/${skillToDelete._id}`, {
        headers: { Authorization: `Bearer ${currentUser.uid}` }
      });
      toast.success('Skill deleted successfully!');
      setSkills(skills.filter(skill => skill._id !== skillToDelete._id));
      setShowDeleteModal(false);
      setSkillToDelete(null);
    } catch (error) {
      toast.error('Failed to delete skill: ' + error.response?.data?.error || error.message);
    }
  };

  const handleEdit = (skill) => {
    // For now, we'll redirect to post-skill with edit data
    // In a real app, you might have a separate edit page or modal
    toast.info('Edit functionality coming soon!');
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Skill Listings</h1>
              <p className="text-gray-600 mt-2">
                Manage your posted skills and track their performance
              </p>
            </div>
            <a
              href="/post-skill"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center"
            >
              <FaPlus className="mr-2" />
              Post New Skill
            </a>
          </div>
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow p-8 max-w-md mx-auto">
              <FaExclamationTriangle className="text-yellow-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Skills Posted Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start showcasing your skills to potential clients by posting your first skill listing.
              </p>
              <a
                href="/post-skill"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold inline-flex items-center"
              >
                <FaPlus className="mr-2" />
                Post Your First Skill
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                You have {skills.length} active skill listing{skills.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map(skill => (
                <div key={skill._id} className="relative">
                  <SkillCard
                    skill={skill}
                    showHireButton={false}
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition duration-300"
                      title="Edit Skill"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(skill)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition duration-300"
                      title="Delete Skill"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <div className="flex items-center mb-4">
                <FaExclamationTriangle className="text-red-500 text-xl mr-3" />
                <h3 className="text-lg font-semibold">Delete Skill</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{skillToDelete?.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}