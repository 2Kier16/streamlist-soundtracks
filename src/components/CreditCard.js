import React, { useState } from 'react';
import '../css/CreditCard.css';

export default function CreditCard() {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState('');

  const formatCard = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleCardChange = (e) => setCardNumber(formatCard(e.target.value));

  const validate = () => {
    if (!name.trim()) return 'Name is required.';
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) return 'Card number must be 1234 5678 9012 3456.';
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return 'Expiry must be MM/YY.';
    if (!/^\d{3}$/.test(cvv)) return 'CVV must be 3 digits.';
    return '';
  };

  const handleSave = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);

    const payload = { name, cardNumber, expiry, cvv };
    localStorage.setItem('paymentMethod', JSON.stringify(payload));
    setSaved(payload);
    setError('');
  };

  return (
    <div className="credit-card-page">
      <div className="credit-card-form">
        <h2>Checkout — Credit Card</h2>
        <form onSubmit={handleSave}>
          <label>Name on card</label>
          <input
            type="text"
            placeholder="Name on card"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Card number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardChange}
            maxLength={19}
          />

          <label>Expiry (MM/YY)</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            maxLength={5}
          />

          <label>CVV</label>
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
            maxLength={3}
          />

          {error && <div className="error-message">{error}</div>}
          <button type="submit">Save Card</button>
        </form>

        {saved && (
          <div className="saved-card">
            <strong>Saved Card:</strong>
            <div>Name: {saved.name}</div>
            <div>Card: {saved.cardNumber}</div>
            <div>Expiry: {saved.expiry}</div>
          </div>
        )}
      </div>
    </div>
  );
}
