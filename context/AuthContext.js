'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://server-v2-one.vercel.app/api';

  // Sync user to MongoDB
  const syncUserToDB = async (user, additionalData = {}) => {
    try {
      await axios.post(`${API_URL}/auth/sync`, {
        uid: user.uid,
        name: user.displayName || additionalData.name || 'User',
        email: user.email,
        phone: additionalData.phone || '',
        profilePicture: user.photoURL || additionalData.profilePicture || ''
      });
    } catch (error) {
      console.error('Error syncing user to DB:', error);
    }
  };

  const signup = async (email, password, name) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    await syncUserToDB(user, { name });
    return user;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (updates) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, updates);
      await syncUserToDB(auth.currentUser, updates);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await syncUserToDB(user);
        // Fetch user profile from our API
        try {
          const response = await axios.get(`${API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${user.uid}` }
          });
          setUserProfile(response.data.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}