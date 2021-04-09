
function alapozas() {
    let alapok = document.getElementById("alapok")
    alapok.innerHTML = ""
    for (var i=0;i<=9;i++) {
        alapok.innerHTML += '<rect \
        id="alap'+ i + 1 +'" \
        onclick="epites(this.id)" \
        fill="green" \
        stroke="black" \
        stroke-width="5" \
        width="60" \
        height="60" \
        x="0" \
        y="' + i * 60 + '"  \
    />'
    }

    for (var i=0;i<=9;i++) {
        alapok.innerHTML += '<rect \
        id="alap'+ i + 11 +'" \
        onclick="epites(this.id)" \
        fill="green" \
        stroke="black" \
        stroke-width="5" \
        width="60" \
        height="60" \
        x="60" \
        y="' + i * 60 + '"  \
    />'
    }

    for (var i=0;i<=9;i++) {
        alapok.innerHTML += '<rect \
        id="alap'+ i + 21 +'" \
        onclick="epites(this.id)" \
        fill="green" \
        stroke="black" \
        stroke-width="5" \
        width="60" \
        height="60" \
        x="120" \
        y="' + i * 60 + '"  \
    />'
    }

    for (var i=0;i<=9;i++) {
        alapok.innerHTML += '<rect \
        id="alap'+ i + 31 +'" \
        onclick="epites(this.id)" \
        fill="green" \
        stroke="black" \
        stroke-width="5" \
        width="60" \
        height="60" \
        x="180" \
        y="' + i * 60 + '"  \
    />'
    }

    for (var i=0;i<=9;i++) {
        alapok.innerHTML += '<rect \
        id="alap'+ i + 41 +'" \
        onclick="epites(this.id)" \
        fill="green" \
        stroke="black" \
        stroke-width="5" \
        width="60" \
        height="60" \
        x="240" \
        y="' + i * 60 + '"  \
    />'
    }

    for (var i=0;i<=9;i++) {
        alapok.innerHTML += '<rect \
        id="alap'+ i + 51 +'" \
        onclick="epites(this.id)" \
        fill="green" \
        stroke="black" \
        stroke-width="5" \
        width="60" \
        height="60" \
        x="300" \
        y="' + i * 60 + '"  \
    />'
    }

    for (var i=0;i<=9;i++) {
        alapok.innerHTML += '<rect \
        id="alap'+ i + 61 +'" \
        onclick="epites(this.id)" \
        fill="green" \
        stroke="black" \
        stroke-width="5" \
        width="60" \
        height="60" \
        x="360" \
        y="' + i * 60 + '"  \
    />'
    }

    for (var i=0;i<=9;i++) {
        alapok.innerHTML += '<rect \
        id="alap'+ i + 71 +'" \
        onclick="epites(this.id)" \
        fill="green" \
        stroke="black" \
        stroke-width="5" \
        width="60" \
        height="60" \
        x="420" \
        y="' + i * 60 + '"  \
    />'
    }

    for (var i=0;i<=9;i++) {
        alapok.innerHTML += '<rect \
        id="alap'+ i + 81 +'" \
        onclick="epites(this.id)" \
        fill="green" \
        stroke="black" \
        stroke-width="5" \
        width="60" \
        height="60" \
        x="480" \
        y="' + i * 60 + '"  \
    />'
    }

    for (var i=0;i<=9;i++) {
        alapok.innerHTML += '<rect \
        id="alap'+ i + 91 +'" \
        onclick="epites(this.id)" \
        fill="green" \
        stroke="black" \
        stroke-width="5" \
        width="60" \
        height="60" \
        x="540" \
        y="' + i * 60 + '"  \
    />'
    }
}
