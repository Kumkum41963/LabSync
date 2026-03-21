import React, { useState } from "react";
import { X } from "lucide-react";

export const TagInput = ({ tags = [], setTags, placeholder = "Add tag...." }) => {
    const [inputValue, setInputValue] = useState(""); // state for current typed input tag

    const addTag = (tag) => {
        const cleanTag = tag.replace(/,/g, "").trim().toLowerCase(); // clean by trim and lowercase for consistency
        if (cleanTag && !tags.includes(cleanTag)) {
            setTags([...tags, cleanTag]) // add new tag to existing arr. if not exist already
        }
        setInputValue("")
    };

    const removeTag = (indexToRemove) => {
        // filter from array where idx not as idx to remove
        setTags(tags.filter((_, idx) => idx !== indexToRemove))
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            // Remove last idx tag if backspacing on empty input
            removeTag(tags.length - 1);
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
    };

    return (
        <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background focus-within:ring-2 focus-within:ring-ring transition-all">
            {/* Visual Pills */}
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-md"
                >
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="hover:text-destructive transition-colors"
                    >
                        <X size={12} />
                    </button>
                </span>
            ))}

            {/* The Actual Input */}
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={tags.length === 0 ? placeholder : ""}
                className="flex-1 min-w-[120px] bg-transparent outline-none text-sm py-1"
            />
        </div>
    );
};