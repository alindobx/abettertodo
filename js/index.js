//get connections to the DOM
const inputValue = document.getElementById('todo-value');
const createToDoBtn = document.querySelector('.plus-symbol');
const getLowerDiv = document.querySelector('.module-container');
const countDiv = document.querySelector('.numbOfItems');
const clearCompletedBtn = document.querySelector('.clear-completed');
const activeFilterBtn = document.querySelector(".filter-active")
const completedFilterBtn = document.querySelector('.filter-completed');
const notStrikeClass = document.querySelectorAll("label:not(.complete)");
const getAllBtn = document.querySelector('.filter-all');

new Sortable(getLowerDiv, {
    animation: 350
});

function retrieveCompleteFromLocalStorage() {
    //get from active Storage
    const retrieveCompleteToDos = window.localStorage.getItem("Complete");
    //parse data from object to string
    const parseToDos = JSON.parse(retrieveCompleteToDos);

    //change string to html
    const completeParsers = new DOMParser();
    const doc = completeParsers.parseFromString(parseToDos, 'text/html');

    // gather all active-list to render on DOM
    const gatherAllCompleteToDos = doc.querySelectorAll('.complete');
    gatherAllCompleteToDos.forEach(item => {
        const deleteBtn = item.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click',(e)=> {
            getLowerDiv.removeChild(e.target.parentElement);
            decrementCounter()
        })

        // reintroduce or append active items to DOM or list
        getLowerDiv.appendChild(item);
        localStorage.clear();
        incrementCounter()
    })
}

function retrieveActiveFromLocalStorage() {
    //get from active Storage
    const retrieveActiveToDos = window.localStorage.getItem("Active");
    //parse data from object to string
    const parseToDos = JSON.parse(retrieveActiveToDos);

    //change string to html
    const activeParsers = new DOMParser();
    const doc = activeParsers.parseFromString(parseToDos, 'text/html');

    // gather all active-list to render on DOM
    const gatherAllActiveToDos = doc.querySelectorAll('.active');
    console.log(gatherAllActiveToDos)
    gatherAllActiveToDos.forEach(item => {
        const deleteBtn = item.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click',(e)=> {
            getLowerDiv.removeChild(e.target.parentElement);
            decrementCounter()
        })

        // reintroduce or append active items to DOM or list
        getLowerDiv.appendChild(item);
        localStorage.clear();
        incrementCounter()
    })
}


//filters
//Number of Items
const todoCountState = {
    count: 0
};
//function for counter
const counter = (count) => {
    return count
};

//function to render Counter
function renderCount() {
    countDiv.innerHTML = counter( todoCountState.count )
}
//Update Methods
const incrementCounter = () => {
    todoCountState.count = todoCountState.count + 1;
    renderCount();
}

const decrementCounter = () => {
    todoCountState.count = todoCountState.count - 1;
    renderCount();
}
renderCount();

//Event Listeners=========================================================
//=========================================================================
inputValue.addEventListener('keypress',(e)=>{
    // Capture the value in the input field
    if (e.keyCode === 13) {
        e.preventDefault();
        const inputContent = document.getElementById('todo-value').value;
        incrementCounter();

        //create label container element
        const first = document.createElement("label");
        first.setAttribute("for", 'input-content');
        first.className = "input-content active";

        //create input element
        const second = document.createElement("input");
        second.setAttribute("type", "checkbox");
        second.className = "checkbox-type";
        first.append(second);
        second.insertAdjacentHTML("afterend", inputContent);

        //creating img inside container div
        const third = document.createElement('img');
        third.setAttribute('src', 'img/icon-cross.svg');
        third.setAttribute('class', 'deleteBtn');

        //onclick Delete entire div
        third.onclick = (e) => {
            getLowerDiv.removeChild(e.target.parentElement);
            decrementCounter()
        }
        //img button inside label div
        first.append(third);

        //appending as Child to the main div container
        getLowerDiv.appendChild(first);

        //remove the content from input field on click
        const newContent = document.getElementById('todo-value');
        newContent.value = '';

        //strike the content value when checkbox is checked
        checkBoxEvent()
    }
})
// add a checkmark to checkbox
const checkBoxEvent = () => {
    const getLabel = document.querySelectorAll('.checkbox-type');
        getLabel.forEach(item =>{
            item.addEventListener('change',(e)=>{
                const team = item.closest('.input-content');
                const addActive = document.querySelector('.input-content')
                if(e.target.checked){
                    team.classList.add('complete');
                    team.classList.remove('active');
                    addActive.classList.add('active-list');
                }else {
                    team.classList.add('active');
                    team.classList.remove('complete');
                }
            })
        })
    }
