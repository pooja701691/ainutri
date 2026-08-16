import React, { useEffect, useState } from 'react';
import { getFoodHistory } from '../services/foodService.js';
import MealCard from '../components/MealCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { Search, Filter, Calendar, ChevronLeft, ChevronRight, Apple } from 'lucide-react';
import toast from 'react-hot-toast';

export const FoodHistory = () => {
  const [meals, setMeals] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 9, total: 0, pages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState('');
  const [mealFilter, setMealFilter] = useState('all');

  const fetchHistory = async (page) => {
    setLoading(true);
    try {
      // Fetch 9 meals per page for a nice 3x3 layout
      const res = await getFoodHistory(page, 9);
      if (res && res.success) {
        setMeals(res.data.foods);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
      toast.error('Could not load your food logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(currentPage);
  }, [currentPage]);

  // Client-side filtering on current page items for search and category
  const filteredMeals = meals.filter((meal) => {
    const foodNamesCombined = meal.foodItems?.map((i) => i.name.toLowerCase()).join(' ') || '';
    const matchesSearch = foodNamesCombined.includes(search.toLowerCase()) || meal.notes?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = mealFilter === 'all' || meal.mealType === mealFilter;
    return matchesSearch && matchesCategory;
  });

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="bg-white p-6 sm:p-8 border border-slate-100 rounded-3xl shadow-sm space-y-1">
        <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
          <Calendar size={26} className="text-emerald-500" />
          <span>Your Meal History</span>
        </h2>
        <p className="text-slate-500 text-sm">
          Browse through all your historical logs, ingredients breakdowns, and macro diaries.
        </p>
      </div>

      {/* Filter panel */}
      <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search e.g. salad, pizza..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 text-xs text-slate-700 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Meal Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <Filter size={12} />
            <span>Filter</span>
          </span>
          <select
            value={mealFilter}
            onChange={(e) => setMealFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 text-xs font-semibold text-slate-600 bg-white"
          >
            <option value="all">All Meals</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
      </div>

      {/* History Grid */}
      {filteredMeals.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal) => (
              <MealCard key={meal._id || meal.id} meal={meal} />
            ))}
          </div>

          {/* Pagination controls */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-6">
              <span className="text-xs font-semibold text-slate-500">
                Page {currentPage} of {pagination.pages} ({pagination.total} total meals)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === pagination.pages}
                  className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon={Apple}
          title="No food logs found"
          description={
            search || mealFilter !== 'all'
              ? 'Try modifying your filters or search terms.'
              : 'Start logging your meals to build your nutrition history diary.'
          }
          buttonText="Scan Your Plate"
        />
      )}
    </div>
  );
};

export default FoodHistory;
