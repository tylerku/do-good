import { IonButton } from '@ionic/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import xIcon from '../static/images/xIcon.png';

import './Popup.css';

interface PopupProps { 
  image: string; 
  title: string; 
  body: string;
  hide: boolean;
  buttonText: string;
  scaleToAnimateTo: number;
  animationDuration: number;
  onButtonClick: () => void;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = (props: PopupProps) => {
  const hideStyle = props.hide ? {display: 'none'} : {};
  const animationConfig = props.hide ? {} : {scale: props.scaleToAnimateTo}
  return (
    <motion.div animate={animationConfig} transition={{ duration: props.animationDuration }} className="popupContainer" style={hideStyle}>
      <img onClick={props.onClose} id="popupX" src={xIcon}/>
      <img src={props.image}/>
      <strong id="popupTitle">{props.title}</strong>
      <p id="popupBody">{props.body}</p>
      <IonButton onClick={props.onButtonClick} color="secondary">{props.buttonText}</IonButton>
    </motion.div>
  );
};

export default Popup;