import { useState } from 'react';
import './App.css';

function App() {
  const [emailData, setEmailData] = useState({ to: '', subject: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    setError(''); 

    try {
      const response = await fetch('http://localhost:5000/send-email', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        data = null;
      }

      if (response.ok) {
        alert('Email sent successfully');
        setEmailData({ to: '', subject: '', text: '' }); 
      } else {
        setError('Error sending email: ' + (data?.message || 'Unknown error'));
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <h1>Send an Email</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Recipient Email"
          value={emailData.to}
          onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={emailData.subject}
          onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
          required
        />
        <textarea
          placeholder="Message"
          value={emailData.text}
          onChange={(e) => setEmailData({ ...emailData, text: e.target.value })}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Email'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default App;
