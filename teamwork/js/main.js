
function getById(id) {
	return document.getElementById(id)
}

var aktivFelhasznalo,costumize; 

function vanLogin() {
		let mentett = JSON.parse(localStorage.getItem("aktivFelhasznalo")) || "null"
		if (mentett != "null") {
			aktivFelhasznalo = mentett
			init()
		}
}

function init() {
	document.getElementById('login').style.display = "none";
	document.getElementById('navbar').style.display = "block";
	w3.displayObject("navbar", aktivFelhasznalo);
	w3.displayObject("user", aktivFelhasznalo);
	localStorage.setItem("aktivFelhasznalo",JSON.stringify(aktivFelhasznalo));
	chatInit()
	teamInit()
	cimsorVizsgalat()
}

function ugrasRegisztracio() {
	let signup = document.getElementById("signup")
	let login = document.getElementById("login")
	login.style.display = "none";
	signup.style.display = "block";
}

function singupMegse() {
	document.getElementById("login").style.display = 'block';
	document.getElementById("signup").style.display = 'none';
}




function register() {
	var email= document.getElementById("remail").value; 
    var jelszo= document.getElementById("rpassword").value;
	var jelszoujra= document.getElementById("repassword").value;
	let nev = document.getElementById("rname").value
	dataSignup(nev, email, jelszo, jelszoujra)
}

function login() {
  //it lesz majd az ellenőrzés
  var nev= document.getElementById("name").value; 
  var jelszo= document.getElementById("password").value;

  document.getElementById("name").value = "";
  document.getElementById("password").value = "";
   
  console.log(nev, ", ", jelszo);
  aktivFelhasznalo = dataLogin(nev, jelszo);
  
  console.log(aktivFelhasznalo);
  
  if (aktivFelhasznalo) {
  
	  //minden rendben
	  init()
	
	  
 	  

  }
  else {
      alert('Hibás email vagy jelszó')
	  //kiírjuk, hogy nincs ilyen
  }
  
}


function logout() {
	localStorage.setItem("aktivFelhasznalo",JSON.stringify("null"));
	window.document.title = "Bejelentkezés - TeamWork"
	let i, tabcontent
	document.getElementById('login').style.display = "block";
	document.getElementById('navbar').style.display = "none";	
	  tabcontent = document.getElementsByClassName("tabcontent");
	  for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	  }
}