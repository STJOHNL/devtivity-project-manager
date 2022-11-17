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