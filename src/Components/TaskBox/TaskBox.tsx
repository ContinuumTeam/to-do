import React, { useState } from 'react';
// import { Container } from './styles';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import "./taskBox.css"

interface TaskProps {
  id: string;
  task_content: string;
  task_data: string;
  task_hour: string;
}

const TaskBox: React.FC<TaskProps> = ({ id, task_data, task_hour, task_content }: TaskProps) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState<string>()
  //const [isChecked, setIsChecked] = useState(false)



  function handleShowModal() {
    console.log(showModal);

    setShowModal(true)
  }

  return (
    <AnimateSharedLayout type="crossfade">

      <motion.div
        style={{ background: '#fff' }}
        layout
        className='task-box'
        layoutId={id}
        onClick={() => setSelectedId(id)}
      >
        <span className="task-name">{task_content}</span>
        <motion.div className="task-date">
          <motion.span className="date">{task_data}</motion.span>
          <motion.span className="hour">{task_hour}</motion.span>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {
          selectedId && (
            <>
              <motion.div
                className='modal_task_backdrop'
                onClick={() => setSelectedId('null')}
              />
              <motion.div
                layout
                className='task-box task_modal'
                layoutId={selectedId}
                onClick={handleShowModal}
                initial={{
                  scale: 1,
                  zIndex: 0,
                }}
                animate={{
                  width: 500,
                  height: 200,
                  scale: 1,
                }}
                exit={{
                  scale: 1
                }}
              >
                <motion.div>
                  <input type="text" value={task_content} />
                </motion.div>
                <motion.div className="task-date">

                  <motion.span className="date">
                    {task_data}
                  </motion.span>

                  <motion.span className="hour">
                    {task_hour}
                  </motion.span>

                </motion.div>
              </motion.div>
            </>
          )
        }
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default TaskBox;