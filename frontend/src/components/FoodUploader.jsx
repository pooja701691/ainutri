import React, { useRef, useState } from 'react';
import { Upload, Camera, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const FoodUploader = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFile = (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Check size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      return toast.error('Image size exceeds 5MB limit. Please upload a smaller image.');
    }

    // Check file format
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return toast.error('Unsupported file format. Only JPG, JPEG, PNG, and WEBP are accepted.');
    }

    onFileSelect(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files) {
      handleFile(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Container */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[250px] ${
          isDragActive
            ? 'border-emerald-500 bg-emerald-50/20 scale-[0.99]'
            : 'border-slate-200 bg-slate-50/40 hover:bg-emerald-50/10 hover:border-emerald-400'
        }`}
      >
        {/* Hidden inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files)}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFile(e.target.files)}
        />

        <div className="space-y-4 max-w-sm">
          {/* Uploader Icon */}
          <div className="mx-auto w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-emerald-500 transition-colors">
            <Upload size={24} className="text-emerald-500" />
          </div>

          <div className="space-y-1">
            <h3 className="font-extrabold text-lg text-slate-800 flex items-center justify-center gap-1.5">
              <Sparkles size={16} className="text-emerald-500 fill-emerald-100" />
              <span>Scan Food Image</span>
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Drag & drop your meal photo here, or browse your files.
            </p>
          </div>
          <span className="inline-block text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-white border border-slate-100 px-3 py-1 rounded-full">
            JPG, PNG, WEBP • MAX 5MB
          </span>
        </div>
      </div>

      {/* Separate Gallery vs Mobile Camera snap buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center space-x-2 py-3.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 rounded-2xl shadow-sm transition-colors"
        >
          <Upload size={16} className="text-slate-400" />
          <span>Upload Gallery</span>
        </button>

        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center justify-center space-x-2 py-3.5 px-4 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/60 font-bold text-sm border border-emerald-100 rounded-2xl shadow-sm transition-colors"
        >
          <Camera size={16} />
          <span>Take Photo</span>
        </button>
      </div>
    </div>
  );
};

export default FoodUploader;
