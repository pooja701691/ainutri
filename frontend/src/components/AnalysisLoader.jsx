import React, { useState, useEffect } from 'react';
import { Sparkles, Search, ShieldAlert, Check } from 'lucide-react';

export const AnalysisLoader = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: 'Uploading picture to Cloudinary storage...', icon: Sparkles },
    { label: 'Detecting individual food items on plate...', icon: Search },
    { label: 'Retrieving precise nutritional parameters...', icon: Search },
    { label: 'Aggregating total calorie and macro estimations...', icon: Sparkles }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-xl max-w-md mx-auto text-center space-y-8 py-12">
      {/* Animated Scan target element */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        {/* Pulsing ring */}
        <div className="absolute inset-0 bg-emerald-100 rounded-3xl animate-ping opacity-40" />
        <div className="absolute -inset-1.5 border border-emerald-500 rounded-3xl animate-spin [animation-duration:8s] opacity-30" />
        
        {/* Sparkle badge */}
        <div className="relative bg-emerald-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
          <Sparkles size={28} className="animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-extrabold text-xl text-slate-800">Scrutinizing Plate...</h3>
        <p className="text-sm text-slate-500">Our AI Vision engines are parsing your meal ingredients.</p>
      </div>

      {/* Progress checklists */}
      <div className="space-y-4 max-w-xs mx-auto text-left">
        {steps.map((step, idx) => {
          const isDone = idx < activeStep;
          const isActive = idx === activeStep;

          return (
            <div
              key={idx}
              className={`flex items-center space-x-3.5 transition-opacity duration-300 ${
                isDone || isActive ? 'opacity-100' : 'opacity-35'
              }`}
            >
              {/* Status circle */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs shrink-0 transition-colors ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-500 text-white font-bold'
                    : isActive
                    ? 'border-emerald-500 text-emerald-500 animate-pulse font-extrabold bg-emerald-50/50'
                    : 'border-slate-200 text-slate-400'
                }`}
              >
                {isDone ? <Check size={12} className="stroke-[3]" /> : idx + 1}
              </div>

              <span
                className={`text-xs font-semibold ${
                  isActive ? 'text-slate-800' : isDone ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisLoader;
