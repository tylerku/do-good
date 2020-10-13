import { motion } from 'framer-motion';
import React, { useState } from 'react';

import flame from '../static/images/flameIcon.png';
import './StreakCounter.css';

interface StreakCounterProps { 
  count: number
}

const StreakCounter: React.FC<StreakCounterProps> = (props: StreakCounterProps) => {

  return (
    <div className="streakContainer">
      <motion.img src={flame}/>
      <motion.strong animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      key={props.count}
      className="counter">{props.count}</motion.strong> 
    </div>
  );
};

export default StreakCounter;