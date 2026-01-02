"use client";

import { useState } from "react";

export default function CompletionPage() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const complete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrompt("");
    try {
      const response = await fetch("/api/completidon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setCompletion(data.text);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Some thing went wrong !");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto">
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <div className="text-red-500">{error}</div>}
      {!isLoading && completion && <div>{completion}</div>}
      <form
        onSubmit={complete}
        className="fixed w-full bottom-0 max-w-md left-0 right-0 p-4 mx-auto"
      >
        <div className="flex gap-1">
          <input
            type="text"
            value={prompt}
            className="flex-1 px-2 border"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
