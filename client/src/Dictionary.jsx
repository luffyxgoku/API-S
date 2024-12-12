import React, { useState } from "react";
import axios from "axios";

export default function Dictionary() {
  const [meanings, setMeanings] = useState();

  const [word, setWord] = useState("");

  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      console.log(result.data[0].meanings);
      setMeanings(result.data[0].meanings);
    } catch (error) {
      console.log("error", err);
    }
  };

  return (
    <>
      <h1>Dictionary API</h1>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button onClick={handleSearch}>Submit</button>
      {meanings &&
        meanings.map((meaning, index) => (
          <div key={index}>
            <p>
              {`${word} ${index}: (${meaning.partOfSpeech}) ${meaning.definitions[0].definition}`}
            </p>
          </div>
        ))}
    </>
  );
}
