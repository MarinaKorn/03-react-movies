import { useState } from "react";
import type { FormEvent } from "react";

import css from "./SearchBar.module.css";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={css.input}
        placeholder="Search movies..."
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}
