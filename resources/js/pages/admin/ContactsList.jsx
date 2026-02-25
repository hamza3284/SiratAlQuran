import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/admin/contacts');
      setContacts(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <iconify-icon icon="lucide:loader-2" class="animate-spin text-4xl text-[var(--primary)]"></iconify-icon>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Contact Submissions</h1>
        <span className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-sm font-medium">
          {contacts.length} Total
        </span>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="text-center py-20 bg-[var(--background)] rounded-xl border border-dashed border-[var(--border)]">
          <iconify-icon icon="lucide:message-square-off" class="text-5xl text-[var(--muted-foreground)] mb-4"></iconify-icon>
          <p className="text-[var(--muted-foreground)]">No contact submissions yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-[var(--background)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)]/50 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">{contact.name}</h3>
                  <a href={`mailto:${contact.email}`} className="text-[var(--primary)] hover:underline text-sm flex items-center gap-1">
                    <iconify-icon icon="lucide:mail" class="text-xs"></iconify-icon>
                    {contact.email}
                  </a>
                </div>
                <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                  <iconify-icon icon="lucide:calendar" class="text-xs"></iconify-icon>
                  {new Date(contact.created_at).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
                <p className="text-[var(--foreground)] whitespace-pre-wrap leading-relaxed text-sm italic">
                  "{contact.message}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
