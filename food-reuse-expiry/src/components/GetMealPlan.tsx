import React, { useState } from "react";
import parseCSVAndStoreEmbeddings from '../llm/parseCSV';
import generateResponseWithRAG from '../llm/ragQuery';

const RAGQueryComponent = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    setLoading(true);

    try {
      // Replace with the path to your CSV file and perform RAG
      const vectorStore = await parseCSVAndStoreEmbeddings("path/to/your.csv");
      const ragResponse = await generateResponseWithRAG(query, vectorStore);

      setResponse(ragResponse);
    } catch (error) {
      console.error("Error performing RAG:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Ask a Question:</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
      />
      <button onClick={handleQuery} disabled={loading}>
        {loading ? "Loading..." : "Ask"}
      </button>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default RAGQueryComponent;
