import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchFilterBar from './components/SearchFilterBar';
import TicketList from './components/TicketList';
import CreateTicketModal from './components/CreateTicketModal';
import TicketDetailDrawer from './components/TicketDetailDrawer';
import { getTickets, createTicket, updateTicket } from './services/api';

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch tickets from API
  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTickets(selectedStatus, searchQuery);
      setTickets(data);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedStatus]);

  // Trigger re-fetch when search or filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTickets();
    }, 300); // 300ms debounce for live search

    return () => clearTimeout(timer);
  }, [fetchTickets]);

  // Handle ticket creation
  const handleCreateTicket = async (formData) => {
    await createTicket(formData);
    await fetchTickets();
  };

  // Handle status/note updates
  const handleUpdateTicket = async (id, updatePayload) => {
    const updated = await updateTicket(id, updatePayload);
    setSelectedTicket(updated);
    await fetchTickets();
  };

  // Calculate live header metrics
  const metrics = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'Open').length,
    urgent: tickets.filter((t) => t.priority === 'Urgent').length,
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Navbar
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        metrics={metrics}
      />

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          onRefresh={fetchTickets}
          isLoading={isLoading}
        />

        <TicketList
          tickets={tickets}
          isLoading={isLoading}
          onSelectTicket={(ticket) => {
            setSelectedTicket(ticket);
            setIsDrawerOpen(true);
          }}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />
      </main>

      {/* Create Modal */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTicket}
      />

      {/* Ticket Detail Drawer */}
      <TicketDetailDrawer
        key={selectedTicket?.id ?? 'no-ticket'}
        ticket={selectedTicket}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedTicket(null);
        }}
        onUpdateTicket={handleUpdateTicket}
      />
    </div>
  );
}
