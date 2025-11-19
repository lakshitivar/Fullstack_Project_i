'use client';

import { useState } from 'react';
import apiClient from '@/lib/api';
import { Task } from '@/app/dashboard/page';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
  });
  const [loading, setLoading] = useState(false);

  const priorityColors = {
    low: 'bg-blue-500/10 text-blue-400',
    medium: 'bg-yellow-500/10 text-yellow-400',
    high: 'bg-red-500/10 text-red-400',
  };

  const statusBadgeColors = {
    pending: 'bg-slate-500/10 text-slate-400',
    'in-progress': 'bg-blue-500/10 text-blue-400',
    completed: 'bg-green-500/10 text-green-400',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await apiClient.put(`/tasks/${task._id}`, formData);
      onTaskUpdated(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiClient.delete(`/tasks/${task._id}`);
        onTaskDeleted(task._id);
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="bg-card border border-slate-700 rounded-lg p-4 space-y-3">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full text-lg font-semibold"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full resize-none"
        />

        <div className="grid grid-cols-2 gap-3">
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex-1 py-2 bg-secondary hover:bg-green-600 disabled:bg-slate-700 text-white rounded font-semibold transition-colors"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="flex-1 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-1 break-words">{task.title}</h3>
          {task.description && (
            <p className="text-slate-400 text-sm mb-3 break-words">{task.description}</p>
          )}

          <div className="flex flex-wrap gap-2 items-center">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeColors[task.status]}`}>
              {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-primary hover:bg-blue-600 text-white rounded text-sm font-semibold transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-accent hover:bg-red-600 text-white rounded text-sm font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
