import React, { useState } from 'react';
import { X, User, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function TicketDetailDrawer({ ticket, isOpen, onClose, onUpdateTicket }) {
    const [newNote, setNewNote] = useState('');
    const [status, setStatus] = useState(ticket?.status || 'Open');
    const [isUpdating, setIsUpdating] = useState(false);

    if (!isOpen || !ticket) return null;

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!status && !newNote.trim()) return;

        setIsUpdating(true);
        try {
            await onUpdateTicket(ticket.id, {
                status: status,
                note_text: newNote.trim() || undefined,
            });
            setNewNote('');
        } catch {
            alert('Failed to update ticket.');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm">
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">

                    {/* Header */}
                    <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="font-mono text-xs font-bold bg-indigo-600 px-2.5 py-1 rounded text-white">
                                {ticket.id}
                            </span>
                            <h2 className="font-semibold text-base truncate max-w-[200px]">{ticket.subject}</h2>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Drawer Body */}
                    <div className="p-6 overflow-y-auto flex-1 space-y-6">

                        {/* Customer Details */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-slate-700">
                                <User className="w-4 h-4 text-indigo-500" />
                                <span className="font-semibold">{ticket.customer_name}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-slate-500">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <span>{ticket.customer_email}</span>
                            </div>
                        </div>

                        {/* Ticket Description */}
                        <div>
                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Issue Description</h4>
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                                {ticket.description}
                            </div>
                        </div>

                        {/* Status & Priority Meta */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                                <span className="block text-[11px] font-semibold text-slate-400 uppercase">Priority</span>
                                <span className="text-sm font-bold text-slate-800">{ticket.priority}</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                                <span className="block text-[11px] font-semibold text-slate-400 uppercase">Status</span>
                                <span className="text-sm font-bold text-indigo-600">{ticket.status}</span>
                            </div>
                        </div>

                        {/* Internal Notes History */}
                        <div>
                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-1">
                                <MessageSquare className="w-4 h-4 text-indigo-500" />
                                <span>Internal Notes ({ticket.notes?.length || 0})</span>
                            </h4>

                            {ticket.notes && ticket.notes.length > 0 ? (
                                <div className="space-y-3">
                                    {ticket.notes.map((note) => (
                                        <div key={note.id} className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3.5 text-xs text-amber-900">
                                            <p className="leading-relaxed">{note.note_text}</p>
                                            <span className="block mt-2 text-[10px] text-amber-700/70 font-mono">
                                                {new Date(note.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400 italic">No internal notes added yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Footer Form: Status Update & Add Note */}
                    <form onSubmit={handleUpdate} className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Update Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Add Note</label>
                            <textarea
                                rows={2}
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Type an internal note..."
                                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-xs font-semibold transition disabled:opacity-50 shadow-md"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{isUpdating ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}
