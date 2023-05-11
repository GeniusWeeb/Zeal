import * as Notifications from 'expo-notifications';
import { notificationThreshold } from "../Controller/UserController";


async function ScheduleCustomNot(notyTime , name , userName)
{     
      await Notifications.scheduleNotificationAsync({    
      content :{
        title: `Hurry ${userName}!`,
        body: `Your task ${name} is about to end`
      },
      trigger:{
        seconds:notyTime
      }
    }).then((result)=> {

      console.log(`Added Notification ${name}`)
     
    })
}
      // this will shedule the checks but
      //1 use case remains that is -> if at the time of scheduling you are already the given threshold then what?
      //2 What if the task is deleted  thru its complete existnce 
      //The Category is deleted -> We will have to search thru the scheduled notification in that case
  

export function StartNotificationProcess(date , name , userName)
{
  const remainingTime =  Math.round((new Date(date).getTime() - new Date().getTime())/1000)
  const showNoTiTime = remainingTime - notificationThreshold;
  // if the time to show notificaion is small than the threshold value,it means 
  //we dont have the time to get a full interval and so this can prevent noti appear in deletion case
  if(showNoTiTime < notificationThreshold)
    return ;
   ScheduleCustomNot(showNoTiTime  , name , userName) ; 
  //remaining time is in seconds 
  //We wanna show notifications 30 minutes or eve 60 minutes before a certain task is about to get over
  // remaining time ->->  0
  //1 hour  =  3600seconds
  // scheduleNotificationTime = remaining time  - 1 hour time
}