checkBoxEvent();

//=============================================================
//Filter Buttons Code
//=============================================================
//clear completed Filter
clearCompletedBtn.addEventListener('click',()=>{

    //gather all completed todos
    let gatherCompletedTodos = document.querySelectorAll('.complete');

    // Remove all the Completed tododos and reduce count -1
    gatherCompletedTodos.forEach(element =>{
        element.remove();
        decrementCounter()
    })
})

//=============================================================
//Filter Buttons Code
//=============================================================
//Display Active Todos - filter-active
activeFilterBtn.addEventListener('click',()=>{

    //check and see if there are any "active" elements in localStorage if true bring
    //them to the stage if false "console log" - nothing is storage

    const activeItemsInStorage = (localStorage.getItem("Active") === null);
    if (activeItemsInStorage) {
        console.log('no active todos in storage');
    }else{
        console.log('active todos in storage');
        retrieveActiveFromLocalStorage()
    }

    //Function to retrieve ToDos from localStorage

    //======================================================================
    //Remove Compete todoos from stage
    let gatherCompletedTodos = document.querySelectorAll('.complete');

    //CompleteList Array and collection of completed tododos
    const CompleteList = [];

    // gathers all the Completed toddoo and sends pushes them into the Complete array
    gatherCompletedTodos.forEach(item => {
        item.remove()
        const result1 = item.outerHTML;
        if (gatherCompletedTodos.length > 0){
             CompleteList.push(result1);
            localStorage.setItem('Complete', JSON.stringify(CompleteList));
        }else {
            console.log('noting in the Nodes');
        }
        decrementCounter()
    })
})

//Display Complete Todos - completedFilterBtn
completedFilterBtn.addEventListener('click',()=>{

    //check and see if there are any "active" elements in localStorage if true bring
    //them to the stage if false "console log" - nothing is storage

    const CompleteItemsInStorage = (localStorage.getItem("Complete") === null);
    if (CompleteItemsInStorage) {
        console.log('no complete todos in storage');
    }else{
        console.log('active todos in storage');
        retrieveCompleteFromLocalStorage()
    }

    // //Function to retrieve ToDos from localStorage
    //Function to retrieve ToDos from localStorage

    //======================================================================
    //Remove Active todoos from stage
    let gatherActiveTodos = document.querySelectorAll('.active');

    //ActiveList Array and collection of completed tododos
    const ActiveList = [];

    // gathers all the Active toddoo and sends pushes them into the Active array
    gatherActiveTodos.forEach(item => {
        item.remove()
        const result_active = item.outerHTML;
        if (gatherActiveTodos.length > 0){
            ActiveList.push(result_active);
            localStorage.setItem('Active', JSON.stringify(ActiveList));
        }else {
            console.log('noting in the Nodes');
        }
        decrementCounter()
    })
})
//============================================================================
//Filter All - present all todooos                                           =
//============================================================================
getAllBtn.addEventListener("click", ()=>{
    //get both active and complete tododos in localStorage and bring to Stage
    retrieveActiveFromLocalStorage()
    retrieveCompleteFromLocalStorage()
})





