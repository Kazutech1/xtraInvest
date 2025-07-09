import { useEffect } from 'react';

const ZohoChat = () => {
  useEffect(() => {
    // Avoid adding the script multiple times
    if (window.$zoho) return;

    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || { ready: function () {} };

    const script = document.createElement('script');
    script.id = 'zsiqscript';
    script.src = 'https://salesiq.zohopublic.com/widget?wc=siq33c1ac8206a04cba0bd9e24573ef97705af83a5d29ad154003b0d31c3043e9ed';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Optional: cleanup if needed
      const existingScript = document.getElementById('zsiqscript');
      if (existingScript) {
        existingScript.remove();
        delete window.$zoho;
      }
    };
  }, []);

  return null; // No UI, just script injection
};


export default ZohoChat;
