import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open',
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },

  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },

  deadline: {
    type: Date,
    default: null,
  },

  helpfulNotes: {
    type: String,
    default: '',
  },

  relatedSkills: {
    type: [String], // e.g., ['React', 'MongoDB', 'DP']
    default: [],
  }

}, {
  timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
