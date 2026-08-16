import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getFoodEntryById, deleteFoodEntry } from '../services/foodService.js';
import NutritionSummary from '../components/NutritionSummary.jsx';
import FoodItemCard from '../components/FoodItemCard.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { ArrowLeft, Trash2, Calendar, Clock, Sparkles } from 'lucide-react';
import { formatDate, formatTime, capitalize } from '../utils/helpers.js';
import toast from 'react-hot-toast';

export const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchMealDetails = async () => {
    try {
      setLoading(true);
      const res = await getFoodEntryById(id);
      if (res && res.success) {
        setMeal(res.data.foodEntry);
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Failed to load details.';
      toast.error(errMsg);
      navigate('/history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealDetails();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteFoodEntry(id);
      if (res && res.success) {
        toast.success('Food entry deleted successfully.');
        navigate('/history');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete meal log.');
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!meal) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header navigations */}
      <div className="flex justify-between items-center">
        <Link
          to="/history"
          className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to History</span>
        </Link>

        {/* Delete Trigger */}
        <button
          onClick={() => setDeleteOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100/80 rounded-xl text-xs font-bold transition-colors shadow-sm"
        >
          <Trash2 size={13} />
          <span>Delete Log</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Aspect: Image & food items list */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-md">
            <div className="relative aspect-[4/3] w-full bg-slate-50 border-b border-slate-50">
              <img src={meal.imageUrl} alt="Scanned meal log" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-3 py-1.5 rounded-full shadow-sm">
                  {capitalize(meal.mealType)}
                </span>
              </div>
            </div>
            
            {/* Metadata detail block */}
            <div className="p-5 border-t border-slate-50/50 bg-[#fafcfc] space-y-3">
              <div className="flex justify-between text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  <span>{formatDate(meal.createdAt)}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  <span>{formatTime(meal.createdAt)}</span>
                </span>
              </div>

              {meal.notes && (
                <div className="border-t border-slate-200/50 pt-2.5">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Chef Notes
                  </span>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">"{meal.notes}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Sub items */}
          <div className="space-y-3.5">
            <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-500" />
              <span>Identified Ingredients ({meal.foodItems?.length || 0})</span>
            </h3>
            <div className="space-y-3">
              {meal.foodItems?.map((item, idx) => (
                <FoodItemCard key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Aspect: Total summary details */}
        <div className="lg:col-span-6 bg-white border border-slate-100/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <div className="space-y-1.5 border-b border-slate-50 pb-4">
            <h3 className="font-extrabold text-slate-850 text-xl">Macro Aggregations</h3>
            <p className="text-xs text-slate-400">Nutrients sums calculated for this logged meal.</p>
          </div>

          <NutritionSummary totalNutrition={meal.totalNutrition} />

          <div className="bg-slate-50/60 p-4 border border-slate-100 rounded-2xl">
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              Estimated metrics based on image portion detection. Actual calorie counts can vary depending on preparation style.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete meal log?"
        message="Are you sure you want to delete this meal log from your journal? This cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Keep Log"
        loading={deleting}
      />
    </div>
  );
};

export default FoodDetails;
