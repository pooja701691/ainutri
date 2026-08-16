import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Sparkles, Camera, Apple, BarChart3, ScanLine, ListCollapse, ChevronRight, Check } from 'lucide-react';

export const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gradient-to-b from-[#f3f9f6] via-white to-white overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 sm:pb-24 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
              <Sparkles size={14} className="fill-emerald-100 animate-pulse" />
              <span>Next-Gen AI Vision Recognition</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 leading-[1.1]">
              Know What’s On <br className="hidden sm:inline" />
              <span className="text-emerald-500">Your Plate</span>
            </h1>
            
            <p className="text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Snap a photo of your meal and let AI instantly analyze calories, protein, carbs, fat, and fiber. Fast, accurate, and incredibly simple.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <Link
                to={isAuthenticated ? '/analyze' : '/signup'}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200 text-center flex items-center justify-center space-x-2"
              >
                <span>Analyze Your Food</span>
                <ChevronRight size={18} />
              </Link>
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold px-8 py-4 rounded-2xl hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Hero Right Visual mockup */}
          <div className="lg:col-span-6 flex justify-center relative">
            {/* Background glowing circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl -z-10" />

            {/* Premium analysis preview card */}
            <div className="bg-white w-full max-w-sm rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 p-6 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 mb-5 border border-slate-100">
                {/* Beautiful mock photo of a healthy dish */}
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400"
                  alt="Delicious salad bowl"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                  <Camera size={12} />
                  <span>Scanning image...</span>
                </div>
              </div>

              {/* Mock Analysis Info */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-800">Healthy Avocado Salad</h3>
                    <p className="text-xs text-slate-400">Scan confidence: 96%</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-600 text-xs font-extrabold px-2.5 py-1 rounded-full">
                    Active Scan
                  </span>
                </div>

                {/* Macro breakdown */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-[#fcfdfd] border border-slate-100/60 p-2.5 rounded-xl">
                    <span className="block text-xs font-semibold text-slate-400">Calories</span>
                    <span className="font-bold text-sm text-slate-800">285 <span className="text-[10px] text-slate-400 font-normal">kcal</span></span>
                  </div>
                  <div className="bg-[#fcfdfd] border border-slate-100/60 p-2.5 rounded-xl">
                    <span className="block text-xs font-semibold text-slate-400">Protein</span>
                    <span className="font-bold text-sm text-slate-800">12 <span className="text-[10px] text-slate-400 font-normal">g</span></span>
                  </div>
                  <div className="bg-[#fcfdfd] border border-slate-100/60 p-2.5 rounded-xl">
                    <span className="block text-xs font-semibold text-slate-400">Carbs</span>
                    <span className="font-bold text-sm text-slate-800">36 <span className="text-[10px] text-slate-400 font-normal">g</span></span>
                  </div>
                  <div className="bg-[#fcfdfd] border border-slate-100/60 p-2.5 rounded-xl">
                    <span className="block text-xs font-semibold text-slate-400">Fat</span>
                    <span className="font-bold text-sm text-slate-800">10 <span className="text-[10px] text-slate-400 font-normal">g</span></span>
                  </div>
                </div>
              </div>

              {/* floating element */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 animate-bounce">
                <Sparkles size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works */}
      <section id="how-it-works" className="py-20 bg-[#fafdfb] border-y border-emerald-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-850">Simple 3-Step Process</h2>
            <p className="text-slate-500">Scanning food doesn't get easier than this. Track meals under 10 seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Step 1 */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl text-center shadow-lg shadow-slate-100/40 space-y-4">
              <div className="bg-emerald-50 text-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Camera size={26} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-800">1. Snap Your Meal</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Take a quick picture or upload an existing photo of your plate from your phone or desktop.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl text-center shadow-lg shadow-slate-100/40 space-y-4">
              <div className="bg-emerald-50 text-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <ScanLine size={26} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-800">2. AI Identifies Food</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our advanced Gemini AI Vision engine parses the visual components of your plate instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl text-center shadow-lg shadow-slate-100/40 space-y-4">
              <div className="bg-emerald-50 text-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <BarChart3 size={26} />
              </div>
              <h3 className="font-extrabold text-lg text-slate-800">3. Get Nutrition Insights</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Instantly view nutrition estimations and log the meal to save in your daily tracking journal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-slate-850">Features Built For Health</h2>
            <p className="text-slate-500">Everything you need to monitor macros, reach calorie goals, and lead a healthy life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="bg-emerald-50 text-emerald-600 p-3 h-fit rounded-xl">
                <Sparkles size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">AI Food Recognition</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Recognize diverse meals from images with our high-accuracy image recognition.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="bg-emerald-50 text-emerald-600 p-3 h-fit rounded-xl">
                <Apple size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Nutrition Analysis</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Retrieve calories, carbs, fats, protein, and fiber counts for scanned food items.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="bg-emerald-50 text-emerald-600 p-3 h-fit rounded-xl">
                <BarChart3 size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Daily Calorie Tracking</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Log daily calorie consumption against targets using an interactive progress dashboard.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="bg-emerald-50 text-emerald-600 p-3 h-fit rounded-xl">
                <ListCollapse size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Meal History Journal</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Revisit your logged breakfasts, lunches, and snacks with pagination and search tools.</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="bg-emerald-50 text-emerald-600 p-3 h-fit rounded-xl">
                <ScanLine size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Multiple Food Detection</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Supports complex composite meals with multiple items, like dal + paneer + salad.</p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex gap-4 p-5 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="bg-emerald-50 text-emerald-600 p-3 h-fit rounded-xl">
                <Apple size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">Personalized Dashboard</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Configurable calorie goal settings that adapt to your fitness objective changes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Start Tracking Your Nutrition Today
          </h2>
          <p className="text-emerald-100 max-w-lg mx-auto leading-relaxed">
            Join thousands of health enthusiasts. Transform your smartphone into a smart food scanner and start eating right.
          </p>
          <div>
            <Link
              to={isAuthenticated ? '/analyze' : '/signup'}
              className="inline-block bg-white hover:bg-emerald-50 text-emerald-600 font-bold px-8 py-4 rounded-2xl shadow-2xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
