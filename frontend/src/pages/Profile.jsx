import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { getProfile, updateProfile } from '../services/userService.js';
import { User, Settings, Sparkles, Mail, ShieldAlert, Award } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { refreshUser } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState(2000);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      if (res && res.success) {
        const u = res.data.user;
        setName(u.name || '');
        setEmail(u.email || '');
        setProfileImage(u.profileImage || '');
        setDailyCalorieGoal(u.dailyCalorieGoal || 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load profile data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error('Name cannot be empty.');
    }

    const goal = parseInt(dailyCalorieGoal, 10);
    if (isNaN(goal) || goal < 500 || goal > 10000) {
      return toast.error('Calorie goal must be a number between 500 and 10,000 kcal.');
    }

    setSaving(true);
    try {
      const res = await updateProfile({
        name: name.trim(),
        profileImage: profileImage.trim(),
        dailyCalorieGoal: goal
      });

      if (res && res.success) {
        toast.success('Profile updated successfully!');
        // Refresh session details
        refreshUser(res.data.user);
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Failed to save changes.';
      toast.error(errMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Generate placeholder avatar initials if no image is available
  const avatarPlaceholder = name ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'NS';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-slate-100 rounded-3xl shadow-sm space-y-1">
        <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
          <Settings size={26} className="text-emerald-500" />
          <span>Profile Settings</span>
        </h2>
        <p className="text-slate-500 text-sm">
          Customize your targets, daily caloric milestones, and personal details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar view */}
        <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm text-center flex flex-col items-center space-y-4">
          <div className="relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-4 border-emerald-50 shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-emerald-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md border-4 border-emerald-50">
                {avatarPlaceholder}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
              <Award size={14} className="fill-emerald-100/10" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-800 text-lg">{name}</h3>
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <Mail size={12} />
              <span>{email}</span>
            </p>
          </div>

          <div className="w-full bg-[#fafcfc] border border-slate-100 p-3.5 rounded-2xl">
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              Calorie Target
            </span>
            <span className="font-extrabold text-base text-slate-800">
              {dailyCalorieGoal.toLocaleString()} kcal
            </span>
          </div>
        </div>

        {/* Right Column: Edit inputs */}
        <div className="lg:col-span-8 bg-white border border-slate-100/85 p-6 sm:p-8 rounded-3xl shadow-sm">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User size={15} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 text-xs text-slate-700 font-semibold"
                  />
                </div>
              </div>

              {/* Email (Read Only check) */}
              <div className="space-y-1.5 opacity-65">
                <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Email Address (Unmodifiable)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={15} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    disabled
                    value={email}
                    className="block w-full pl-10 pr-4 py-3 border border-slate-150 bg-slate-50 rounded-2xl focus:outline-none text-xs text-slate-500 font-semibold"
                  />
                </div>
              </div>

              {/* Calorie goal */}
              <div className="space-y-1.5">
                <label htmlFor="goal" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Daily Calorie Target (kcal)
                </label>
                <input
                  id="goal"
                  type="number"
                  required
                  min={500}
                  max={10000}
                  value={dailyCalorieGoal}
                  onChange={(e) => setDailyCalorieGoal(e.target.value)}
                  className="block w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 text-xs text-slate-700 font-bold"
                />
              </div>

              {/* Profile Image URL */}
              <div className="space-y-1.5">
                <label htmlFor="avatar" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Avatar Image URL
                </label>
                <input
                  id="avatar"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  className="block w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 text-xs text-slate-750 font-semibold placeholder:font-normal"
                />
              </div>
            </div>

            {/* Note alert */}
            <div className="flex gap-2.5 p-4 bg-emerald-50/20 border border-emerald-100 rounded-2xl text-[11px] text-emerald-800 leading-relaxed font-semibold">
              <Sparkles size={16} className="shrink-0 text-emerald-500" />
              <span>
                Setting an accurate daily target helps NutriScan AI calculate progress percentages on your dashboard accurately. Keep it updated as you progress.
              </span>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-50 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-50"
              >
                {saving ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
