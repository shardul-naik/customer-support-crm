import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

export default function CreateTicketModal({ isOpen, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        subject: '',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            setFormData({ customer_name: '', customer_email: '', subject: '', description: '' });
            onClose();
        } catch {
            alert('Failed to submit ticket. Please check your inputs.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-150">

                {/* Header */}
                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        <h2 className="font-semibold text-base">Submit Support Ticket</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.customer_name}
                            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                            placeholder="e.g. John Doe"
                            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                            Customer Email
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.customer_email}
                            onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                            placeholder="e.g. john@example.com"
                            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                            Subject
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Brief summary of the issue..."
                            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                            Issue Description
                        </label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the issue in detail. Include keywords like 'urgent', 'bug', or 'help' for automatic triage..."
                            className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md transition disabled:opacity-50"
                        >
                            <Send className="w-3.5 h-3.5" />
                            <span>{isSubmitting ? 'Submitting...' : 'Create Ticket'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
