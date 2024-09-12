
let homeConteiner = document.querySelector(`.home-conteiner`)
let editPage = document.querySelector(`.edit-page`)
let submit = document.querySelector('.new-personal')
let personalList = JSON.parse(localStorage.getItem(`personalList`)) || [];
const headTable = document.getElementById(`header-table`)
let table = document.querySelector(`table`);
let fullName = document.querySelector(`#Full-Name`);
let rank = document.querySelector(`#Rank`);
let position = document.querySelector(`#Position`);
let platoon = document.querySelector(`#Platoon`);
let missionTime = document.querySelector(`#mission-time`);
let status = document.querySelector('#status');
let countMission = 0
let h21 = document.querySelector(`#h21`)
let h22 = document.querySelector(`#h22`)


function submitPersonal(event){
    event.preventDefault();
    if(validateInputs()){
        let personal = createPersonal();
        personalList.push(personal)
        localStorage.setItem('personalList', JSON.stringify(personalList));
        renderPage(personalList)
    }
}

function validateInputs() {
    return fullName.value && rank.value && position.value && platoon.value && missionTime.value && status.value;
}

function createPersonal(){
    let personal = {
        fullName: fullName.value,
        rank: rank.value,
        position: position.value,
        platoon: platoon.value,
        missionTime: missionTime.value,
        status: status.value
    };

    fullName.value = "";
    rank.value = "";
    position.value = "";
    platoon.value = "";
    missionTime.value = "";
    
    return personal
}

function renderPage(arrToShow){
    table.innerHTML = "";
    table.appendChild(headTable)
    arrToShow.forEach((person, idx) => {
        addRow(person, idx)
    });
};

function addRow(person, idx){
    
    let tr = document.createElement('tr');
    
    const tdFullName = document.createElement('td');
    tdFullName.innerText = person.fullName;

    const tdRank = document.createElement('td');
    tdRank.innerText = person.rank;

    const tdPosition = document.createElement('td');
    tdPosition.innerText = person.position;

    const tdPlatoon = document.createElement('td');
    tdPlatoon.innerText = person.platoon;
    
    const tdStatus = document.createElement('td');
    tdStatus.innerText = person.status;

    const tdActions = createActions(person);

    tr.append(tdFullName, tdRank, tdPosition, tdPlatoon, tdStatus, tdActions);
    table.appendChild(tr);
};

function createActions(person){
    const btnRemove = document.createElement(`button`);
    btnRemove.classList.add(`action-btn`)
    btnRemove.innerHTML = `Remove`
    btnRemove.addEventListener(`click`, () => RemovePerson(person));

    const btnMission = document.createElement(`button`);
    btnMission.classList.add(`action-btn`)
    btnMission.innerHTML = `Start Mission`;
    btnMission.addEventListener(`click`, () => StartMission(person.missionTime, btnMission));

    const btnEdit = document.createElement(`button`);
    btnEdit.classList.add(`action-btn`)
    btnEdit.innerHTML = `Edit`
    btnEdit.addEventListener(`click`, ()=>EditPerson(person));

    const td = document.createElement(`td`);
    td.classList.add(`actionBtns`)
    td.append(btnRemove, btnMission, btnEdit)
    return td;
}

function RemovePerson(person){ 
    personalList = personalList.filter(p => p != person);
    localStorage.setItem('personalList', JSON.stringify(personalList));
    renderPage(personalList)
}

function StartMission(seconds, btnMission){
    btnMission.disabled = false
    let num = seconds
    countMission = setInterval(()=>{timerForMission(num, btnMission), num--}, 1000)
    btnMission.disabled = false
}
function timerForMission(numOfSeconds, btnMission){
    if (numOfSeconds>0){
        btnMission.innerHTML = numOfSeconds + ``;
        numOfSeconds--;
    }
    else{
        clearInterval(countMission);
        btnMission.innerHTML = `Mission Completed`
    }
}

function EditPerson(person){
    h21.classList.toggle(`hidden`)
    h22.classList.toggle(`hidden`)
    homeConteiner.classList.toggle(`hidden`)
    editPage.classList.toggle(`hidden`)
}

renderPage(personalList)

submit.addEventListener('submit', submitPersonal);
