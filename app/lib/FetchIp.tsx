import React, { useEffect } from "react";

const FetchIp: React.FC<{ onFetch: (ip: string) => void }> = ({ onFetch }) => {
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        onFetch(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, [onFetch]);

  return null;
};

export default FetchIp;
