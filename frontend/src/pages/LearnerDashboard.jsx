import React from 'react'
import Hero from '../components/Hero'
import Card from '../components/Card';

const LearnerDashboard = () => {
  return (
    <div className='px-10'>
      <Hero bgImage="/Hero 1.jpg" bgColor={"#6b6148"} />
      {/* most popular domains */}
      <div>
        <h2 className='text-2xl font-bold my-4'>Redesign your career with Peerzz</h2>
        <Card image="/Hero 1.jpg" title="Card Title" description="Card description goes here." det1="Instructor" det2="Time" det3="Rating" det4="Price" />
      </div>
      {/* goals - domains - courses*/}
      <div>
        <h2 className='text-2xl font-bold my-4'>Be Industry Ready with Peerzz</h2>
        <Card image="/Hero 1.jpg" title="Card Title" description="Card description goes here." det1="Instructor" det2="Time" det3="Rating" det4="Price" />
      </div>
      {/* Most watched courses */}
      <div>
        <h2 className='text-2xl font-bold my-4'>Most Watched Courses</h2>
        <Card image="/Hero 1.jpg" title="Card Title" description="Card description goes here." det1="Instructor" det2="Time" det3="Rating" det4="Price" />
      </div>
    </div>
  )
}

export default LearnerDashboard