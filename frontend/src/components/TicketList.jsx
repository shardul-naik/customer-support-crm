import React from 'react';
import TicketCard from './TicketCard';
import { Inbox, PlusCircle } from 'lucide-react';

export default function TicketList({ tickets, isLoading, onSelectTicket, onOpenCreateModal }) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse h-48 flex flex-col justify-between">
                        <div>
                            <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
                            <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-full mb-1"></div>
                            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                        </div>
                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (tickets.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Inbox className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">No Tickets Found</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                    There are no tickets matching your search query or status filter.
                </p>
                <button
                    onClick={onOpenCreateModal}
                    className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create New Ticket</span>
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} onSelectTicket={onSelectTicket} />
            ))}
        </div>
    );
}