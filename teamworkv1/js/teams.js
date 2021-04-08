var aktivteam
let teamkiiras = {userteams:[]}
var userteams = []
var ujteamusers = []
teamek = leker("teamek")

function teamScrollTo(id) {document.getElementById(id).scrollIntoView()}

function teamToltes() {
	teamek = leker("teamek")
	userteams = teamek.filter(myFunction);
	function myFunction(value, index, array) {
		function myFunction2(value, index, array) {
		  return value.email == aktivFelhasznalo.email;
		}
		return value.tagok.some(myFunction2)
	}
	if (userteams.length == 0) {
		console.log("nincs teamem")
		w3.hide('.teamcard')
	} else {
		w3.show('.teamcard')
		teamkiiras.userteams = userteams
		w3.displayObject("teams", teamkiiras);
	}
	
  
}

function teamUzenetToltes() {
	
	let lista = document.getElementById("teamuzenetlista");
	lista.innerHTML = '';
	aktivteam.uzik.forEach(function(item) {
		if ("uzi" == item.type) {
			if (item.poster == "rendszer") {
				lista.innerHTML += '<div class="w3-large w3-block w3-blue w3-center w3-border"> \
				<p> ' + item.szoveg + ' </p> \
				</div> '
			} else {
			lista.innerHTML += '<div class="w3-large w3-center w3-padding w3-light-blue w3-panel w3-border"> \
				<p><span class="fas fa-user"></span> ' + kellaNev(item.poster) + ' </p> \
				<p>' + item.szoveg +'</p></div>' 
			}
		} else if (item.type == "feladat") {
			lista.innerHTML += '<div class="w3-clear"><div class="' + item.style + ' w3-large w3-block w3-blue w3-center w3-border"><p>' + item.szoveg +'</p></div></div>'
		} else if (item.type == "file") {
			lista.innerHTML += '<div class="w3-clear"><div class="' + item.style + ' w3-large w3-block w3-blue w3-center w3-border"><p>' + item.szoveg +'</p></div></div>'
		}
	});
}

function ujteamUzenet(mit, teamid) {
	let team = userteams.find( function (item){
			return item.id == teamid
	})
	if (team) {
		
		if (mit == 'teaminput') {
			let input = document.getElementById('teaminput')
			mit = input.value
			input.value = ""
		}
		
		if (mit == "") {return false}
		
		team.uzik.unshift({szoveg:mit, type:"uzi", poster:aktivFelhasznalo.email});
		elkuld(teamek)
		teamUzenetToltes()
	}
}

function teamUzenetTorles(uzid, teamid) {
	let team = userteams.find( function (item){
			return item.id == teamid
	})
	if (team) {
		
		team.uzik.push({szoveg:mit, type:"w3-p", poster:aktivFelhasznalo.email});
		elkuld(teamek)
		teamUzenetToltes()
	}
}

function addteam() {
	let input = document.getElementById("ujteamnevinput")
	let ujid = teamek.length + 1
	teamek.unshift({name:input.value, tagok:ujteamusers, id:ujid, uzik:[{szoveg:"Üdvözlünk a(z) " + input.value + " teamben", style:"w3-panel", type:"uzi", poster:"rendszer"}]})
	ujteamusers = []
	w3.hide('#ujteam')
	elkuld(teamek)
	teamToltes()
	openteam(ujid)
}

function openteam(index) {
	aktivteam = userteams.find(function (item){
		return index == item.id
	})
	if (aktivteam) {
		w3.hide('#navbar')
		ugras("marad", "teambelul", aktivteam.name)
		w3.displayObject('teambelul', aktivteam);
		teamUzenetToltes()
	} else {
		ugras('marad', 'teams', 'Csapatok')
		alert('Nem találjuk ezt a teamet. Ellenőrizze hogy a megfelelő profillal jelentkezett-e be.')
	}
}

function teamInfo() {
	w3.toggleShow('teamuzeno')
	w3.toggleShow('teamheader')
	w3.toggleShow('#teaminfo')
}

function teamUzik() {
	w3.show('teamuzeno')
	w3.hide('teamfeladatok')
	w3.hide('teammegbeszelesek')
	w3.hide('teamfileok')
	teamUzenetToltes()
}

function teamFeladatok() {
	w3.hide('teamuzeno')
	w3.show('teamfeladatok')
	w3.hide('teammegbeszelesek')
	w3.hide('teamfileok')
}

function teamMegbeszelesek() {
	w3.hide('teamuzeno')
	w3.hide('teamfeladatok')
	w3.show('teammegbeszelesek')
	w3.hide('teamfileok')
}

function teamFileok() {
	w3.hide('teamuzeno')
	w3.hide('teamfeladatok')
	w3.hide('teammegbeszelesek')
	w3.show('teamfileok')
}


function closeteam() {
	aktivteam = {}
	w3.show('#navbar')
	ugras("marad", "teams", "Csapatok")
}

function leaveteam(index) {
	let kivteam = teamek.find( function (item) {
		return index == item.id
	});
	let kivuserindex
	if (kivteam) {
		console.log(kivteam)
		console.log(teamek)
		kivuserindex = kivteam.tagok.findIndex( function (item) {
			console.log("vizsgalom")
			return aktivFelhasznalo.email == item.email
		});
	} else {
		console.error("nincs meg a team")
		return false
	}
	if (kivuserindex == -1) {
		console.error("nincs meg az ember")
		return false
	} else {
		kivteam.tagok.splice(kivuserindex, 1)
		elkuld(teamek)
		closeteam()
		teamToltes()
		console.log("kész")
	}
}

function addTeamEmber(teamid, emberemail) {
	let team = teamek.find(function (item) {
		return item.id == teamid
	});

	let bennevan = team.tagok.findIndex(function (item) {
		return item.email == emberemail
	}) ;

	if (bennevan == -1) {
		team.tagok.push({email:emberemail, jog:'user'})
		elkuld(teamek)
		teamToltes()
		console.log("hozzáadva")
	} else {console.log("sikertelen")}
}

function ujteam() {
	w3.show('#ujteam')
	w3.show('#teamemberadd')
	w3.hide('#ujteamnev')
	getById("teamemberlista").innerHTML = ""
}


function ujteamember() {
	let input = document.getElementById("teamemberekinput")
	if (input.value != "") {
		let nev = kellaNev(input.value)
		ujteamusers.push({email:input.value, jog:'user'})
		let lista = document.getElementById("teamemberlista");
		lista.innerHTML += '<div class="w3-container w3-large w3-padding-large w3-block w3-hover-light-blue w3-border"><i class="fas fa-user"></i><span>' + input.value + ' - ' + nev + '</span></div>'
		input.value = ""
	}
	console.log("ujember")
}

function teamemberekKesz() {
	let input = document.getElementById("teamemberekinput")
	if (input.value != "") {
		ujteamusers.push({email:input.value, jog:'user'})
	}

	ujteamusers.push({email:aktivFelhasznalo.email, jog:'admin'})
	w3.show('#ujteamnev')
	w3.hide('#teamemberadd')

}

function teamInit() {
	teamToltes()
	// Get the input field
	var teaminput = document.getElementById("teaminput");
	// Execute a function when the user releases a key on the keyboard
	teaminput.addEventListener("keyup", function(event) {
	  console.log("billentyű fel")
	  // Number 13 is the "Enter" key on the keyboard
	  if (event.key == "Enter") {
		console.log("enter fel")
		// Run the function
		ujteamUzenet('teaminput', aktivteam.id)
	  }
	});
}

	
  
 
  
	


