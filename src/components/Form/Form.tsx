import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import { useState, type FormEvent } from "react";

import style from "./Form.module.css";

interface FormProps {
    onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (query.trim() === "") {
            toast.error("Please enter a search query.");
            return;
        }
        onSubmit(query);
        setQuery("");
    };

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <input
                className={style.input}
                placeholder="What do you want to write?"
                name="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button className={style.button} type="submit">
                <FiSearch size="16px" />
            </button>
        </form>
    );
}
