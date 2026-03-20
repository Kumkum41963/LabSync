import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TicketForm({ onSubmit, submitLabel = "Submit", loading = false, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
  });

  // set the form state on very initial mount in case of updates
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  // Pass or submit the form data 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit(form) // literally passes thr form to handleCreate (for truly that what onSubmit is)
      if (!initialData) {
        setForm({ title: "", description: "" });
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          name="title" // a key indicator
          value={form.title}
          onChange={handleChange}
          placeholder="Short ticket title"
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
          placeholder="Describe the issue..."
          required
        />
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading}>
        {loading ? "Creating Ticket..." : submitLabel}
      </Button>
    </form>
  );
}