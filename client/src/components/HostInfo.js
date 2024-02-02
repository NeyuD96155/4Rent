// HostInfo.js
import React from 'react';

const HostInfo = ({ host }) => {
  return (
    <div>
      <p>Host Name: {host.name}</p>
      <p>Contact Info: {host.contact}</p>
      <p>Response Time: {host.responseTime}</p>
    </div>
  );
};

export default HostInfo;
