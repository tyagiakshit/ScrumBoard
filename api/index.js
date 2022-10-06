var data = "";
// async function getData() {
//     const value = await fetch('http://localhost:3000/scrumBoardData');
//     data = await value.json();
//     //console.log(data)
// }
// var table = document.getElementById('main--table');
// var row = table.insertRow(-1);
// Objects.keys(data[0].status).forEach(d => {
//     var headerCell = document.createElement("TH");
//     // headerCell.innerHTML =
//     console.log(data[0].status.d);
//     row.appendChild(headerCell);
// });
let datesArray=[]
let dataObject = [];
async function getScrumData() {
  const scrum = await fetch("http://localhost:3000/scrumBoardData");
  dataObject = await scrum.json();
  return dataObject;
}
async function getProjectData() {
  const scrum = await fetch("http://localhost:3001/projectPlan");
  return await scrum.json();
}
let datesArr=[];
const printData = async () => {
  const projectPlan = await getProjectData();
  const scrumData = await getScrumData();
//   for (let i = 0; i < array.length; i++) {
//     const element = array[i];
    
//   }
  //console.log(projectPlan)
//   projectPlan.forEach(project=>{
//     if(project.employee=="Gaurav"){
//         project.allocations.forEach(task=>{
//             console.log(task.taskName)
//         })
//     }
    
//   })
// for(let i=0;i<projectPlan.length;i++){
//     for(let j=0;j<scrumData.length;j++){
//         if((projectPlan[i].employee===scrumData[i].employee) && (projectPlan[i].allocations[i].date===Object.keys(scrumData[i].status)) ){
//             console.log(projectPlan[i].employee,scrumData[i].employee)
//             // console.log(projectPlan[i].employee.allocations)
            
//         }
//     }

// }


// console.log(scrumData[0].status)
//   var table = document.getElementById("main--table");
//   projectPlan.forEach((t)=>{
//     console.log(t);
//     // Object.values(t.allocations).forEach((date, i) => {
//     //     const newArr=[]
//     //     console.log(date.taskStatus[0])
//     //     let x=date.taskStatus[0];
//     //     Object.keys(x).forEach((data,i)=>{
//     //         newArr.push(data)
//     //         console.log(data)
//     //     })
//     //     datesArr.push(newArr)
//     // })
//   });

//  forloop(i ->0-projectPlan.length)
//  create td with i.employee;
//  again loop with(j-> 0 - i.allocatoons.length)

//--------------
//  for (let i = 0; i < projectPlan.length; i++) {
//     var row1 = document.createElement('tr');
//     row1.setAttribute('id',`${projectPlan[i].employee}`)
    
    
//  }
 
//   console.log(scrumData[0].status)
//   var table = document.getElementById("main--table");
//   scrumData.forEach((employee)=>{
//     console.log(employee.employee)
//     Object.values(employee.status).forEach((date, i) => {
//         const newArr=[]
//         let x=date.taskStatus[0];
//         Object.keys(x).forEach((data)=>{
//             newArr.push(data)
//             console.log(data)
//         })
//         datesArr.push(newArr)
//     })
//   })
//   console.log(datesArr)
  
  var i = 1;
  Object.keys(scrumData[0].status).forEach((date, i) => {
    datesArray.push(date)
    
  });
  var bodyHead = document.createElement("TR");
  var bodyHeadData= document.createElement("th");
  bodyHead.appendChild(bodyHeadData);
  datesArray.forEach((item)=>{
    let td=document.createElement("th")
    let tdText=document.createTextNode(item)
    td.appendChild(tdText)
    bodyHead.appendChild(td)
})
    //var temp=""
    //temp += `<tr><th></th><th>${datesArray[0]}</th><th>${datesArray[1]}</th></tr>`;
    //console.log(i,temp,document.getElementsByClassName("table-body"));
    document.getElementById("table-body").appendChild(bodyHead);
  scrumData.forEach((emp)=>{
console.log(emp.id);
    
    var row1 = document.createElement("TR");
    var cell= document.createElement("td");
    cell.innerHTML = emp.id;
    row1.appendChild(cell)
    document.getElementById("table-body").appendChild(row1);
    datesArray.forEach((item) => {
        var dateCell= document.createElement("td");
        dateCell.setAttribute('id', item);
        console.log(emp.status[item].taskStatus)
        Object.keys(emp.status[item].taskStatus[0]).forEach((item) => console.log(item))
        let entries = Object.entries(emp.status[item].taskStatus[0])
        console.log(entries)
let data = entries.map( ([key, val] = entry) => {
  console.log(`The ${key} is ${val}`);
  let gauravTask = document.createElement('li')
  if(val == 'In progress') gauravTask.style.backgroundColor = "yellow";
  else if(val == 'Completed') gauravTask.style.backgroundColor = "green";
  else gauravTask.style.backgroundColor = "wheat";
  //gauravTask.setAttribute('id','')
  gauravTask.innerHTML = `${key}`
  console.log(gauravTask)
  dateCell.appendChild(gauravTask)
});
//
var spanDiv = document.createElement('div')
spanDiv.setAttribute('id','spanDiv')
//
var aheadBehind = document.createElement('span')
var morale = document.createElement('span');
var edit = document.createElement('span');
edit.setAttribute('id', 'edit1');
aheadBehind.innerHTML = `${emp.status[item].aheadBehind}`;
if(emp.status[item].morale == 'bad') morale.innerHTML = '&#128543;'
else if(emp.status[item].morale == 'good') morale.innerHTML = '&#128522;'
else morale.innerHTML = '&#128513;';
//morale.innerHTML = `${emp.status[item].morale}`;
console.log(emp)
edit.innerHTML = `<a href=./updateForm.html?id=`+item+`&employee=${emp.id}`+`>Edit</a>`;
//edit.onclick = location.href='./updateForm.html?id='+item;
//console.log(document.getElementById('edit1'));
// document.getElementById('edit1').addEventListener('click',()=>{
//     location.href='www.facebook.com';
// })
// `<br><br><a href='./updateForm.html?id=`+t+`'><img src=./edit.png></a>`;
// edit.onclick="location.href='www.facebook.com'"
//
spanDiv.appendChild(aheadBehind)
spanDiv.appendChild(morale)
spanDiv.appendChild(edit)
dateCell.appendChild(spanDiv)
//
// dateCell.appendChild(morale);
// dateCell.appendChild(aheadBehind);
// dateCell.appendChild(edit)
row1.appendChild(dateCell);
    });
});
  //console.log(datesArray)

  const projectPlanData = await getProjectData();
  //console.log(scrumData);
//   for (let i = 0; i < scrumData.length; i++) {
//     var str = "";
//     var employeeName = scrumData[i].employee;
//     console.log(employeeName);
//     str += employeeName + "  ";
//     for (const key in scrumData[i].status) {
//       var date = key;
//       str += key + " ";
//       for (
//         let ind = 0;
//         ind < scrumData[i].status[key].taskStatus.length;
//         ind++
//       ) {
//         const element = scrumData[i].status[key].taskStatus[ind];
//         for (const taskName in element) {
//           // console.log(taskName)
//           for (let inde = 0; inde < projectPlanData.length; inde++) {
//             const ele = projectPlanData[inde];
//             if (ele.employee === employeeName) {
//               for (let index = 0; index < ele.allocations.length; index++) {
//                 if (ele.allocations[index].taskName === taskName) {
//                   str +=
//                     taskName +
//                     " " +
//                     ele.allocations[index].effort +
//                     "                 ";
//                 }
//               }
//             }
//           }
//         }
//       }
//       str += "\n";
//     }
//     console.log(str);
//   }
 };
printData();

//console.log(dataObject)
