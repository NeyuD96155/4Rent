// HostInfo.js
import React from 'react';

const HostInfo = ({ host }) => (
  <div>
    <h3>Host Information</h3>
    <p>Name: {host.name}</p>
    <p>Contact: {host.contact}</p>
    <p>Response Time: {host.responseTime}</p>
  </div>
);

export default HostInfo;
