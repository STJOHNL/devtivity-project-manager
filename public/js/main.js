const showHide = (elementID) => {
    document.getElementById(elementID).classList.toggle('hide')
    if (document.getElementById('changeText').innerHTML == 'Propose New Project') {
        document.getElementById('changeText').innerHTML = 'Close'
        document.getElementById('changeText').style.backgroundColor = '#7e7e7e'
    } else {
        document.getElementById('changeText').innerHTML = 'Propose New Project'
        document.getElementById('changeText').style.backgroundColor = '#050a30'
    }
    document.getElementById('create-project').scrollIntoView()
}

const showHideAddTask = (elementID) => {
    document.getElementById(elementID).classList.toggle('hide')
}

const showHideEditTask = (elementID) => {
    document.getElementById(elementID).classList.toggle('hide')
}

const showHideTaskInfo = (elementID) => {
    document.getElementById(elementID).classList.toggle('hide')
}

const warnMessage = () => {
    confirm('Are you sure you would like to delete this task?')
}