"use client";

import { useAuth } from "@/context/AuthContext";
import { User, Mail, Calendar, MapPin, Award, FileText, Clock, Edit2, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchUserStats } from "@/services/api";
import { UserStats, UpdateUserProfileRequest } from "@/types/models";
import { LoadingSpinner, StatsLoader } from "@/components/ui/LoadingIndicators";

export default function DashboardPage() {
  const { user, token, updateProfile, isLoading: isAuthLoading } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "Indonesia",
    phone: "",
    bio: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        location: user.location || "Indonesia",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const loadUserStats = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const userStats = await fetchUserStats();
        setStats(userStats);
      } catch (err) {
        setError("Failed to load user statistics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUserStats();
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setError(null);
      setSuccessMessage(null);

      const updateData: UpdateUserProfileRequest = {
        name: formData.name,
        location: formData.location || undefined,
        phone: formData.phone || undefined,
        bio: formData.bio || undefined,
      };

      await updateProfile(updateData);
      setSuccessMessage("Profile updated successfully");
      setIsEditMode(false);
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    }
  };

  const cancelEdit = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        location: user.location || "Indonesia",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
    setFormErrors({});
    setIsEditMode(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] mx-auto space-y-4 md:space-y-6 pb-20">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-purple-900 pl-2">{isEditMode ? "Edit Profile" : `Welcome, ${user.name}!`}</h1>

          {successMessage && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 flex justify-between items-center">
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage(null)} className="text-green-700 hover:text-green-900">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex justify-between items-center">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-md">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-purple-600 font-medium">Free Account</p>
                </div>
              </div>

              {!isEditMode ? (
                <button onClick={() => setIsEditMode(true)} className="flex items-center gap-2 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                  <span className="hidden md:inline">Edit Profile</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={cancelEdit} className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                    <span className="hidden md:inline">Cancel</span>
                  </button>
                  <button onClick={handleSubmit} disabled={isAuthLoading} className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                    {isAuthLoading ? <LoadingSpinner size="sm" color="white" /> : <Save className="w-4 h-4" />}
                    <span className="hidden md:inline">Save</span>
                  </button>
                </div>
              )}
            </div>

            {isEditMode ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${formErrors.name ? "border-red-300" : "border-gray-200"} rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700`}
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input type="email" id="email" value={user.email} disabled className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500" />
                  <p className="text-gray-500 text-xs mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700"
                  />
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <User className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-800">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium text-gray-800">{new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">{user.location || "Indonesia"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Account Type</p>
                      <p className="font-medium text-gray-800">Free Tier</p>
                    </div>
                  </div>

                  {user.phone && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium text-gray-800">{user.phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                {user.bio && (
                  <div className="md:col-span-2 mt-2">
                    <h3 className="font-medium text-gray-700 mb-2">About</h3>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{user.bio}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-700" />
                Document Activity
              </h3>
              <div className="space-y-3 mt-4">
                {loading ? (
                  <>
                    <StatsLoader />
                    <StatsLoader />
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center p-3 hover:bg-purple-50 rounded-lg transition-colors">
                      <div>
                        <p className="font-medium">Documents Generated</p>
                        <p className="text-sm text-gray-500">Create and download legal documents</p>
                      </div>
                      <span className="text-2xl font-bold text-purple-700">{stats?.documents_generated || 0}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 hover:bg-purple-50 rounded-lg transition-colors">
                      <div>
                        <p className="font-medium">Documents Analyzed</p>
                        <p className="text-sm text-gray-500">AI-powered legal document review</p>
                      </div>
                      <span className="text-2xl font-bold text-purple-700">{stats?.documents_analyzed || 0}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-700" />
                Recent Activity
              </h3>
              {loading ? (
                <div className="space-y-3">
                  <StatsLoader />
                  <StatsLoader />
                  <StatsLoader />
                </div>
              ) : stats?.recent_activities?.length ? (
                <div className="space-y-2">
                  {stats.recent_activities.map((activity) => (
                    <div key={activity.id} className="p-3 hover:bg-purple-50 rounded-lg transition-colors">
                      <p className="font-medium">{activity.title}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-purple-700 bg-purple-50 px-2 py-1 rounded">{activity.type === "generator" ? "Document Generator" : activity.type === "analyzer" ? "Document Analyzer" : "Chat"}</span>
                        <span className="text-sm text-gray-500">{activity.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-gray-500 text-center">
                  <div>
                    <p>No recent activity</p>
                    <p className="text-sm mt-2">Your recent actions will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Upgrade to NaviGo Premium</h3>
            <p className="mb-3 md:mb-4 opacity-90 text-sm md:text-base">Get unlimited access to all features and priority support</p>
            <button className="bg-white text-purple-700 px-4 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-gray-100 transition-colors shadow-md font-medium text-sm md:text-base">Upgrade Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

