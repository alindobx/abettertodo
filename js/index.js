//get connections to the DOM
const createToDoBtn = document.querySelector('.plus-symbol');
const getLowerDiv = document.querySelector('.module-container');

const createDiv = document.createElement('input');

//Event Listeners=========================================================
//=========================================================================
createToDoBtn.addEventListener('click',(e)=>{
    // Capture the value in the input field
    const inputContent = document.getElementById('todo-value').value;
    //create div first
    const second = document.createElement("input");
    second.setAttribute("type","checkbox");
    second.className = "checkbox-type";
    const first = document.createElement("label");
    first.setAttribute("for",'input-content');
    first.className = "input-content";
    const text = document.createTextNode(`${inputContent}`);

    first.appendChild(second)
    first.appendChild(text);
    getLowerDiv.append(first);
    checkBoxEvent();

    console.log('test');
    console.log(inputContent);

})

const checkBoxEvent = () => {
    const getLabel = document.querySelectorAll('.checkbox-type');
    console.log(getLabel)
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
