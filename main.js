let tasks = [];

const verifyLocalStorage = function(){

    let localStorageContent = localStorage.getItem("tasks");

    if(localStorageContent != null){
        tasks = JSON.parse(localStorageContent);
        attInfoInPage();
    };
};

const attLocalStorage = function(){

    if(tasks.length === 0)
        localStorage.clear();
    else
        localStorage.setItem("tasks", JSON.stringify(tasks));
};

const attInfoInPage = function(){

    let listOfTasksOnPage = document.querySelector("#added-tasks > ul");
    let numberOfPendencyTasks = document.getElementById("total-tasks-info");

    listOfTasksOnPage.innerHTML = "";

    tasks.forEach((element, index)=>{
         listOfTasksOnPage.innerHTML += `<li> ${element} <span onclick="deleteIndividualTask(${index})"></span></li>`;;
    });

    numberOfPendencyTasks.innerText = tasks.length;
};

const addTasks = function(){

    let addTaskInput = document.getElementById("add-task-input");
    let addTaskButton = document.getElementById("add-task-button");
    
    addTaskButton.onclick = function(){
        if(addTaskInput.value.length > 0 && addTaskInput.value.trim()){
            tasks.push(addTaskInput.value);
            attPage();
        }else{
            alert("Adicione uma tarefa válida!");
        };

        addTaskInput.value = "";
    };
};

const clearTasks = function(){

    let clearAllTasksButton = document.getElementById("clear-tasks-button");

    clearAllTasksButton.onclick = function(){
        if(tasks.length > 0){
            let confirmClearTasks = confirm("Deseja excluir todas as tarefas?");

            if(confirmClearTasks){
                tasks = [];
                attPage();
            };
        }else{
            alert("Não há tarefas pendentes!");
        };
    };
};

const deleteIndividualTask = function(index){
    tasks.splice(index,1);
    attPage();
};

const attPage = function(){
    attLocalStorage();
    attInfoInPage();
};

verifyLocalStorage();
addTasks();
clearTasks();
