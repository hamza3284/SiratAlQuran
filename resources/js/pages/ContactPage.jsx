import React, { useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import api from '../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const response = await api.post('/contact', formData);
      setSuccess(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout>
      <section className="container mx-auto py-24" id="contact">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-[var(--muted-foreground)] mb-8 text-lg">
            Have questions or suggestions? We'd love to hear from you.
          </p>

          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Your Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe" 
                className="w-full p-3 border border-[var(--border)] rounded bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Your Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com" 
                className="w-full p-3 border border-[var(--border)] rounded bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--muted-foreground)]">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?" 
                rows="5" 
                className="w-full p-3 border border-[var(--border)] rounded bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                required
                minLength="10"
              ></textarea>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-900/20 border border-green-900/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="bg-[var(--primary)] text-[var(--primary-foreground)] px-6 py-3 rounded w-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <iconify-icon icon="lucide:loader-2" class="animate-spin"></iconify-icon>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </section>
    </BaseLayout>
  );
}