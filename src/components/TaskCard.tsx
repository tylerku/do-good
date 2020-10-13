import { IonCheckbox } from '@ionic/react';
import React, { useState } from 'react';
import { motion } from "framer-motion"

import './TaskCard.css';
import { Checkbox } from './Checkbox';

interface TaskCardProps { 
  onClick: () => void;
  checked: boolean;
  title: string
  body: string
}

const TaskCard: React.FC<TaskCardProps> = (props: TaskCardProps) => {
  return (
    <motion.div 
      className={["flexContainerRow", "taskCard"].join(' ')}
      whileTap={{ scale: 0.9 }}
      onClick={props.onClick}
    >
      <div>
        <span className="taskCardTitle">{props.title}</span>
        <div className="taskCardDivider"/>
        <span className="taskCardBody">{props.body}</span>
      </div>
      <div className="checkboxContainer">
        {/* <IonCheckbox disabled checked={props.checked} className="checkbox" color="secondary" slot="end" mode="ios"/> */}
        <Checkbox checked={props.checked}/>
      </div>
    </motion.div>
  );
};


export default TaskCard;