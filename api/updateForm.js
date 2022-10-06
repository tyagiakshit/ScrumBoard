//var id = location.search.split('id=')[1];
var values = ['Not Started', 'In progress', 'Completed'];
//var cc=location.search.slice('id=', '&');
//var empId = location.search.split('empId=')[1];
//console.log(id);
//console.log(cc);
//console.log('empId'+empId);

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
var id = urlParams.get('id')
console.log(id);
const employee = urlParams.get('employee')
console.log(employee);


var taskStatusValueChanged = "";
var aheadValueChanged = "";
var moraleValueChanged = "";
const updatedFields = [];
const fieldsToUpdate = [];
const updatedTasks = [];
const tasksToUpdate = [];



async function AddData() {
    //console.log('Inside Add Data');
    const value = await fetch('http://localhost:3000/scrumBoardData');
    var data = await value.json();

  //console.log(data[0].status[id]);
  //Populate Tasks Status Dropdown
  let entries = Object.entries(data[0].status[id].taskStatus[0])
  entries.map( ([key, val] = entry) => {
  var select = document.createElement("select");
  select.name = key;
  select.id = key

  for (const val of values)
  {
      var option = document.createElement("option");
      option.value = val;
      option.text = val;
      select.appendChild(option);
  }
  select.value = val;
  

  var label = document.createElement("label");
  label.innerHTML = key;
  // document.getElementById('divTasks').appendChild(label);
  document.getElementById('divTasks').appendChild(select);
  document.getElementById('divTasks').appendChild(document.createElement('br'));
  //console.log(`The ${key} is ${val}`);       
        });
  
  //Populate Ahead/Behind      
  document.getElementById('daysinput').value = data[0].status[id].aheadBehind;
  document.getElementById('daysvalue').textContent = data[0].status[id].aheadBehind;
  
  //Populate Morale
  if(data[0].status[id].morale == 'bad'){
      document.getElementById('emoji').innerHTML = '&#128543;';
      document.getElementById('range').value = 0;
  }
  else if(data[0].status[id].morale == 'good'){
      document.getElementById('emoji').innerHTML = '&#128522;';
      document.getElementById('range').value = 1;
  }
  else if(data[0].status[id].morale == 'excellent'){
      document.getElementById('emoji').innerHTML = '&#128513;';
      document.getElementById('range').value = 2;
  }
}


// const collection = document.getElementById("divTasks").children;
// console.log(collection);
// console.log(collection.length);

setTimeout(() => {
  let elms = document.getElementsByClassName('divTasks').item(0).children
  console.log(elms)
  Array.from(elms).forEach(function (element) {
    element.addEventListener('change', ()=>{
  taskStatusValueChanged = element.value;
  console.log('taskStatusValueChanged', taskStatusValueChanged);
  const index = tasksToUpdate.indexOf(element.id);
  if (index > -1) {
    console.log('element found')
  tasksToUpdate.splice(index, 1);
  updatedTasks.splice(index, 1);
}
updatedTasks.push(taskStatusValueChanged);
tasksToUpdate.push(element.id);
console.log('updatedTasks',updatedTasks);
console.log('updatedTasks',tasksToUpdate);

});
  });
}, 1000);


// divNodes.forEach(element => {
//   console.log(element)
// });



function updateAhead() {
//Ahead/Behind Slider
const slider = document.querySelector("#daysinput")
const value = document.querySelector("#daysvalue")
value.textContent = slider.value;
}

function updateAheadOnchange(slideAmount) {
  console.log("updateAheadOnChange");
  var sliderDiv = document.getElementById("daysinput");
  sliderDiv.innerHTML = slideAmount;
  aheadValueChanged = slideAmount;
  const index = fieldsToUpdate.indexOf('ahead');
  if (index > -1) {
  fieldsToUpdate.splice(index, 1);
  updatedFields.splice(index, 1);
}
updatedFields.push(aheadValueChanged);
fieldsToUpdate.push('aheadBehind');
console.log(updatedFields);
  
}

function updateMorale() {
  
    var emoji = document.getElementById('emoji');
    var value = document.getElementById('range').value
    if(value == 0) emoji.innerHTML = '&#128543;';
    else if(value == 1) emoji.innerHTML = '&#128522;';
    else if(value == 2) emoji.innerHTML = '&#128513;';
  }

