function vegrehajt(mit) {
   switch (mit) {
      case "/töröl" :
         localStorage.clear()
         location.reload()
      break;
   }
}

function betolt() {
   alapozas()
   if (localStorage.vanmentes) {
      muhelyek = JSON.parse(localStorage.muhelyek)
      hazak = JSON.parse(localStorage.hazak)
      varak = JSON.parse(localStorage.varak)
      bevetelek = JSON.parse(localStorage.bevetelek)
      svg = JSON.parse(localStorage.svg)
      document.getElementById("svg").innerHTML = svg
      document.getElementById("arany").innerHTML = bevetelek.arany   
      document.getElementById("ellatmany").innerHTML = bevetelek.ellatmany
   } else {ment()}
}

function ment() {
   localStorage.vanmentes = true
   localStorage.hazak = JSON.stringify(hazak)
   localStorage.muhelyek = JSON.stringify(muhelyek)
   localStorage.varak = JSON.stringify(varak)
   localStorage.bevetelek = JSON.stringify(bevetelek)
   localStorage.svg = JSON.stringify(document.getElementById("svg").innerHTML)
   document.getElementById("arany").innerHTML = bevetelek.arany   
   document.getElementById("ellatmany").innerHTML = bevetelek.ellatmany
}

function ujkatona() {
   if ((bevetelek.ellatmany - 50) < 0) {
      alert("nincs elég adagnyi ellátmányod")
      return false
   }
   let vár = varak.find((item) => folyamatidja == item.id)
   bevetelek.ellatmany -= 50
   vár.katona += 5
   document.getElementById("katonaszam").innerText = vár.katona
   ment()
}



hazak = []
varak = []
muhelyek = []

beallitasok = {
   trend: {
      hazszine:"red"
   },
   hazgyujtesido: 6000,
   muhelygyujtesido: 6000
}

bevetelek = {
    arany:3000,
    ellatmany:3000,
    aranyhely:3000,
    ellatmanyhely:3000,
}

function adogyujt(id) {
   let ido = new Date()
   let most = ido.getTime()
   let haz = hazak.find((item) => id == item.id)
   if (haz.utolsobegyujtes) {
      let elteltido = most - haz.utolsobegyujtes 
      let ado = Math.floor(elteltido / 6000)
      if (bevetelek.arany + ado > bevetelek.aranyhely) {
         ado = ado - ((ado + bevetelek.arany) - bevetelek.aranyhely)
         alert("megtelt a raktárad")
      }
      bevetelek.arany += ado
   }
   haz.utolsobegyujtes = most
   ment()
}

function ellatmanygyujt(id) {
   let ido = new Date()
   let most = ido.getTime()
   let haz = muhelyek.find((item) => id == item.id)
   if (haz.utolsobegyujtes) {
      let elteltido = most - haz.utolsobegyujtes 
      let adag = Math.floor(elteltido / 6000)
      if (bevetelek.ellatmany + adag > bevetelek.ellatmanyhely) {
         adag = adag - ((adag + bevetelek.ellatmany) - bevetelek.ellatmanyhely)
         alert("megtelt a raktárad")
      }
      bevetelek.ellatmany += adag
   }
   haz.utolsobegyujtes = most
   ment()
}


function varmenu(id) {
   kivár = varak.find((item) => item.id == id)
   folyamatidja = id
   document.getElementById("katonaszam").innerText = kivár.katona
   document.getElementById("varmenu").style.display = 'block'
}


function epites(bejovoid) {
document.getElementById("plusz").style.display = 'block'
folyamatidja = bejovoid
}

function tovabbhaz() {
   if (((bevetelek.arany - 100) < 0) || ((bevetelek.ellatmany - 100) < 0)) {
      alert("nincs elég Aranyad és/vagy Ellátmányod")
      return false
   }
   bevetelek.arany -= 100
   bevetelek.ellatmany -= 100
    document.getElementById("plusz").style.display = 'none'
    let bejovoid = folyamatidja
    let alap = document.getElementById(bejovoid)
    let svg = document.getElementById("svg")
    svg.innerHTML += '<g id="' + bejovoid + 'haza" onclick="adogyujt(this.id)" title="Ház">  \
    <rect   \
        fill="green"  \
        stroke="black"  \
        stroke-width="5"  \
        width="60"  \
        height="60"  \
        x="' + Number(alap.x.baseVal.value + 0) + '"  \
        y="' + Number(alap.y.baseVal.value + 0) + '"   \
    />  \
        <rect  \
           fill="'+ beallitasok.trend.hazszine +'"  \
           width="40"  \
           height="40"  \
           x="' + Number(alap.x.baseVal.value + 10) + '"  \
           y="' + Number(alap.y.baseVal.value +  10) + '"  \
           stroke="black"  \
           stroke-width="5" />  \
       <line x1="' + Number(alap.x.baseVal.value + 30) + '" y1="' + Number(alap.y.baseVal.value +  10) + '" x2="' + Number(alap.x.baseVal.value + 30) + '" y2="' + Number(alap.y.baseVal.value + 50) + '" stroke="black" stroke-width="5" />  \
        <rect  \
           width="10"  \
           height="10"  \
           x="' + Number(alap.x.baseVal.value + 35) + '"  \
           y="' + Number(alap.y.baseVal.value + 25) + '" />  \
           \
    </g>'
    let haz = {}
    haz.id = bejovoid + "haza"
    hazak.push(haz)
    adogyujt(haz.id)
}

