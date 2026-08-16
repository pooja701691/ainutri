import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { getDashboardSummary, getFoodHistory } from '../services/foodService.js';
import { Flame, Dumbbell, Wheat, Droplets, Plus, Calendar, Sparkles } from 'lucide-react';
import NutritionCard from '../components/NutritionCard.jsx';
import MealCard from '../components/MealCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [todaysMeals, setTodaysMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Aggregated Totals
      const summaryRes = await getDashboardSummary();
      if (summaryRes && summaryRes.success) {
        setSummary(summaryRes.data);
      }

      // 2. Fetch history and filter today's entries
      const historyRes = await getFoodHistory(1, 20); // Get recent logs
      if (historyRes && historyRes.success) {
        const todayStr = new Date().toDateString();
        const filtered = historyRes.data.foods.filter(
          (meal) => new Date(meal.createdAt).toDateString() === todayStr
        );
        setTodaysMeals(filtered);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast.error('Could not refresh dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Get User limits
  const calorieGoal = summary?.calorieGoal || user?.dailyCalorieGoal || 2000;
  const proteinGoal = 100; // standard estimation
  const carbsGoal = 250;
  const fatGoal = 65;

  const currentCalories = summary?.calories || 0;
  const currentProtein = summary?.protein || 0;
  const currentCarbs = summary?.carbs || 0;
  const currentFat = summary?.fat || 0;

  // Chart Data preparation
  const chartData = [
    {
      name: 'Protein (g)',
      Logged: Math.round(currentProtein),
      Target: proteinGoal
    },
    {
      name: 'Carbs (g)',
      Logged: Math.round(currentCarbs),
      Target: carbsGoal
    },
    {
      name: 'Fat (g)',
      Logged: Math.round(currentFat),
      Target: fatGoal
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 border border-slate-100 rounded-3xl shadow-sm">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold text-slate-850">
            Good morning, {user?.name || 'Friend'} 👋
          </h2>
          <p className="text-slate-500 text-sm">
            Here's your nutritional summaries and calorie intakes logs for today.
          </p>
        </div>

        <Link
          to="/analyze"
          className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5 duration-200"
        >
          <Plus size={16} />
          <span>Analyze Food</span>
        </Link>
      </div>

      {/* Grid: Macro Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <NutritionCard
          label="Calories"
          value={currentCalories}
          goal={calorieGoal}
          unit="kcal"
          icon={Flame}
          color="amber"
        />
        <NutritionCard
          label="Protein"
          value={currentProtein}
          goal={proteinGoal}
          unit="g"
          icon={Dumbbell}
          color="emerald"
        />
        <NutritionCard
          label="Carbs"
          value={currentCarbs}
          goal={carbsGoal}
          unit="g"
          icon={Wheat}
          color="blue"
        />
        <NutritionCard
          label="Fat"
          value={currentFat}
          goal={fatGoal}
          unit="g"
          icon={Droplets}
          color="rose"
        />
      </div>

      {/* Graphic Visualization Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recharts graph */}
        <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg">Daily Macronutrient Targets</h3>
            <p className="text-xs text-slate-400 mt-1">Comparison of logged intake against standard guidelines.</p>
          </div>

          <div className="w-full h-64 select-none">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    borderColor: '#f1f5f9',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                <Bar dataKey="Logged" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={45} />
                <Bar dataKey="Target" fill="#e2e8f0" radius={[8, 8, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Today's Meals list */}
        <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg">Today's Meals</h3>
              <p className="text-xs text-slate-400 mt-1">Meals logged so far today.</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Calendar size={12} />
              <span>Today</span>
            </span>
          </div>

          {/* Meals list list container */}
          <div className="flex-grow overflow-y-auto max-h-[260px] pr-1 space-y-3.5 scrollbar-thin">
            {todaysMeals.length > 0 ? (
              todaysMeals.map((meal) => (
                <div key={meal._id || meal.id} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0 group">
                  <div className="flex items-center space-x-3.5 truncate">
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                      <img src={meal.imageUrl} alt={meal.mealType} className="w-full h-full object-cover" />
                    </div>
                    <div className="truncate">
                      <h4 className="font-bold text-slate-800 text-sm line-clamp-1">
                        {meal.foodItems?.map((i) => i.name).join(', ')}
                      </h4>
                      <span className="text-[10px] font-semibold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {meal.mealType}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 flex items-center space-x-3">
                    <div>
                      <p className="font-extrabold text-slate-850 text-sm">{Math.round(meal.totalNutrition?.calories || 0)} kcal</p>
                      <p className="text-[10px] text-slate-400">Protein: {Math.round(meal.totalNutrition?.protein || 0)}g</p>
                    </div>
                    <Link
                      to={`/food/${meal._id || meal.id}`}
                      className="p-2 text-slate-450 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-colors"
                      title="View Details"
                    >
                      <Plus size={16} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col justify-center items-center py-10 space-y-2 text-center">
                <span className="text-2xl">🍽️</span>
                <p className="text-sm font-semibold text-slate-550">No meals logged yet today.</p>
                <Link to="/analyze" className="text-xs font-bold text-emerald-500 hover:text-emerald-600">
                  Scan a food photo
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
