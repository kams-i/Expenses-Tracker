'use client'
import { useState } from "react"
import Image from 'next/image';
const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [totalBudget, setTotalBudget] = useState(0)
  const [showBudgetPrompt, setShowBudgetPrompt] = useState(true);

  const addExpense = (e) => {
    e.preventDefault();
    const newTotalSpent = totalSpent + parseFloat(amount);
    if (newTotalSpent > totalBudget) {
      alert("Budget has been exhausted. This transaction cannot be made.🤡");
      return;
    }

    if (!description.trim() || !amount || !category)
      return alert("Please fill in all fields 😡.");

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
    setCategory('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const clearAllExpenses = () => {
    setExpenses([]);
  }

  const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0);

  const remaining = totalBudget - totalSpent;

  const getCategoryTotals = () => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {})
  };
  return (
    <>
      <div className=" text-black relative">
        <h1 className="text-center font-bold pt-[3rem] text-3xl">💰Expense Tracker</h1>
        <p className="text-center">Keep track of your spending and stay on budget.</p>

        {showBudgetPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full mx-4 text-center">
              <h2 className="text-2xl font-bold mb-4">Set Your Budget😉</h2>
              <p className="mb-4 text-gray-600">Please enter your total budget to get started.</p>
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(parseFloat(e.target.value))}
                className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., ₦2000"
              />
              <button
                onClick={() => {
                  if (totalBudget > 0) {
                    setShowBudgetPrompt(false);
                  } else {

                    alert("Please enter a valid budget amount😡.");
                  }
                }}
                className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Save Budget
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row lg:gap-[1rem] md:w-[100%] md:px-[0.1rem] md:justify-center gap-[1rem] pt-[2rem] px-[6rem]">
          <div className="flex flex-row border-l-7 lg:gap-[3rem] border-green-500 md:gap-[1rem] bg-white rounded-2xl shadow-2xl p-[1rem] justify-between">
            <div>
              <p className="text-lg font-light">Total Budget</p>
              <p className="text-2xl font-bold">₦{totalBudget.toFixed(2)}</p>
            </div>
            <div className="rounded-full bg-green-200 p-[0.1rem]">
              <p className="text-4xl font-bold mt-[0.5rem] md:mt-[0.1rem] px-[0.3rem]">💳</p>
            </div>
          </div>
          <div className="flex flex-row border-l-7 lg:gap-[3rem] border-red-500 md:gap-[1rem] bg-white rounded-2xl shadow-2xl p-[1rem] justify-between">
            <div>
              <p className="text-lg font-light">Total spent</p>
              <p className="text-2xl font-bold text-black">₦{totalSpent.toFixed(2)}</p>
            </div>
            <div className="rounded-full bg-red-200 ">
              <p className="text-4xl font-bold mt-[0.5rem] px-[0.3rem] ">💸</p>
            </div>
          </div>
          <div className="flex flex-row border-l-7 lg:gap-[3rem] border-blue-500 md:gap-[1rem] bg-white rounded-2xl shadow-2xl p-[1rem] justify-between">
            <div>
              <p className="text-lg font-light">Remaining</p>
              <p className="text-2xl font-bold text-black">₦{remaining.toFixed(2)}</p>
            </div>
            <div className="rounded-full bg-blue-200 p-[0.1rem]">
              <p className="text-4xl font-bold  px-[0.3rem] mt-[0.3rem]">💰</p>
            </div>
          </div>
        </div>

        <div className=" px-[2rem] pt-[3rem] flex flex-col md:flex-row lg:px-[17rem] md:justify-center gap-[2rem]">
          <div className="bg-white md:w-[91%] rounded-2xl shadow-2xl p-[1.5rem]">
            <p className="text-xl pb-[1rem] font-semibold">+ Add New Expenses</p>
            <div>
              {remaining <= 0 ? (
                <div className="flex flex-col items-center justify-center h-48">
                  <p className="text-center font-bold pt-[1rem] text-red-500 text-lg">Budget Exhausted 😂</p>
                  <Image className="pt-[1.5rem]" src="/broke.jpg"
                    alt="A broken item" // Always provide a descriptive alt tag for accessibility
                    width={100} // A required property for local images to prevent layout shift
                    height={100} // A required property for local images
                  />
                  <p className="text-center text-gray-400 pb-[1rem] mt-2">You have reached your spending limit. No new expenses can be added.</p>
                </div>
              ) : (
                <div>
                  <label>Description</label><br />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-400 w-[100%] p-[0.5rem] mt-[0.7rem] mb-[0.5rem] rounded-lg" placeholder="e.g Grocery Shopping" /><br />
                  <label>Amount</label><br />
                  <input type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border border-gray-400 w-[100%] p-[0.5rem] mt-[0.7rem] mb-[0.5rem] rounded-lg" placeholder="₦ 0.00"
                  /><br />
                  <label>Category</label><br />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-400 mt-[0.5rem] w-[100%] p-[0.5rem] mb-[1rem] rounded-lg" placeholder="Select a Category">
                    <option value="">Select a category</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Health">Health</option>
                    <option value="Others">Others</option>
                  </select><br />
                  <button onClick={addExpense} className="bg-blue-600 hover:bg-blue-700 transition-colors text-white w-[100%] rounded-lg p-[1rem]">Add Expenses</button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white md:w-[91%] rounded-2xl shadow-2xl p-[1.5rem]">
            <p className="text-xl font-semibold pb-[5rem]">📋 Recent Expenses</p>
            <div>
              {expenses.length === 0 ? (
                <div>

                  <p className="text-center text-2xl">📜</p>
                  <p className="text-center text-gray-400">No expenses added yet.</p>
                </div>
              ) : (
                <ul>
                  {expenses.map((expense) => (
                    <li key={expense.id} className='flex justify-between py-2'>
                      <span>
                        {expense.description} - ₦{expense.amount.toFixed(2)} ({expense.category})
                      </span>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className='text-red-600 p-[0.5rem] rounded-lg relative bottom-[0.3rem] hover:bg-red-400 transition-colors bg-red-300 font-semibold'
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}

            </div>
            <div className="border-t-2 border-gray-300 py-[3rem]">
              <button onClick={clearAllExpenses} className="bg-red-300 text-red-600 w-[100%] hover:bg-red-400 transition-colors rounded-lg py-[0.6rem] font-bold">Clear All Expenses</button>
            </div>
          </div>

        </div>

        <div className="px-[2rem] pt-[3rem] lg:px-[17rem]  pb-[3rem]">
          <div className="bg-white p-[1.5rem] rounded-2xl shadow-2xl">
            <p className="font-bold text-lg pb-[3rem]">📊 Spending By Category</p>
            <div>
              {expenses.length === 0 ? (
                <div>
                  <p className="text-center text-3xl pb-[1rem]">📉</p>
                  <p className="text-center text-gray-400">Add expenses to see your spending breakdown</p>
                </div>
              ) : (
                <ul>
                  {Object.entries(getCategoryTotals()).map(([category, total]) => (
                    <li key={category} className='flex justify-between py-2'>
                      <span>{category}</span>
                      <span className='font-bold text-gray-700'>₦{total.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home