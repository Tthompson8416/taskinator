import React from 'react';
import { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';

// Enhanced Taskinator component with modern UI/UX improvements
const Taskinator = () => {
  // State management for tasks and form
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskType, setTaskType] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  
  // Animation states for task transitions
  const [animatingTaskId, setAnimatingTaskId] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !taskType) return;

    if (editingTaskId) {
      setTasks(tasks.map(task => 
        task.id === editingTaskId 
          ? { ...task, name: taskName, type: taskType }
          : task
      ));
      setEditingTaskId(null);
    } else {
      setTasks([...tasks, {
        id: Date.now(),
        name: taskName,
        type: taskType,
        status: 'to do'
      }]);
    }

    setTaskName('');
    setTaskType('');
  };

  // Enhanced status change handler with animation
  const handleStatusChange = (taskId, newStatus) => {
    setAnimatingTaskId(taskId);
    setTimeout(() => {
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
      setAnimatingTaskId(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced header with gradient background */}
      <header className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-4">Taskinator</h1>
        
        {/* Improved form with modern styling */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:flex md:gap-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter Task Name"
            className="w-full md:w-1/3 p-3 rounded-lg border-2 border-transparent focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="w-full md:w-1/3 p-3 rounded-lg border-2 border-transparent focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            <option value="">Select Task Type</option>
            <option value="Print">Print</option>
            <option value="Web">Web</option>
            <option value="Mobile">Mobile</option>
          </select>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-white text-blue-500 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            {editingTaskId ? 'Save Task' : 'Add Task'}
          </button>
        </form>
      </header>

      {/* Task columns with improved layout and animations */}
      <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {['to do', 'in progress', 'completed'].map((status) => (
          <div key={status} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {status === 'to do' ? 'Tasks To Do' : 
               status === 'in progress' ? 'In Progress' : 
               'Completed'}
            </h2>
            
            <div className="space-y-4">
              {tasks
                .filter(task => task.status === status)
                .map(task => (
                  <div
                    key={task.id}
                    className={`
                      p-4 rounded-lg border-2 border-gray-200
                      ${animatingTaskId === task.id ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
                      ${status === 'completed' ? 'bg-green-50' : 'bg-blue-50'}
                      transition-all duration-300
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{task.name}</h3>
                        <span className="text-sm text-gray-600">{task.type}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setTaskName(task.name);
                            setTaskType(task.type);
                            setEditingTaskId(task.id);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Enhanced status selector */}
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="mt-3 w-full p-2 text-sm rounded-md border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="to do">To Do</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Modern footer */}
      <footer className="bg-gray-800 text-white p-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Taskinator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Taskinator;