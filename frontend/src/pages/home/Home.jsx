import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useTodos from "../../hooks/useTodos";

const Home = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const {
    todos,
    loading,
    addTodo,
    loadTodos,
    toggleTodo,
    updateTodo,
    deleteTodo,
    stats,
  } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (authUser?._id) {
      loadTodos(authUser._id);
    }
  }, [authUser?._id, loadTodos]);

  const handleLogout = () => {
    localStorage.removeItem("todo-user");
    setAuthUser(null);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    await addTodo(newTodo, authUser._id);
    setNewTodo("");
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 py-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='mx-auto h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4'>
            <svg
              className='h-10 w-10 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
              />
            </svg>
          </div>
          <h1 className='text-4xl font-extrabold text-gray-900'>
            Welcome back, {authUser?.email || "User"}!
          </h1>
          <p className='mt-2 text-lg text-gray-600'>
            Manage your tasks and stay organized
          </p>
        </div>

        {/* User Actions */}
        <div className='flex justify-between items-center mb-8'>
          <div className='text-sm text-gray-600'>
            <span>Signed in as </span>
            <span className='font-medium text-indigo-600'>
              {authUser?.email}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
          >
            <svg
              className='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
            Sign Out
          </button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Add Todo Form */}
          <div className='lg:col-span-1'>
            <div className='bg-white py-6 px-6 shadow-xl rounded-lg'>
              <h2 className='text-xl font-bold text-gray-900 mb-4'>
                Add New Todo
              </h2>
              <form onSubmit={handleAddTodo} className='space-y-4'>
                <div>
                  <label
                    htmlFor='new-todo'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    What needs to be done?
                  </label>
                  <textarea
                    id='new-todo'
                    name='new-todo'
                    rows={3}
                    required
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-none'
                    placeholder='Enter your todo item...'
                  />
                </div>
                <button
                  type='submit'
                  disabled={loading || !newTodo.trim()}
                  className='w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out'
                >
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                  Add Todo
                </button>
              </form>
            </div>

            {/* Stats Card */}
            <div className='mt-6 bg-white py-6 px-6 shadow-xl rounded-lg'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Statistics
              </h3>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>Total Tasks</span>
                  <span className='text-lg font-bold text-gray-900'>
                    {stats.total}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>Completed</span>
                  <span className='text-lg font-bold text-green-600'>
                    {stats.completed}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-gray-600'>Pending</span>
                  <span className='text-lg font-bold text-orange-500'>
                    {stats.pending}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Todos List */}
          <div className='lg:col-span-2'>
            <div className='bg-white py-6 px-6 shadow-xl rounded-lg'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-gray-900'>Your Todos</h2>
                {todos.length > 0 && (
                  <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'>
                    {todos.length} {todos.length === 1 ? "item" : "items"}
                  </span>
                )}
              </div>

              {todos.length === 0 ? (
                <div className='text-center py-12'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                    />
                  </svg>
                  <h3 className='mt-2 text-sm font-medium text-gray-900'>
                    No todos yet
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    Get started by creating your first todo item.
                  </p>
                </div>
              ) : (
                <div className='space-y-3'>
                  {todos.map((todo) => (
                    <div
                      key={todo._id}
                      className={`flex items-start space-x-3 p-4 border rounded-lg transition duration-150 ease-in-out ${
                        todo.completed
                          ? "bg-gray-50 border-gray-200"
                          : "bg-white border-gray-300 hover:border-indigo-300"
                      }`}
                    >
                      <button
                        onClick={() => toggleTodo(todo._id)}
                        className={`flex-shrink-0 mt-1 h-5 w-5 rounded border-2 transition duration-150 ease-in-out ${
                          todo.completed
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 hover:border-indigo-500"
                        }`}
                      >
                        {todo.completed && (
                          <svg
                            className='h-3 w-3 text-white m-0.5'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        )}
                      </button>
                      <div className='flex-1 min-w-0'>
                        <p
                          className={`text-sm transition duration-150 ease-in-out ${
                            todo.completed
                              ? "text-gray-500 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {todo.text}
                        </p>
                        <p className='text-xs text-gray-400 mt-1'>
                          {new Date(todo.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className='flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition duration-150 ease-in-out'
                      >
                        <svg
                          className='h-4 w-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
