import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import NutritionSummary from '../components/NutritionSummary.jsx';
import FoodItemCard from '../components/FoodItemCard.jsx';
import { Sparkles, Calendar, ArrowLeft, CheckCircle } from 'lucide-react';
import { capitalize } from '../utils/helpers.js';
import toast from 'react-hot-toast';

export const AnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const foodEntry = location.state?.foodEntry;

  useEffect(() => {
    // If user accesses page directly without an entry, redirect back to analyze
    if (!foodEntry) {
      toast.error('No scan session was found. Please analyze an image.');
      navigate('/analyze');
    }
  }, [foodEntry, navigate]);

  if (!foodEntry) return null;

  const handleConfirmSave = () => {
    toast.success('Meal saved successfully in your log history!');
    navigate('/dashboard');
  };

  const formattedItems = foodEntry.foodItems || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button & Page header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link
          to="/analyze"
          className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Analyze another plate</span>
        </Link>
        
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white border border-slate-100 px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <Calendar size={12} />
          <span>{new Date(foodEntry.createdAt).toLocaleDateString()}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Photo & Detected items breakdown */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main Visual Photo Card */}
          <div className="bg-white border border-slate-100/80 rounded-3xl overflow-hidden shadow-md">
            <div className="relative aspect-[4/3] w-full bg-slate-50 border-b border-slate-50">
              <img
                src={foodEntry.imageUrl}
                alt="Analyzed food"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-3 py-1.5 rounded-full shadow-md">
                  {capitalize(foodEntry.mealType)}
                </span>
              </div>
            </div>
            {foodEntry.notes && (
              <div className="p-4 bg-slate-50/50 border-t border-slate-50">
                <p className="text-xs text-slate-500 font-medium italic">
                  Notes: "{foodEntry.notes}"
                </p>
              </div>
            )}
          </div>

          {/* Subcomponents breakdown */}
          <div className="space-y-3.5">
            <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-1.5">
              <Sparkles size={16} className="text-emerald-500 fill-emerald-100 animate-pulse" />
              <span>Detected Food Items ({formattedItems.length})</span>
            </h3>
            
            <div className="space-y-3">
              {formattedItems.map((item, index) => (
                <FoodItemCard key={index} item={item} />
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Total nutrition breakdown summary & confirming save */}
        <div className="lg:col-span-6 space-y-6 bg-white border border-slate-100/80 p-6 sm:p-8 rounded-3xl shadow-sm">
          
          <div className="space-y-1.5 border-b border-slate-50 pb-4">
            <h3 className="font-extrabold text-slate-800 text-xl">Nutritional Summary</h3>
            <p className="text-xs text-slate-450 leading-relaxed">
              Cumulative nutrient estimates based on all detected ingredients on your plate.
            </p>
          </div>

          {/* Grid Layout of totals */}
          <NutritionSummary totalNutrition={foodEntry.totalNutrition} />

          {/* Warning disclaimer */}
          <div className="bg-amber-50/30 border border-amber-100 p-4 rounded-2xl">
            <p className="text-[11px] text-amber-700 leading-relaxed font-semibold">
              ⚠️ Disclaimer: Nutrition values are estimates and may vary based on ingredients, preparation method, and portion size.
            </p>
          </div>

          {/* Save Action */}
          <div className="pt-4 border-t border-slate-50">
            <button
              onClick={handleConfirmSave}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5 duration-200"
            >
              <CheckCircle size={18} />
              <span>Save Meal & View Dashboard</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AnalysisResult;
