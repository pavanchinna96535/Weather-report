const searchButton=document.querySelector(".submit");
const locality=document.querySelector(".areaSearch");
const display=document.querySelector(".display");
const key="f9882329c03b4e48800103630241809";
const currentTemp=document.querySelector(".temperature");
const conditionArea=document.querySelector(".area");
const image=document.querySelector(".icon");
const currentCondition=document.querySelector(".condition");
const currentError=document.querySelector(".error");
const days=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const currentDate=document.querySelector(".time");


searchButton.addEventListener("click",(e)=>{
    // location.reload();
    let searchValue=locality.value.trim();
    
    locality.value="";
    
    makeAPIcall(searchValue);

})

async function makeAPIcall(name){
    const url=`http://api.weatherapi.com/v1/current.json?key=${key}&q=${name}`;
    try {
     const response=await fetch(url);
     const data=await response.json();
    //  console.log(data);
     const name=data.location.name;
     const temperature=data.current.temp_c;
     const dateTime=data.location.localtime;
    //  console.log(dateTime.split());
     const date=dateTime.split(" ")[0];
    //  console.log(date);
     const time=dateTime.split(" ")[1];
     const currentDate=new Date();
     const dateTostring=currentDate.toString();
    //  console.log(dateTostring);
    //  console.log(dayNum);
     const day=dateTostring.split(" ")[0];
        // console.log(day);
    //  const day=days[dayNum];
     const currentDateTime=`${time} ${day} ${date}`;
     const icon=data.current.condition.icon;
     const text=data.current.condition.text;
     display.style.backgroundColor="rgb(250, 95, 85)";
     addToUI(temperature,name,icon,text,currentDateTime);
    }
    catch(err){
        clearUI();
        display.style.backgroundColor="yellow";
        currentError.innerText="Invalid input";
        
    }
    display.style.display="flex";
    
}

function addToUI(temperature,name,icon,text,time){
    // reset the previous search data on ui
    clearUI();

    // add current search data on the ui
    currentTemp.innerText=`${temperature}°C`;
    conditionArea.innerText=name;
    image.src=icon;
    currentCondition.innerText=text;
    currentDate.innerText=time;

}

function clearUI(){
    currentTemp.innerText = ""; 
    conditionArea.innerText = "";
    image.src ="";
    currentCondition.innerText = "";
    currentDate.innerText = "";
    currentError.innerText="";
}