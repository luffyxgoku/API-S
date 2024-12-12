import React, { useState } from "react";
import axios from "axios";

export default function Quotes() {
  const [quoteDetails, setQuoteDetails] = useState([]);

  const category = ["beauty", "anger", "computers"];
  const randomNumber = Math.floor(Math.random() * 3);

  const sendQuotesReq = async () => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/quotes?category=${category[randomNumber]}`,
        {
          headers: {
            "X-Api-Key": "EX6D3SLRtHU/RiqDI4YGQA==ptT2kaNEBlNx58o8",
          },
        }
      );
      // console.log(response);
      setQuoteDetails(response.data);
    } catch (err) {
      console.log("Error fetching the quote:", err);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Quotes API </h1>
      <button onClick={sendQuotesReq}>Show Quotes</button>
      {quoteDetails &&
        quoteDetails.map((detail, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <p>{detail.author}</p>
            <p>{detail.quote}</p>
            <p>{detail.category}</p>
          </div>
        ))}
    </>
  );
}
