import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TagInput } from "./TagInput";
import { useNavigate } from "react-router-dom";

export default function TicketForm({ onSubmit, submitLabel = "Submit", loading = false, initialData }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    tags: initialData?.tags || []
  });

  const ticketId = initialData?._id;

  // Pass or submit the form data 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit(form) // literally passes thr form to handleCreate (for truly that what onSubmit is)
      if (!initialData) {
        setForm({ title: "", description: "", tags: [] });
      }
      if (ticketId) {
        navigate(`/tickets/${ticketId}`);
      } else {
        // Fallback if no ID is found
        navigate('/tickets');
      }
    } catch (error) {
      console.error("Form submission failed, keeping data:", error);
    }

  }

  // When input changes also update the form state
  const handleChange = async (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Pass a typed tag input to save into tags array in form state
  const setTags = (newTag) => setForm((prev) => ({ ...prev, tags: newTag }))

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          name="title" // a key indicator
          value={form.title}
          onChange={handleChange}
          placeholder="Ticket title...."
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          name="description" // a key indicator
          rows={5}
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the issue...."
          required
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <TagInput
          tags={form.tags}
          setTags={setTags} // a fxn that takes currently typed tag and stores to atual state
          placeholder="Type hardware, microcontroller...."
        />
        <p className="text-[11px] text-muted-foreground italic">
          Tip: Press comma or enter to save a tag.
        </p>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading}>
        {loading ? "Processing..." : submitLabel}
      </Button>
    </form>
  );
}