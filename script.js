
function addElement(){
    const inputList = document.querySelector('#texto-tarefa').value;
    let listOl = document.querySelector('#lista-tarefas').innerHTML; 

    listOl += `<li>${inputList}</li>`;
    
    document.querySelector('#lista-tarefas').innerHTML = listOl;
    
    document.querySelector('#texto-tarefa').value = null;
    
    changeBackground();
}

function clearTask(){
    const liElements = document.querySelectorAll('li');
    for(i = 0; i < liElements.length; i += 1){
        liElements[i].classList.remove('Spotlight');
    }
}

function changeBackground(){
    const liElements = document.querySelectorAll('li');
    document.querySelector('#texto-tarefa').value = null;
    for(i = 0; i < liElements.length; i += 1){
        liElements[i].addEventListener('click', (event) => {
            clearTask();
            event.target.classList.toggle('Spotlight');
        })
    }
}

function textDecoration(){
    const listOl = document.querySelector('#lista-tarefas');
    listOl.addEventListener('dblclick', (event) => {
        event.target.classList.toggle('completed');
    })
}

function deleteList(){    
    const listOl = document.querySelector('#lista-tarefas');
    listOl.textContent = '';
}


function removeCompleted(){
    const Ols = document.querySelector('#lista-tarefas');
    const listLi = document.querySelectorAll('.completed');
    
    for(i = 0; i < listLi.length; i += 1){
        Ols.removeChild(listLi[i]);
    }
}

function saveData (){
    const buttonSave = document.querySelector('#salvar-tarefas');

    buttonSave.addEventListener('click', () => {
        const lis = document.querySelector('#lista-tarefas').children;
        const saves = [];
        for( let i = 0; i < lis.length; i += 1){
            const Itens = {
                task: lis[i].innerText,
                class: lis[i].className,
            }
            saves.push(Itens);
        }
        localStorage.setItem('saves', JSON.stringify(saves));
    })
}


function recharge(){
    const saves = JSON.parse(localStorage.getItem('saves'));
    const Ols = document.querySelector('#lista-tarefas');
    
    if(saves){
        for(i = 0; i < saves.length; i += 1){
            const li = document.createElement('li');
            li.innerText = saves[i].task;
            li.className = saves[i].class;
            Ols.appendChild(li);
        }
    }
}


function moveUP() {
    const buttonUp = document.querySelector('#mover-cima');
    
    buttonUp.addEventListener('click', () => {
        const classLiSelected = document.querySelector('.Spotlight');
        if(classLiSelected == null) return;
        if(classLiSelected.previousElementSibling){
           classLiSelected.previousElementSibling.insertAdjacentElement('beforebegin', classLiSelected);
        }
    });
}

function moveDown() {
    const buttonUp = document.querySelector('#mover-baixo');
    
    buttonUp.addEventListener('click', () => {
        const classLiSelected = document.querySelector('.Spotlight');
        if(classLiSelected == null) return;
        if(classLiSelected.nextElementSibling){
           classLiSelected.nextElementSibling.insertAdjacentElement('afterend', classLiSelected);
        }
    });
}

function removeSelected(){
    const buttonRemove = document.querySelector('#remover-selecionado');

    buttonRemove.addEventListener('click', () => {
        const classLiSelected = document.querySelector('.Spotlight');
        if(classLiSelected == null) return;
        if(classLiSelected !==null){
            classLiSelected.parentNode.removeChild(classLiSelected);
        }
    })
}

window.onload = () => {
    textDecoration();
    saveData();
    recharge();
    moveUP();
    moveDown();
    removeSelected();
}