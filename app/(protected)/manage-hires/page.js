'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaTrash, FaUser, FaBriefcase, FaCalendar, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default function ManageHires() {
  const [hires, setHires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hireToDelete, setHireToDelete] = useState(null);
  const { currentUser } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://work-roots-server-new.vercel.app/api';

  useEffect(() => {
    fetchMyHires();
  }, []);

  const fetchMyHires = async () => {
    try {
      const response = await axios.get(`${API_URL}/hires/user`, {
        headers: { Authorization: `Bearer ${currentUser.uid}` }
      });
      setHires(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch your hires: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClick = (hire) => {
    setHireToDelete(hire);
    setShowDeleteModal(true);
  };

  const handleRemove = async () => {
    try {
      await axios.delete(`${API_URL}/hires/${hireToDelete._id}`, {
        headers: { Authorization: `Bearer ${currentUser.uid}` }
      });
      toast.success('Hire removed successfully!');
      setHires(hires.filter(hire => hire._id !== hireToDelete._id));
      setShowDeleteModal(false);
      setHireToDelete(null);
    } catch (error) {
      toast.error('Failed to remove hire: ' + error.response?.data?.error || error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Hires</h1>
          <p className="text-gray-600 mt-2">
            View and manage the professionals you've hired
          </p>
        </div>

        {hires.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow p-8 max-w-md mx-auto">
              <FaExclamationTriangle className="text-yellow-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Active Hires
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't hired any professionals yet. Start by browsing available skills.
              </p>
              <a
                href="/hire-skill"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold inline-flex items-center"
              >
                <FaBriefcase className="mr-2" />
                Browse Skills
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                You have {hires.length} active hire{hires.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {hires.map(hire => (
                <div key={hire._id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {hire.skillTitle}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <FaUser className="mr-2" />
                            <span>Professional: {hire.skillOwnerName}</span>
                          </div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <FaBriefcase className="mr-2" />
                            <span>Status:
                              <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${hire.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : hire.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                                }`}>
                                {hire.status.charAt(0).toUpperCase() + hire.status.slice(1)}
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaCalendar className="mr-2" />
                            <span>Hired on: {formatDate(hire.hiredAt)}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveClick(hire)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition duration-300 ml-4"
                          title="Remove Hire"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>

                      {hire.skillId && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Skill Details:</h4>
                          <p className="text-gray-600 text-sm">
                            {hire.skillId.description}
                          </p>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <FaDollarSign className="mr-1" />
                            <span>Rate: ${hire.skillId.hourlyCharge}/hr</span>
                            <span className="mx-2">•</span>
                            <span>Experience: {hire.skillId.yearsOfExperience} years</span>
                          </div>
                        </div>
                      )}
                    </div>
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
                <h3 className="text-lg font-semibold">Remove Hire</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove "{hireToDelete?.skillTitle}" from your hires?
                This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemove}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}