function tovabbvar() {
   if (((bevetelek.arany - 300) < 0) || ((bevetelek.ellatmany - 300) < 0)) {
      alert("nincs elég Aranyad és/vagy Ellátmányod")
      return false
   }
   bevetelek.arany -= 300
   bevetelek.ellatmany -= 300
   document.getElementById("plusz").style.display = 'none'
   let bejovoid = folyamatidja
   let alap = document.getElementById(bejovoid)
   let svg = document.getElementById("svg")
   svg.innerHTML += '<g id="' + bejovoid + 'vara" onclick="varmenu(this.id)"> \
      <rect \
      y="' + Number(alap.y.baseVal.value + 0) + '" \
      x="' + Number(alap.x.baseVal.value + 0) + '" \
      height="60" \
      width="60" \
      fill="green" \
      stroke="black" \
      stroke-width="2"/> \
      <rect \
      y="' + Number(alap.y.baseVal.value + 5) + '" \
      x="' + Number(alap.x.baseVal.value + 5) + '" \
      height="50" \
      width="50" \
      fill="gray" \
      stroke="black" \
      stroke-width="2"/> \
      <rect \
      y="' + Number(alap.y.baseVal.value + 0) + '" \
      x="' + Number(alap.x.baseVal.value + 0) + '" \
      height="15" \
      width="15" \
      fill="gray" \
      stroke="black" \
      stroke-width="2"/> \
      \
      <rect \
      y="' + Number(alap.y.baseVal.value + 45) + '" \
      x="' + Number(alap.x.baseVal.value + 0) + '" \
      height="15" \
      width="15" \
      fill="gray" \
      stroke="black" \
      stroke-width="2"/> \
      \
      <rect \
      y="' + Number(alap.y.baseVal.value + 0) + '" \
      x="' + Number(alap.x.baseVal.value + 45) + '" \
      height="15" \
      width="15" \
      fill="gray" \
      stroke="black" \
      stroke-width="2"/> \
      <rect \
      y="' + Number(alap.y.baseVal.value + 45) + '" \
      x="' + Number(alap.x.baseVal.value + 45) + '" \
      height="15" \
      width="15" \
      fill="gray" \
      stroke="black" \
      stroke-width="2"/> \
      \
      <rect \
      y="' + Number(alap.y.baseVal.value + 0) + '" \
      x="' + Number(alap.x.baseVal.value + 25) + '" \
      height="10" \
      width="10" \
      fill="gray" \
      stroke="black" \
      stroke-width="2"/> \
      <rect \
      y="' + Number(alap.y.baseVal.value + 25) + '" \
      x="' + Number(alap.x.baseVal.value + 0) + '" \
      height="10" \
      width="10" \
      fill="gray" \
      stroke="black" \
      stroke-width="2"/> \
      <rect \
      y="' + Number(alap.y.baseVal.value + 25) + '" \
      x="' + Number(alap.x.baseVal.value + 50) + '" \
      height="10" \
      width="10" \
      fill="gray" \
      stroke="black" \
      stroke-width="2"/> \
      <rect \
      y="' + Number(alap.y.baseVal.value + 50) + '" \
      x="' + Number(alap.x.baseVal.value + 25) + '" \
      height="10" \
      width="10" \
      fill="gray" \
      stroke="black" \
      stroke-width="2"/> \
      </g>'
   let vár = {}
   vár.id = bejovoid + "vara"
   vár.katona = 0
   varak.push(vár)
   ment()
}

function tovabbmuhely() {
   if (((bevetelek.arany - 100) < 0) || ((bevetelek.ellatmany - 100) < 0)) {
      alert("nincs elég Aranyad és/vagy Ellátmányod")
      return false
   }
   bevetelek.arany -= 100
   bevetelek.ellatmany -= 100
    document.getElementById("plusz").style.display = 'none'
    let bejovoid = folyamatidja
    let alap = document.getElementById(bejovoid)
    let svg = document.getElementById("svg")
    svg.innerHTML += '<g id="' + bejovoid + 'muhelye" onclick="ellatmanygyujt(this.id)">  \
    <rect   \
        fill="green"  \
        stroke="black"  \
        stroke-width="5"  \
        width="60"  \
        height="60"  \
        x="' + Number(alap.x.baseVal.value) + '"  \
        y="' + Number(alap.y.baseVal.value) + '"   \
    />  \
        <rect  \
           fill="brown"  \
           width="40"  \
           height="40"  \
           x="' + Number(alap.x.baseVal.value + 10) + '"  \
           y="' + Number(alap.y.baseVal.value +  10) + '"  \
           stroke="black"  \
           stroke-width="5" />  \
       <line x1="' + Number(alap.x.baseVal.value + 30) + '" y1="' + Number(alap.y.baseVal.value +  10) + '" x2="' + Number(alap.x.baseVal.value + 30) + '" y2="' + Number(alap.y.baseVal.value + 50) + '" stroke="black" stroke-width="5" />  \
        <rect  \
           width="10"  \
           height="10"  \
           x="' + Number(alap.x.baseVal.value + 35) + '"  \
           y="' + Number(alap.y.baseVal.value + 25) + '" />  \
           \
    </g>'
    let haz = {}
    haz.id = bejovoid + "muhelye"
    muhelyek.push(haz)
    ellatmanygyujt(haz.id)
}
