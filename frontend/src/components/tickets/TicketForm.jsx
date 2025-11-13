import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const TicketForm = ({ initialData = {}, onSubmit, mode = "create", role = "student" }) => {
  const navigate = useNavigate();

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

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#0b1416] border border-teal-900 rounded-2xl shadow-lg shadow-teal-900/40 p-6 sm:p-8">
      <h2 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent tracking-wide">
        {mode === "create" ? "Raise a New Ticket" : "Edit Ticket"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <Label
            htmlFor="title"
            className="text-cyan-300 mb-2 block font-medium tracking-wide"
          >
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter ticket title"
            value={formData.title}
            onChange={handleChange}
            className="bg-[#0e1d20] border border-teal-800/70 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label
            htmlFor="description"
            className="text-cyan-300 mb-2 block font-medium tracking-wide"
          >
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the issue or request..."
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="bg-[#0e1d20] border border-teal-800/70 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 rounded-lg"
            required
          />
        </div>

        {/* Priority + Status (Admins only) */}
        {role === "admin" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="priority"
                className="text-cyan-300 mb-2 block font-medium tracking-wide"
              >
                Priority
              </Label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-[#0e1d20] border border-teal-800/70 text-gray-100 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <Label
                htmlFor="status"
                className="text-cyan-300 mb-2 block font-medium tracking-wide"
              >
                Status
              </Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-[#0e1d20] border border-teal-800/70 text-gray-100 rounded-lg p-2.5 focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
              >
                <option value="open">Open</option>
                <option value="pending">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        )}

        {/* Tags */}
        <div>
          <Label
            htmlFor="tags"
            className="text-cyan-300 mb-2 block font-medium tracking-wide"
          >
            Tags (comma separated)
          </Label>
          <Input
            id="tags"
            name="tags"
            placeholder="e.g. network, printer, urgent"
            value={formData.tags}
            onChange={handleChange}
            className="bg-[#0e1d20] border border-teal-800/70 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <Button
            type="submit"
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-md shadow-teal-900/40 ${mode === "create"
                ? "bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400"
                : "bg-gradient-to-r from-indigo-500 via-teal-500 to-cyan-500 hover:from-indigo-400 hover:to-teal-400"
              } text-white`}
          >
            {mode === "create" ? "Create Ticket" : "Update Ticket"}
          </Button>

          <Button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 hover:from-gray-600 hover:to-gray-700 transition-all shadow-md shadow-gray-900/30"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
