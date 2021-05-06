//#region imports
import React, { useEffect, useState, FormEvent } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { GoPencil } from 'react-icons/go'
import './LandingStale.css'
import TaskBox from '../../Components/TaskBox/TaskBox'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import api from '../../Services/api'
//#endregion

interface Task {
  id: string;
  task_title: string;
  task_content: string;
  task_data: string;
  task_hour: string;
}

function Landing() {

  //#region State das informaçoes das tarefas
  const [Task, setTask] = useState<Task[]>([])
  //#endregion

  //#region State para o framer motion usar
  const [selected, setSelected] = useState(false)
  //#endregion

  //#region States das informaçoes para criar as tarefas
  const [task_title, settask_title] = useState('')
  const [task_content, settask_content] = useState('')
  const [task_data, settask_data] = useState('')
  const [task_hour, settask_hour] = useState('')
  const [task_remember, settask_remember] = useState(false)
  const [task_completed, settask_completed] = useState(false)
  //#endregion

  //#region Funcao q envia os dados das tarefas
  function handleSubmit(e: FormEvent) {
    e.preventDefault()


    api.post('/create', {
      task_title,
      task_content,
      task_data,
      task_hour,
      task_remember
    })



    console.log({
      'task_title': task_title,
      'task_content': task_content,
      'task_data': task_data,
      'task_hour': task_hour,
      "task_completed": task_completed,
      'task_remember': task_remember,
    })
  }
  //#endregion

  //#region funcao que pega as informaçoes da api
  useEffect(() => {
    api.get('/list').then((response) => {
      const data = response.data
      setTask(data)
      console.log(data);
    })
  }, [])
  //#endregion

  //#region funcoes para lidar com a div de criar tarefas
  const toggleOpen = () => {
    setSelected(true)
  }
  const toggleClose = () => {
    setSelected(false)
  }
  //#endregion

  return (

    <div className="landing" >

      {/* barra lateral */}
      <Sidebar />

      {/* titulo da pagina */}
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

      {/* animação para a criacao das tarefas */}
      <AnimateSharedLayout>

        {
          selected && (
            <>
              <motion.div className="create_task_backdrop" onClick={toggleClose} />
            </>
          )
        }

        <form action="" className='create_task' onSubmit={handleSubmit}>

          <motion.div>

            <AnimatePresence>
              {
                selected && (
                  <>
                    <input
                      type="text" placeholder='Titulo'
                      value={task_title}
                      onChange={event => settask_title(event.target.value)}
                    />
                  </>
                )
              }
            </AnimatePresence>

            <input
              type="text"
              placeholder='Crie uma tarefa'
              onClick={toggleOpen}
              value={task_content}
              onChange={event => settask_content(event.target.value)}
            />

            <AnimatePresence>
              {
                selected && (
                  <>

                    <input
                      id="task_date" type="date"
                      placeholder='data'
                      value={task_data}
                      onChange={event => settask_data(event.target.value)}
                    />
                    <input
                      placeholder='Hora'
                      type="time"
                      value={task_hour}
                      onChange={event => settask_hour(event.target.value)}
                    />

                    <motion.div className='task_buttons'>

                      <button
                        type="submit"
                        className='task_created'
                      >Criar</button>

                      <button className='close_button' onClick={toggleClose}>Fechar</button>
                    </motion.div>

                  </>
                )
              }
            </AnimatePresence>

          </motion.div>
        </form>

      </AnimateSharedLayout>

      {/* Area aonde sao mostradas as tasks */}
      <div className="task-area">
        {
          Task.map(tasks => {
            return <TaskBox
              key={tasks.id}
              task_title={tasks.task_title}
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


