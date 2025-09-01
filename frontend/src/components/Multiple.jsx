import React, { useState } from 'react';

const Multiple = ({ label, values, setValues, placeholder = "Enter value" }) => {
  const [input, setInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      setValues([...values, trimmed]);
      setInput('');
    }
  };

  const handleRemove = (idx) => {
    setValues(values.filter((_, i) => i !== idx));
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='flex justify-between items-center'>
        {label && <label className='w-[20%]'>{label}</label>}
        <div className='w-full flex'>
          <input
            type="text"
            value={input}
            placeholder={placeholder}
            onChange={e => setInput(e.target.value)}
            className='w-full p-2 h-10 rounded-md border border-[--var(--tri)] bg-[--var(--bi)]'
            onKeyDown={e => { if (e.key === 'Enter') handleAdd(e); }}
          />
          <button
            type="button"
            onClick={handleAdd}
            className="ml-2 px-3 py-1 bg-[var(--quad)] text-white rounded-md text-xl font-bold"
            title="Add"
          >+</button>
        </div>
      </div>
      <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
        {values.map((val, idx) => (
          <span
            key={idx}
            className="flex items-center bg-[var(--quad)] text-white px-3 py-1 rounded-full whitespace-nowrap mr-2"
          >
            {val}
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="ml-2 text-xs rounded-full px-2"
              title="Remove"
            >x</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Multiple;