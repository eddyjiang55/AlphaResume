import React from 'react'
import ProgressSidebar from '../components/InterviewSimulationPage/ProgressSidebar'
import Dashboard from '../components/InterviewSimulationPage/Dashboard'

const InterviewSimulation = () => {
  return (
    <div className='flex flex-row'>
      <ProgressSidebar />
      <Dashboard />
    </div>
  )
}

export default InterviewSimulation