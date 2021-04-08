var users = leker("users")
var teams = leker("teamek")
var taglista = leker("taglista")
var signupdata
var chatek



function kellaNev(email) {
	//ez fogja lekérdezni egy emailhoz tartozó nevet 
	let data = users.find( function(item) {  
		return email== item.email
	});
	if (typeof(data) != "undefined") {
		return data.name
	} else {
		return email + " még nem regisztrált"
	}
}

function dataLogin(email, pass) {
	//majd ez fogja megkérdezni a phptől hogy van e ilyen és akkor visszaadja a nevet és az emailt
	let data = users.find( function(item) {  
		return email== item.email && pass== item.pass;
	});
	if (typeof(data) != "undefined") {
		return {email:data.email, name:data.name}
	} else {
		return false
	}
	
	
	
} 

function vanIlyen(value) {
	  return value.email != signupdata.email;
	}

function dataSignup(name, email, pass, repass) {
	signupdata = {email:email, name:name}
	let vanilyen = users.every(vanIlyen)                             
	if (vanilyen) {
		if (pass == repass) {
				if (confirm("Biztos benne?")) {
				  let data = {name:name, email:email, pass:pass, costumize:{eszin:"w3-red", mszin:"w3-blue"}}
				  users.push(data)
				  localStorage.setItem("users",JSON.stringify(users));
				  users = leker("users")
				  aktivFelhasznalo = dataLogin(data.email, data.pass)
				  w3.hide('#signup')
				  init()
				} else {
				  alert('Regisztráció megszakítva');
				}
				
		} else {
			alert("nem egyezik a jelszó")
		}
	} else {
		alert("már van ilyen")
	}


}

function leker(mit) {
	
		return JSON.parse(localStorage.getItem(mit)) || []
	
}

function elkuld(action) {
	switch(action) {
		case users:
			localStorage.setItem("users",JSON.stringify(users));
		break;
		
		
		case teamek:
			localStorage.setItem("teamek",JSON.stringify(teamek));
		break;

		
		case chatek:
			localStorage.setItem("chatek",JSON.stringify(chatek));
		break;
	}
	
	
}