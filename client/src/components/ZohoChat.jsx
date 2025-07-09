import { useEffect } from "react";

const ZohoChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.defer = true;
    script.src = "https://salesiq.zoho.com/widget";
    script.id = "zsiqscript";
    document.body.appendChild(script);

    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
      widgetcode: "siq33c1ac8206a04cba0bd9e24573ef97705af83a5d29ad154003b0d31c3043e9ed",
      values: {},
      ready: function () {},
    };
  }, []);

  return null;
};

export default ZohoChat;
