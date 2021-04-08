let bubik = []

function addCircle(x, y, text) {}

function gbId(id) {
    return document.getElementById(id)
}

function ujSzoveg(id) {
    kör = gbId(id)
    ujszoveg = prompt('Új szöveg:')
    kör.setAttribute("r", ujszoveg.length * 4 + 50) 
    text = gbId(id + 'text')
    text.innerHTML = ujszoveg
}