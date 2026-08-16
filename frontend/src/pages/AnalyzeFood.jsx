import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeFoodImage } from '../services/foodService.js';
import FoodUploader from '../components/FoodUploader.jsx';
import FoodPreview from '../components/FoodPreview.jsx';
import AnalysisLoader from '../components/AnalysisLoader.jsx';
import { Sparkles, Utensils, MessageSquare, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const AnalyzeFood = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Custom states for meal info overrides
  const [mealType, setMealType] = useState('lunch');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      return toast.error('Please upload or snap a photo of your food first.');
    }

    setLoading(true);
    try {
      const res = await analyzeFoodImage(selectedFile, mealType, notes, quantity, unit);
      if (res && res.success) {
        toast.success('AI analysis finished successfully!');
        // Transition to results screen passing backend response data
        navigate('/analysis-result', {
          state: { foodEntry: res.data.foodEntry }
        });
      }
    } catch (err) {
      console.error(err);
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        'AI failed to identify the food. Please try uploading a clearer picture.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <AnalysisLoader />
      </div>
    );
  }

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center max-w-lg mx-auto space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center gap-2">
          <Sparkles size={24} className="text-emerald-500 fill-emerald-100 animate-pulse" />
          <span>Analyze Your Plate</span>
        </h2>
        <p className="text-slate-500 text-sm">
          Snap a meal photo or select an image file to extract exact calorie and nutritional targets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Uploader / Previewer */}
        <div className="lg:col-span-7">
          {selectedFile ? (
            <FoodPreview
              file={selectedFile}
              onCancel={() => setSelectedFile(null)}
              onAnalyze={handleAnalyze}
            />
          ) : (
            <FoodUploader onFileSelect={(file) => setSelectedFile(file)} />
          )}
        </div>

        {/* Right: Meal details inputs */}
        <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 text-lg border-b border-slate-50 pb-3 flex items-center gap-2">
            <Utensils size={18} className="text-emerald-500" />
            <span>Meal Details (Optional)</span>
          </h3>

          {/* Meal Type selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Meal Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {mealTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMealType(type)}
                  className={`py-3 px-4 text-xs font-bold capitalize rounded-2xl border transition-all ${
                    mealType === type
                      ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700 font-extrabold shadow-sm'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Manual Portion Override Option (Beginner-Friendly UI) */}
          <div className="space-y-3.5 border-t border-slate-50 pt-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Portion Size Override (Optional)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="e.g. 150, 2"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 text-xs text-slate-700"
                />
                <input
                  type="text"
                  placeholder="e.g. g, slice, piece"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 text-xs text-slate-700"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
                Provide these overrides if you know exact weights. Otherwise, Gemini AI estimates it automatically.
              </p>
            </div>
          </div>

          {/* Custom Notes */}
          <div className="space-y-2.5 border-t border-slate-50 pt-4">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare size={12} />
              <span>Context Notes</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Rice + Chicken Breast. Homemade with olive oil."
              className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 text-xs text-slate-750 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeFood;
