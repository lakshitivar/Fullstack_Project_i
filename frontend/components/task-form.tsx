'use client';

import { useState } from 'react';
import apiClient from '@/lib/api';
import { Task } from '@/app/dashboard/page';

interface TaskFormProps {
  onTaskAdded: (task: Task) => void;
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/tasks', formData);
      onTaskAdded(response.data);
      setFormData({ title: '', description: '', priority: 'medium' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task title..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task description..."
          rows={3}
          className="resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Priority</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-primary hover:bg-blue-600 disabled:bg-slate-700 text-white rounded-lg font-semibold transition-colors"
      >
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
}
