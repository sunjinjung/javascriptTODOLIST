//유저가 값을 입력한다
//+ 버튼을 누르면, 할 일이 추가된다
//delete버튼을 누르면 할 일이 삭제 된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check버튼을 클릭하는 순간 true false
//2. true이면 끝난 걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난 걸로 간주하고 그대로
//진행 중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은, 끝난 아이템만, 진행중인 탭은 진행 중인 아이템만
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput=document.getElementById("task-input");
let addButton=document.getElementById("add-button");
let tabs=document.querySelectorAll(".task-tabs div")
let taskList=[]
let mode='all'
let filterList=[]
let underLine=document.getElementById('under-line')


taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      addTask(event);
    }
  });
addButton.addEventListener("click",addTask);
console.log(tabs);
for (let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}
function addTask(){
    let taskValue=taskInput.value
    if(taskValue===""){
        return alert("할 일을 입력해주세요")
    }
    let task={
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task)
    taskInput.value=""
    console.log(taskList)
    render();
    
}

function render(){
    let list=[]
    if (mode==='all'){
        list=taskList

    }else if (mode==='ongoing' || 'done'){
        list=filterList

    }
    let resultHTML = ''
    for(let i =0 ; i<list.length;i++){

        if(list[i].isComplete==true){
            resultHTML+=`<div class="task">
            <div class="task-done">
                ${list[i].taskContent} </div>
                <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fas  fa-undo-alt"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
               
               
        </div>`
        }else{
            resultHTML +=`<div class="task">
        <div>
            ${list[i].taskContent} </div>
            <div class="button-box">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fas  fa-arrow-right"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        
        
    </div>`

        }
        
    }


    document.getElementById("task-board").innerHTML = resultHTML;
}
function toggleComplete(id){
    console.log("id:",id)
    for(let i =0 ; i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList[i].isComplete=!taskList[i].isComplete
            break;
        }
    }
    render();
    console.log(taskList)
}

function randomIDGenerate(){
    return  '_' + Math.random().toString(36).substr(2, 9);
}
function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1)
            
        }
    }
    filter()
}

function filter(event){
    if (event) {
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top =event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
      }
    filterList=[]   
    if(mode==="ongoing"){
        //진행 중인 아이템을 보여준다
        //task.isComplete=false인 값을 보여줘야함
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===false){
                filterList.push(taskList[i])

            }
        }
    }
    else if (mode === "done") {
        for (let i = 0; i < taskList.length; i++) {
          if (taskList[i].isComplete===true) {
            filterList.push(taskList[i]);
          }
        }
      }
      render();
    }