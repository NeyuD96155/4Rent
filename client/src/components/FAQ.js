// FAQ.js
import React from 'react';

const FAQ = ({ faqs }) => (
  <div>
    <h3>Frequently Asked Questions</h3>
    {faqs.map((faq, index) => (
      <div key={index}>
        <h4>{faq.question}</h4>
        <p>{faq.answer}</p>
      </div>
    ))}
  </div>
);

export default FAQ;
