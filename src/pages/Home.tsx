import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonFabList, IonFab, IonActionSheet, IonFabButton, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonReorderGroup, IonReorder } from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskCard from '../components/TaskCard';
import './Home.css';
import Popup from '../components/Popup';
import prayerIcon from '../static/images/prayerIcon.png';
import scripturesIcon from '../static/images/scripturesIcon.png';
import actIcon from '../static/images/actIcon.png';
import StreakCounter from '../components/StreakCounter';

export const Home: React.FC = () => {
  const DEFAULT_POPUP_SCALE = 1;
  const POST_ANIMATION_POPUP_SCALE = 1.2;
  const POPUP_ANIMATION_DURATION = 0.3;
  const PRAYER_POPUP_BODY = "Good job praying for inspiration. Keep doing good to increase your streak";
  const SCRIPTURES_POPUP_BODY = "Great job! Keep going to increase your streak of doing good";
  const ACT_POPUP_BODY = "You're doing great! Keep it up with you tasks to increase your streak";

  const [hidePopup, setHidePopup] = useState(true);
  const [popupScale, setPopupScale] = useState(DEFAULT_POPUP_SCALE);
  const [streakCount, setStreakCount] = useState(0);
  const [flameScale, setFlameScale] = useState(1);

  const [selectedTask, setSelectedTask] = useState<number|undefined>(undefined);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupBody, setPopupBody] = useState("");

  const [isTaskChecked1, setIsTaskChecked1] = useState(false);
  const [isTaskChecked2, setIsTaskChecked2] = useState(false);
  const [isTaskChecked3, setIsTaskChecked3] = useState(false);

  const handleTaskCardClicked = (taskCard: number) => {
    if (taskCard === 1 && isTaskChecked1 || 
      taskCard === 2 && isTaskChecked2 ||
      taskCard === 3 && isTaskChecked3) {
      return;
    }
    switch(taskCard) {
      case 1:
        setPopupImage(prayerIcon);
        setPopupTitle("AWESOME");
        setPopupBody(PRAYER_POPUP_BODY);
        break;
      case 2:
        setPopupImage(scripturesIcon);
        setPopupTitle("AWESOME");
        setPopupBody(SCRIPTURES_POPUP_BODY);
        break;
      case 3:
        setPopupImage(actIcon);
        setPopupTitle("AWESOME");
        setPopupBody(ACT_POPUP_BODY);
        break;
    }
    setSelectedTask(taskCard);
    setPopupScale(POST_ANIMATION_POPUP_SCALE)
    setHidePopup(false);
  }

  const handleAllTasksCompleted = () => {
    setFlameScale(1.1);
    setTimeout(() => setStreakCount(streakCount + 1), (POPUP_ANIMATION_DURATION * 3) * 1000);
    setFlameScale(1);
  }

  const closePopup = () => {
    setSelectedTask(undefined);
    setPopupScale(0.1);
    setTimeout(() => setHidePopup(true), POPUP_ANIMATION_DURATION * 1000);
  }

  const completeTask = () => {
    if (selectedTask === undefined) {
      console.log("selectedTask can not be undefined when marking task complete. Bug fix required");
      return 
    }
    let updateTaskCheckedFunc: (value: React.SetStateAction<boolean>) => void;
    switch(selectedTask) {
      case 1:
        updateTaskCheckedFunc = setIsTaskChecked1;
        setIsTaskChecked1(true);
        if (isTaskChecked3 && isTaskChecked2) {
          handleAllTasksCompleted();
        }
        break;
      case 2:
        updateTaskCheckedFunc = setIsTaskChecked2;
        if (isTaskChecked1 && isTaskChecked3) {
          handleAllTasksCompleted();
        }
        break;
      case 3:
        updateTaskCheckedFunc = setIsTaskChecked3;
        if (isTaskChecked1 && isTaskChecked2) {
          handleAllTasksCompleted();
        }
        break;
      default: 
        updateTaskCheckedFunc = setIsTaskChecked1; // If this is happening every time a task is clicked something is wrong;
    }
    setTimeout(() => updateTaskCheckedFunc(true), (POPUP_ANIMATION_DURATION * 1.6) * 1000);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Do Good Daily Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        {/* <IonFab horizontal="end" vertical="bottom" slot="fixed" edge={false}>
          <IonFabButton color="tertiary">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab> */}
        <div className="titleContainer">
          Do Good
        </div>
        <TaskCard 
          title="Step 1"
          body="Pray For Guidance"
          checked={isTaskChecked1}
          onClick={() => handleTaskCardClicked(1)}
        />
        <TaskCard 
          title="Step 2"
          key={2}
          body="Search The Scriptures For Inspiration"
          checked={isTaskChecked2}
          onClick={() => handleTaskCardClicked(2)}
        />
        <TaskCard 
          title="Step 3"
          key={3}
          body="Act On The Inspiration You Received"
          checked={isTaskChecked3}
          onClick={() => handleTaskCardClicked(3)}
        />
        <Popup
          animationDuration={POPUP_ANIMATION_DURATION}
          scaleToAnimateTo={popupScale}
          hide={hidePopup}
          image={popupImage}
          title={popupTitle}
          body={popupBody}
          buttonText="Complete"
          onClose={closePopup}
          onButtonClick={() => {
            completeTask();
            closePopup();
          }}
        />
        <StreakCounter 
          count={streakCount}
        />
      </IonContent>
    </IonPage>
  );
};

// <IonCard>
//           <img src={prayer}/>
//           <IonCardHeader>
//             <IonCardSubtitle>Do Good: Step 1</IonCardSubtitle>
//             <IonCardTitle>Pray</IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             Start doing good by seeking inspiration from the Lord. Spend some time on your knees asking the Lord to fill you with inspiration to do good for those around you.
//           </IonCardContent>
//         </IonCard>
//         {/* <TaskCard /> */}
//         <IonCard>
//           <img src={scriptures}/>
//           <IonCardHeader>
//             <IonCardSubtitle>Do Good: Step 2</IonCardSubtitle>
//             <IonCardTitle>Scripture Study</IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             Seek the guidance of the spirit while you read the scriptures. This will bring the spirit near and help you receive promptings of what good you can do today.
//           </IonCardContent>
//         </IonCard>
//         <IonCard>
//           <img src={service}/>
//           <IonCardHeader>
//             <IonCardSubtitle>Do Good: Step 3</IonCardSubtitle>
//             <IonCardTitle>Act</IonCardTitle>
//           </IonCardHeader>

//           <IonCardContent>
//             Seek the inspiration of the Lord. Do what he prompts you to do. Some ideas are text a friend to see how they are doing, send someone a bag of goodies, or give someone in your family a call. 
//           </IonCardContent>
//         </IonCard>

export default Home;

