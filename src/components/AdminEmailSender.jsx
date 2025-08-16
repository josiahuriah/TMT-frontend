// src/components/AdminEmailSender.jsx
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { getApiUrl } from '../config/api';

const AdminEmailSender = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    is_html: false
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const response = await fetch(getApiUrl('/admin/send-email'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        setStatus('success');
        setEmailData({ to: '', subject: '', message: '', is_html: false });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="admin-email-sender">
      <h2>Send Email</h2>
      
      {status === 'success' && (
        <div className="success-message">Email sent successfully!</div>
      )}
      
      {status === 'error' && (
        <div className="error-message">Failed to send email. Please try again.</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>To:</label>
          <Input
            type="email"
            value={emailData.to}
            onChange={(e) => setEmailData({...emailData, to: e.target.value})}
            required
            placeholder="recipient@example.com"
          />
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <Input
            type="text"
            value={emailData.subject}
            onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
            required
            placeholder="Email subject"
          />
        </div>

        <div className="form-group">
          <label>Message:</label>
          <Textarea
            value={emailData.message}
            onChange={(e) => setEmailData({...emailData, message: e.target.value})}
            required
            rows={10}
            placeholder="Your message here..."
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={emailData.is_html}
              onChange={(e) => setEmailData({...emailData, is_html: e.target.checked})}
            />
            Send as HTML
          </label>
        </div>

        <Button type="submit" disabled={sending}>
          {sending ? 'Sending...' : 'Send Email'}
        </Button>
      </form>
    </div>
  );
};

export default AdminEmailSender;