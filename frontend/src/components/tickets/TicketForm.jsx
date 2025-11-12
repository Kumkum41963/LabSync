import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const TicketForm = ({ initialData = {}, onSubmit, mode = "create" }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "open",
    tags: "",
  });

  // Prefill data in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "low",
        status: initialData.status || "open",
        tags: initialData.tags?.join(", ") || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    onSubmit(formattedData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#0d1117] border border-slate-800 rounded-2xl shadow-xl shadow-slate-900/30 p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
        {mode === "create" ? "🎫 Raise a New Ticket" : "✏️ Edit Ticket"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-gray-300 mb-2 block">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter ticket title"
            value={formData.title}
            onChange={handleChange}
            className="bg-[#111827] border-slate-700 text-gray-100 placeholder-gray-500 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-gray-300 mb-2 block">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the issue or request"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="bg-[#111827] border-slate-700 text-gray-100 placeholder-gray-500 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Priority + Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="priority" className="text-gray-300 mb-2 block">
              Priority
            </Label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full bg-[#111827] border border-slate-700 text-gray-100 rounded-lg p-2.5 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <Label htmlFor="status" className="text-gray-300 mb-2 block">
              Status
            </Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-[#111827] border border-slate-700 text-gray-100 rounded-lg p-2.5 focus:ring-indigo-500"
            >
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags" className="text-gray-300 mb-2 block">
            Tags (comma separated)
          </Label>
          <Input
            id="tags"
            name="tags"
            placeholder="e.g. network, printer, urgent"
            value={formData.tags}
            onChange={handleChange}
            className="bg-[#111827] border-slate-700 text-gray-100 placeholder-gray-500 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-md shadow-indigo-900/30
              ${mode === "create"
                ? "bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-500 hover:to-blue-600"
                : "bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600"
              } text-white`}
          >
            {mode === "create" ? "Create Ticket" : "Update Ticket"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
