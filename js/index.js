//get connections to the DOM
const createToDoBtn = document.querySelector('.plus-symbol');
const getLowerDiv = document.querySelector('.module-container');
const countDiv = document.querySelector('.numbOfItems');
const clearCompletedBtn = document.querySelector('.clear-completed');
const createDiv = document.createElement('input');

//filters
//Number of Items
let todoCount = 0;

//Event Listeners=========================================================
//=========================================================================
createToDoBtn.addEventListener('click',(e)=>{
    // Capture the value in the input field
    e.preventDefault();
    const inputContent = document.getElementById('todo-value').value;
    todoCount += 1;
    console.log(todoCount);
    countDiv.innerHTML = `${todoCount}`

    //create label container element
    const first = document.createElement("label");
    first.setAttribute("for",'input-content');
    first.className = "input-content";

    //create input element
    const second = document.createElement("input");
    second.setAttribute("type","checkbox");
    second.className = "checkbox-type";
    first.append(second);
    second.insertAdjacentHTML("afterend", inputContent );

    //creating img inside container div
    const third = document.createElement('img');
    third.setAttribute('src','img/icon-cross.svg');
    third.setAttribute('class','deleteBtn');

    //onclick Delete entire div
    third.onclick = (e) => {
        getLowerDiv.removeChild(e.target.parentElement);
        todoCount -= 1;
        countDiv.innerHTML = `${todoCount}`
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
})
// add a checkmark to checkbox
const checkBoxEvent = () => {
    const getLabel = document.querySelectorAll('.checkbox-type');
        getLabel.forEach(item =>{
            item.addEventListener('change',(e)=>{
                let selectedTask = e.target;
                const team = item.closest('.input-content');
                if(e.target.checked){
                    team.classList.add('strike')
                    console.log('check')
                }else {
                    console.log('unchecked')
                    team.classList.remove('strike');
                }
            })
        })
    }
checkBoxEvent();

//clear completed
clearCompletedBtn.addEventListener('click',()=>{
    // gather all the divs that have been struck completed - strike
    let gatherClear = document.querySelectorAll('.strike');

    // Keep track of how many labels have been struck
    todoCount = todoCount - gatherClear.length;

    // making sure number doesn't go below 0
    todoCount < 0 ? countDiv.innerHTML = "0" : countDiv.innerHTML = `${todoCount}`
    console.log(todoCount)
    gatherClear.forEach(clear =>{
        clear.style.display = "none";
    })

    //remove node list elements
    for(let elem of gatherClear) {
        elem.parentNode.removeChild(elem);
    }

})


