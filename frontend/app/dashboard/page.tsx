'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import TaskForm from '@/components/task-form';
import TaskList from '@/components/task-list';
import apiClient from '@/lib/api';
import { isAuthenticated, removeToken } from '@/lib/auth';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      fetchTasks();
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      setUserEmail(response.data.email);
    } catch (err: any) {
      if (err.response?.status === 401) {
        removeToken();
        router.push('/login');
      }
    }
  };

  const fetchTasks = async (status?: string, priority?: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (status && status !== 'all') params.append('status', status);
      if (priority && priority !== 'all') params.append('priority', priority);

      const response = await apiClient.get(`/tasks?${params.toString()}`);
      setTasks(response.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        removeToken();
        router.push('/login');
      }
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks(tasks.filter(t => t._id !== taskId));
  };

  const handleFilterChange = (newFilter: typeof filter) => {
    setFilter(newFilter);
    fetchTasks(newFilter !== 'all' ? newFilter : undefined, priorityFilter !== 'all' ? priorityFilter : undefined);
  };

  const handlePriorityFilterChange = (newPriority: typeof priorityFilter) => {
    setPriorityFilter(newPriority);
    fetchTasks(filter !== 'all' ? filter : undefined, newPriority !== 'all' ? newPriority : undefined);
  };

  return (
    <>
      <Navbar userEmail={userEmail} />
      <main className="min-h-screen py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar - Create Task */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-slate-700 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Create Task</h2>
                <TaskForm onTaskAdded={handleTaskAdded} />
              </div>
            </div>

            {/* Main Content - Tasks List */}
            <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Status Filter */}
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value as any)}
                    className="w-full"
                  >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => handlePriorityFilterChange(e.target.value as any)}
                    className="w-full"
                  >
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-slate-400">Loading tasks...</p>
                </div>
              ) : tasks.length === 0 ? (
                <div className="bg-card border border-slate-700 rounded-lg p-12 text-center">
                  <p className="text-slate-400 mb-2">No tasks yet</p>
                  <p className="text-sm text-slate-500">Create your first task to get started!</p>
                </div>
              ) : (
                <TaskList
                  tasks={tasks}
                  onTaskUpdated={handleTaskUpdated}
                  onTaskDeleted={handleTaskDeleted}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
