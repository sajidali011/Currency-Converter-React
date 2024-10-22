import React from 'react';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setExchangeRate(response.data.rates);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });
  }, [fromCurrency]);

  useEffect(() => {
    const conversionRate = exchangeRate[toCurrency];
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchangeRate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'amount':
        setAmount(value);
        break;

      case 'fromCurrency':
        setFromCurrency(value);
        break;

      case 'toCurrency':
        setToCurrency(value);
        break;

      default:
        break;
    }
  };

  return (
    <div className='card'>
      <h1 className='heading'>Currency Converter</h1>

      <div className='input_row'>
        {/* Input container 1 */}
        <div className='input_container'>
          <label className="input_label">Amount:</label>
          <input
            type='number'
            name='amount'
            value={amount}
            className='input_field'
            onChange={handleChange}
          />
        </div>

        {/* Input container 2 */}
        <div className='input_container'>
          <label className="input_label">From Currency:</label>
          <select
            name="fromCurrency"
            value={fromCurrency}
            onChange={handleChange}
            className='input_field'
          >
            {Object.keys(exchangeRate).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Input container 3 */}
        <div className='input_container'>
          <label className="input_label">To Currency:</label>
          <select
            name="toCurrency"
            value={toCurrency}
            onChange={handleChange}
            className='input_field'
          >
            {Object.keys(exchangeRate).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="output">
        <h2>Converted Amount: <b>{convertedAmount}</b></h2>
      </div>
    </div>
  );
}

export default App;
