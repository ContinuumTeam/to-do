import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { GoPencil } from 'react-icons/go'
import './LandingStale.css'
import TaskBox from '../../Components/TaskBox/TaskBox'
import api from '../../Services/api'

interface Task {
  id: string;
  task_content: string;
  task_data: string;
  task_hour: string;

}

function Landing() {

  const [Task, setTask] = useState<Task[]>([])

  useEffect(() => {
    api.get('/list').then((response) => {
      const data = response.data
      setTask(data)
      console.log(data);
    })
  }, [])



  return (
    <div className="landing">
      <Sidebar />

      <div className="title-bar">

        <div className="title">

          <span>
            <span className="title_task">Task List</span>
            <br />
            Work
          </span>
          <a href="asda"><GoPencil size={20} color='#000' /></a>
        </div>
      </div>

      <form className="">
        <input type='text' />
      </form>

      <div className="task-area">
        {
          Task.map(tasks => {
            return <TaskBox
              key={tasks.id}
              id={tasks.id}
              task_content={tasks.task_content}
              task_data={tasks.task_data}
              task_hour={tasks.task_hour}
            />
          })
        }
      </div>

    </div>
  )
}

export default Landing


