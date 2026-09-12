import React from 'react';
import { Search, RefreshCw } from 'lucide-react';

export default function SearchFilterBar({
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    onRefresh,
    isLoading,
}) {
    const statuses = ['All', 'Open', 'In Progress', 'Closed'];

    return (
        <div className="bg-white border-b border-slate-200 p-4 shadow-sm mb-6 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Left: Search Bar */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tickets by ID, customer name, email, or subject..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                </div>

                {/* Right: Status Filters & Refresh Button */}
                <div className="flex items-center space-x-3 overflow-x-auto pb-1 md:pb-0">
                    <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
                        {statuses.map((status) => {
                            const value = status === 'All' ? '' : status;
                            const isActive = selectedStatus === value;
                            return (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(value)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${isActive
                                            ? 'bg-white text-indigo-600 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                                        }`}
                                >
                                    {status}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={onRefresh}
                        disabled={isLoading}
                        className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition active:scale-95 disabled:opacity-50"
                        title="Refresh List"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
                    </button>
                </div>
            </div>
        </div>
    );
}
