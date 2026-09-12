import React from 'react';
import { ShieldCheck, PlusCircle, Activity } from 'lucide-react';

export default function Navbar({ onOpenCreateModal, metrics }) {
    return (
        <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Left: Branding */}
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-md">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight leading-tight">SupportHub CRM</h1>
                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>API Connected</span>
                        </div>
                    </div>
                </div>

                {/* Center: Quick Live Stats */}
                <div className="hidden md:flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2 bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-700/50">
                        <Activity className="w-4 h-4 text-indigo-400" />
                        <span className="text-slate-400">Total:</span>
                        <span className="font-semibold text-white">{metrics.total}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-700/50">
                        <span className="text-slate-400">Open:</span>
                        <span className="font-semibold text-amber-400">{metrics.open}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-700/50">
                        <span className="text-slate-400">Urgent SLA:</span>
                        <span className="font-semibold text-rose-400">{metrics.urgent}</span>
                    </div>
                </div>

                {/* Right: New Ticket Action Button */}
                <button
                    onClick={onOpenCreateModal}
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-150 shadow-md hover:shadow-indigo-500/20 active:scale-95"
                >
                    <PlusCircle className="w-4 h-4" />
                    <span>New Ticket</span>
                </button>
            </div>
        </header>
    );
}