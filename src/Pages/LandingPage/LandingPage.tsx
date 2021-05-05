import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { GoPencil } from 'react-icons/go'
import './LandingStale.css'
import TaskBox from '../../Components/TaskBox/TaskBox'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import api from '../../Services/api'

interface Task {
  id: string;
  task_content: string;
  task_data: string;
  task_hour: string;

}

function Landing() {

  const [Task, setTask] = useState<Task[]>([])
  const [selected, setSelected] = useState(false)

  const idInput = 'box'

  useEffect(() => {
    api.get('/list').then((response) => {
      const data = response.data
      setTask(data)
      console.log(data);
    })
  }, [])

  const toggleOpen = () => {
    setSelected(true)
    console.log(selected);

  }
  const toggleClose = () => {
    setSelected(false)
  }

  return (
    <div className="landing" >
      <Sidebar />

      <div className="title-bar">

        <div className="title">

          <span>
            <span className="title_task">Task List</span>
            <br />
            Trabalho
          </span>
          <a href="asda"><GoPencil size={20} color='#000' /></a>
        </div>
      </div>


      <AnimateSharedLayout>
        {
          selected && (
            <>
              <motion.div className="create_task_backdrop" onClick={toggleClose} />
            </>
          )
        }
        <form action="" className='create_task'>
          <motion.div>
            <AnimatePresence>
              {
                selected && (
                  <>
                    <input type="text" placeholder='Titulo' />
                  </>
                )
              }
            </AnimatePresence>
            <input type="text" placeholder='Crie uma tarefa' onClick={toggleOpen} />
          </motion.div>
        </form>
      </AnimateSharedLayout>

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


