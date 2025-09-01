import React from 'react'
import { useState, useEffect } from 'react';
import API from '../api';
import Multiple from '../components/Multiple';
import SubForm from '../components/SubForm';

const CourseCreation = () => {
  const [tags, setTags] = useState([]);  
  const [prerequisites, setPrerequisites] = useState([]);  
  const [syllabus, setSyllabus] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.target;
    const formData = new FormData(form);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      domain: formData.get('domain'),
      tags,
      type: formData.get('type'),
      duration: formData.get('duration'),
      fee: formData.get('fee'),
      currency: formData.get('currency'),
      language: formData.get('language'),
      prerequisite: formData.get('prerequisite'),
      syllabus: formData.get('syllabus'),
      module: formData.get('module'),
    };

    // Handle image file
    const imageFile = formData.get('image');
    const sendData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => sendData.append(key, v));
      } else {
        sendData.append(key, value);
      }
    });
    if (imageFile && imageFile.size > 0) {
      sendData.append('image', imageFile);
    }

    try {
      const res = await API.post('/course/create', sendData);
      if (!res.ok) throw new Error('Failed to create course');
      // Optionally handle success (e.g., redirect or show message)
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Add missing import

  return (
    <div className='mx-10 my-5 '>
      <h2 className='text-center text-6xl font-bold mb-10'>Course Creation</h2>
      <div>
        <form
          className='flex flex-col gap-5 w-[60%] mx-auto'
          onSubmit={handleSubmit}
        >
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Title:</label>
            <input
              type="text"
              name="title"
              className='w-full p-2 h-10 rounded-md border border-[--var(--tri)] bg-[--var(--bi)]'
            />
          </div>
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Description:</label>
            <textarea name="description"
              className='w-full p-2 border border-[--var(--tri)] bg-[--var(--bi)]' />
          </div>
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Domain:</label>
            <input type="text" name="domain"
              className='w-full p-2 h-10 rounded-md border border-[--var(--tri)] bg-[--var(--bi)]' />
          </div>
          {/* Tags */}
          <Multiple
            label="Tags:"
            values={tags}
            setValues={setTags}
            placeholder="Enter tag"
          />
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Type:</label>
            <select
              name="type"
              className='w-full p-2 h-10 rounded-md border border-[--var(--tri)] bg-[--var(--bi)]'
              defaultValue=""
              required
            >
              <option value="" disabled>Select type</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
              <option value="link">Link</option>
            </select>
          </div>
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Duration:</label>
            <input type="text" name="duration"
              className='w-full p-2 h-10 rounded-md border border-[--var(--tri)] bg-[--var(--bi)]' />
          </div>
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Fee:</label>
            <input type="number" name="fee"
              className='w-full p-2 h-10 rounded-md border border-[--var(--tri)] bg-[--var(--bi)]' />
          </div>
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Currency:</label>
            <input type="text" name="currency"
              className='w-full p-2 h-10 rounded-md border border-[--var(--tri)] bg-[--var(--bi)]' />
          </div>
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Image:</label>
            <input type="file" name="image" accept="image/*"
              className='w-full p-2 border border-[--var(--tri)] bg-[--var(--bi)]' />
          </div>
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Language:</label>
            <input type="text" name="language"
              className='w-full p-2 h-10 rounded-md border border-[--var(--tri)] bg-[--var(--bi)]' />
          </div>
          {/* Prerequisites */}
          <Multiple
            label="Prerequisites:"
            values={prerequisites}
            setValues={setPrerequisites}
            placeholder="Enter prerequisite"
          />
          <div>
            <SubForm
              label="Syllabus:"
              values={syllabus}
              setValues={setSyllabus}
              content={[
                {
                  title: '',
                  description: '',
                  resources: [{type: '', url: '', description: ''}]
                }
              ]}
            />
          </div>
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Syllabus:</label>
            <textarea name="syllabus"
              className='w-full p-2 border border-[--var(--tri)] bg-[--var(--bi)]' />
          </div>
          <div className='w-full flex justify-between'>
            <label className='w-[20%]'>Module:</label>
            <input type="text" name="module"
              className='w-full p-2 h-10 rounded-md border border-[--var(--tri)] bg-[--var(--bi)]' />
          </div>
          <button type="submit" className='mx-auto bg-[var(--quad)] hover:bg-[var(--quad-dark)] text-white p-3 font-semibold rounded-lg' >Create Course</button>
        </form>
      </div>
    </div>
  )
}

export default CourseCreation