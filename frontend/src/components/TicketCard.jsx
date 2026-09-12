import React from 'react';
import { Clock, MessageSquare, User } from 'lucide-react';

export default function TicketCard({ ticket, onSelectTicket }) {
    // Format SLA deadline remaining time with UTC handling
    const getSlaStatus = (deadlineStr) => {
        if (!deadlineStr) return null;

        // Force ISO string to be treated as UTC if missing timezone offset
        const formattedStr = deadlineStr.endsWith('Z') || deadlineStr.includes('+')
            ? deadlineStr
            : `${deadlineStr}Z`;

        const deadline = new Date(formattedStr);
        const now = new Date();
        const diffMs = deadline - now;

        if (diffMs <= 0) {
            return { label: 'SLA Breached', color: 'bg-rose-100 text-rose-700 border-rose-300', isBreached: true };
        }
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return {
            label: `${diffHours}h ${diffMins}m left`,
            color: diffHours < 2 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-slate-100 text-slate-700 border-slate-300',
            isBreached: false,
        };
    };

    const sla = getSlaStatus(ticket.sla_deadline);

    // Status Styling
    const statusStyles = {
        'Open': 'bg-blue-50 text-blue-700 border-blue-200',
        'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
        'Closed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };

    // Priority Styling
    const priorityStyles = {
        'Urgent': 'bg-rose-500 text-white font-bold',
        'High': 'bg-orange-500 text-white',
        'Medium': 'bg-indigo-500 text-white',
        'Low': 'bg-slate-500 text-white',
    };

    return (
        <div
            onClick={() => onSelectTicket(ticket)}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition cursor-pointer flex flex-col justify-between group"
        >
            <div>
                {/* Header: ID + Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-md border border-slate-200">
                            {ticket.id}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${statusStyles[ticket.status] || 'bg-slate-100'}`}>
                            {ticket.status}
                        </span>
                    </div>

                    <span className={`text-xs px-2 py-0.5 rounded-md font-semibold ${priorityStyles[ticket.priority]}`}>
                        {ticket.priority}
                    </span>
                </div>

                {/* Subject & Description */}
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition line-clamp-1 mb-1">
                    {ticket.subject}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {ticket.description}
                </p>
            </div>

            {/* Footer Info */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-1 font-medium text-slate-700 truncate max-w-[180px]">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{ticket.customer_name}</span>
                </div>

                <div className="flex items-center space-x-3">
                    {/* Internal Notes Counter */}
                    {ticket.notes && ticket.notes.length > 0 && (
                        <div className="flex items-center space-x-1 text-slate-500">
                            <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{ticket.notes.length}</span>
                        </div>
                    )}

                    {/* SLA Timer */}
                    {sla && (
                        <div className={`flex items-center space-x-1 px-2 py-0.5 rounded border text-[11px] font-medium ${sla.color}`}>
                            <Clock className="w-3 h-3" />
                            <span>{sla.label}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}