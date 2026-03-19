import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TicketForm({
  initialValues,
  onSubmit,
  submitLabel = "Submit",
  loading = false,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
    tags: "",
  });

  useEffect(() => {
    if (initialValues) setForm((p) => ({ ...p, ...initialValues }));
  }, [initialValues]);

  const setField = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="Short ticket title"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          rows={5}
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
          placeholder="Describe the issue..."
          required
        />
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading}>
        {loading ? "Please wait..." : submitLabel}
      </Button>
    </form>
  );
}