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

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <>
      <Navbar userEmail={userEmail} />
      <main className="min-h-screen py-8 relative">
        <div className="container relative z-10">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Welcome Back! 
            </h1>
            <p className="text-gray-300">Manage your tasks and boost your productivity</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 text-sm font-semibold">Total Tasks</p>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>

            <div className="glass-card p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 text-sm font-semibold">Pending</p>
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/50">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.pending}</p>
            </div>

            <div className="glass-card p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 text-sm font-semibold">In Progress</p>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
            </div>

            <div className="glass-card p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-300 text-sm font-semibold">Completed</p>
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{stats.completed}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sidebar - Create Task */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">Create New Task</h2>
                </div>
                <TaskForm onTaskAdded={handleTaskAdded} />
              </div>
            </div>

            {/* Main Content - Tasks List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Filter Tasks</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Status</label>
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
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Priority</label>
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
              </div>

              {/* Tasks */}
              {loading ? (
                <div className="glass-card p-12 text-center">
                  <div className="flex justify-center mb-4">
                    <svg className="animate-spin h-12 w-12 text-purple-500" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg">Loading your tasks...</p>
                </div>
              ) : tasks.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No tasks yet</h3>
                  <p className="text-gray-300">Create your first task to get started on your journey!</p>
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
