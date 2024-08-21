let hours,minutes,seconds;
let intervalId=null;
const timeDisplay=document.querySelector('.time-display');
let select=document.querySelectorAll('select');
const setAlarmBtn=document.querySelector('.set-alarm-btn');
const clearAlarmBtn=document.getElementById('clear-alarm-btn');
function getTime(){
let currentTime=new Date();
hours=currentTime.getHours();
minutes=String(currentTime.getMinutes()).padStart('2','0');
seconds=String(currentTime.getSeconds()).padStart('2','0');
timeDisplay.firstElementChild.textContent=`${hours%12||12}:${minutes}:${seconds} ${hours>12?"PM":"AM"}`
}

setInterval(getTime,1000);

for(let i=1;i<=12;i++){
  let option=`<option value="${i}">${i}</option>`
  select[0].insertAdjacentHTML('beforeend',option)
}

for(let i=0;i<60;i++){
  let value=i<10?'0'+i:i;
  let option=`<option value="${value}">${value}</option>`
  select[1].insertAdjacentHTML('beforeend',option)
}


function setAlarm(){
  displayClearButton();
  let rigtone= new Audio('alarm rigtone.wav');
  select[0].disabled=true;
  select[1].disabled=true;
  select[2].disabled=true;
  let alarmHour=Number(select[0].value);
  let alarmMinute=Number(select[1].value);
  let alarmMeridiam=select[2].value;
  if (alarmMeridiam === "PM" && alarmHour !== 12) {
    alarmHour += 12;
  } else if (alarmMeridiam === "AM" && alarmHour === 12) {
    alarmHour = 0;
  }

 intervalId=setInterval(()=>{
  let now=new Date();
  let currentHour=now.getHours();
  let currentMinute=now.getMinutes();
  if(currentHour===alarmHour&&alarmMinute===currentMinute){
    rigtone.play();
    // displaySetButton();
    clearInterval(intervalId);
  }
 },1000)
}

setAlarmBtn.addEventListener('click',setAlarm);
clearAlarmBtn.addEventListener('click',clearAlarm);



function clearAlarm(){
  select[0].disabled=false;
  select[1].disabled=false;
  select[2].disabled=false;
  select[0].value='hour';
  select[1].value='minute';
  select[2].value='meridiam';
  displaySetButton();
  clearInterval(intervalId);
}

function displayClearButton(){
  clearAlarmBtn.style.display='block';
  setAlarmBtn.classList.add('hide')
}

function displaySetButton(){
  clearAlarmBtn.style.display='none';
  setAlarmBtn.classList.remove('hide')
}