function updateMoraleOnchange(slideAmount) {
  console.log("updateMoraleOnChange");
    var sliderDiv = document.getElementById("range");
    sliderDiv.innerHTML = slideAmount;

    if(slideAmount == 0)
      moraleValueChanged = 'bad';
    else if(slideAmount == 1)
      moraleValueChanged = 'good';
    else if(slideAmount ==2)
      moraleValueChanged = 'excellent';

    const index = fieldsToUpdate.indexOf('morale');
    if (index > -1) {
    fieldsToUpdate.splice(index, 1);
    updatedFields.splice(index, 1);
}
updatedFields.push(moraleValueChanged);
fieldsToUpdate.push('morale');
console.log('Pushed to morale');
console.log(updatedFields);
    
}



// function handleSelectChange(event) {

//   var selectElement = event.target;
//   taskStatusValueChanged = selectElement.value;
//   console.log(String(taskStatusValueChanged));
//   const index = fieldsToUpdate.indexOf('status');
//   if (index > -1) {
//   fieldsToUpdate.splice(index, 1);
//   updatedFields.splice(index, 1);
// }
// updatedFields.push(taskStatusValueChanged);
// fieldsToUpdate.push('status');
    
// }

async function UpdateTask() {

  console.log('Inside Update Data');
  console.log('array pushed'+updatedFields);
  const value = await fetch('http://localhost:3000/scrumBoardData/');
  var data = await value.json();
  console.log(data);

  console.log('id from params'+id);

var obj = getObjects(data,id,taskStatusValueChanged, fieldsToUpdate, updatedFields, tasksToUpdate, updatedTasks);

var str = "";
if(employee == 'Gaurav')
 str = JSON.stringify(obj[0]);
else if(employee == 'Anurag')
str = JSON.stringify(obj[1]);

console.log('Response received from getObjects()'+str);
// let entries = Object.entries(obj[0]);
//     console.log(entries)
    console.log('Inside put api');
    fetch('http://localhost:3000/scrumBoardData/'+employee, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: str,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });



}

function getObjects(obj, key, newVal, fieldsToUpdate, updatedFields, tasksToUpdate, updatedTasks) {
  console.log('Inside getObjects');
  var newValue = newVal;
  var objects = [];
  for (var i in obj) {
      console.log('Property'+i);
      if (!obj.hasOwnProperty(i)) {
          console('Has its own property');
          continue;
      }
      if (typeof obj[i] == 'object') {
        
        if(i==id){
          console.log('Condition satisfied');
          console.log('value of i',i);
          console.log('value of id', id);
          console.log('value of obj[i]', obj[i]);
          var obj1 = obj[i];
          console.log('fieldsToUpdate: '+fieldsToUpdate);
          console.log('updatedFields: '+updatedFields);
          const person = obj1.taskStatus[0];   
          //var taskString = '{';
          for(i=0; i<tasksToUpdate.length; i++){
            let entries = Object.entries(obj1.taskStatus[0])
  entries.map( ([key, val] = entry) => {
if(key == tasksToUpdate[i]){
console.log('update1',key, updatedTasks[i])
person[key] = updatedTasks[i];
}
// else
// {
// person[key] = val;
// console.log('update1', key, val)
// }
  });
          }
          console.log('person', person);
          obj1.taskStatus[0] = person;
          for(i=0;i<fieldsToUpdate.length;i++){
              obj1[fieldsToUpdate[i]] = updatedFields[i];
              console.log('obj1[fieldsToUpdate[i]]', fieldsToUpdate[i]);
              console.log('updatedFields[i]', updatedFields[i]);
              }
              console.log('Value updated');
        }
          
          var str = JSON.stringify(obj[i]);
          console.log('Is of object type ' +str + ' value of i ' + i + ' typeOf ' + typeof i);
          console.log('------------------------------');
 
          objects = objects.concat(getObjects(obj[i], key, newValue, fieldsToUpdate, updatedFields, tasksToUpdate, updatedTasks));
          //console.log('Objects concatenated'+objects);
      }
  }
  fieldsToUpdate=[];
  updatedFields =[];
  updatedTasks = [];
  tasksToUpdate = [];
  console.log('array emptied');
  return obj;
}



