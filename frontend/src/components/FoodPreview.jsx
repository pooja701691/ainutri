import React, { useState, useEffect } from 'react';
import { Trash2, Sparkles } from 'lucide-react';

export const FoodPreview = ({ file, onCancel, onAnalyze }) => {
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!file) return;
    // Generate object URL for image previewing
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Free memory when component unmounts
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Formats file sizes in bytes to human-readable string (e.g. 2.4 MB)
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 1;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6">
      <div className="text-center">
        <h3 className="font-extrabold text-lg text-slate-800">Preview Selected Plate</h3>
        <p className="text-xs text-slate-450 mt-1">Review your image before sending it for analysis.</p>
      </div>

      {/* Image Preview Container */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-50 border border-slate-100 max-w-sm mx-auto shadow-sm">
        {previewUrl && (
          <img src={previewUrl} alt="Selected meal preview" className="w-full h-full object-cover" />
        )}
      </div>

      {/* File info details */}
      <div className="bg-[#fafcfc] border border-slate-100 p-4 rounded-2xl max-w-sm mx-auto flex items-center justify-between text-sm">
        <div className="truncate pr-4">
          <p className="font-semibold text-slate-700 truncate" title={file?.name}>
            {file?.name}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{formatFileSize(file?.size)}</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-colors shrink-0"
        >
          <Trash2 size={13} />
          <span>Remove</span>
        </button>
      </div>

      {/* Trigger Analyze */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={onAnalyze}
          className="w-full max-w-sm inline-flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-xl shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
        >
          <Sparkles size={16} />
          <span>✨ Analyze Food</span>
        </button>
      </div>
    </div>
  );
};

export default FoodPreview;
