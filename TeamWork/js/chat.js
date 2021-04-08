var aktivChat
var userchats  = []
var ujchatusers = []
chatek = leker("chatek")

function chatScrollTo(id) {document.getElementById(id).scrollIntoView()}

function chatToltes() {
	chatek = leker("chatek")
	userchats = chatek.filter(myFunction);
	function myFunction(value, index, array) {
		function myFunction2(value, index, array) {
		  return value.email == aktivFelhasznalo.email;
		}
		return value.tagok.some(myFunction2)
	}
	let lista = document.getElementById("chatlist");
	lista.innerHTML = '';
	userchats.forEach(function(item, index) {
	lista.innerHTML += '<div class="w3-container w3-xlarge w3-padding-large w3-block w3-hover-light-blue w3-border w3-bar" onclick="openChat(' + item.id + ')">   \
	<i class="fas fa-users"></i><span>' + item.name +'</span></div>'
	});
  
}

function chatUzenetToltes() {
	
	let lista = document.getElementById("chatuzenetlista");
	lista.innerHTML = '';
	aktivChat.uzik.forEach(function(item, index) {
		if (aktivFelhasznalo.email == item.poster) {
			lista.innerHTML += '<div id="ct'+ index +'" class="w3-clear"><div class="' + item.style + ' w3-large w3-right w3-light-blue w3-border"><p>' + item.szoveg +'</p></div></div>'
		} else if ("rendszer" == item.poster) {
			lista.innerHTML += '<div class="w3-clear"><div class="' + item.style + ' w3-large w3-block w3-blue w3-center w3-border"><p>' + item.szoveg +'</p></div></div>'
		} else {
			lista.innerHTML += '<div class="w3-clear"><div class="' + item.style + ' w3-large w3-left w3-padding w3-gray w3-round w3-border"><div class="fas fa-user w3-tooltip"> &nbsp; <div class="w3-text w3-label w3-round w3-text-blue w3-border w3-white">' + kellaNev(item.poster) + '</div> &nbsp; </div>' + item.szoveg +'</div></div>'
		}
	});
	chatScrollTo("chatalja")
}

function ujChatUzenet(mit, chatid) {
	let chat = userchats.find( function (item){
			return item.id == chatid
	})
	if (chat) {
		
		if (mit == 'chatinput') {
			let input = document.getElementById('chatinput')
			mit = input.value
			input.value = ""
		}
		
		if (mit == "") {return false}
		
		chat.uzik.push({szoveg:mit, style:"w3-panel", poster:aktivFelhasznalo.email});
		elkuld(chatek)
		chatUzenetToltes()
	}
}

function chatUzenetTorles(uzid, chatid) {
	let chat = userchats.find( function (item){
			return item.id == chatid
	})
	if (chat) {
		
		if (mit == 'chatinput') {
			let input = document.getElementById('chatinput')
			mit = input.value
			input.value = ""
		}
		
		if (mit == "") {return false}
		
		chat.uzik.push({szoveg:mit, style:"w3-panel", poster:aktivFelhasznalo.email});
		elkuld(chatek)
		chatUzenetToltes()
	}
}

function addChat() {
	let input = document.getElementById("ujchatnevinput")
	let ujid = chatek.length + 1
	chatek.unshift({name:input.value, tagok:ujchatusers, id:ujid, uzik:[{szoveg:"Üdvözlünk a(z) " + input.value + " chatben", style:"w3-panel", type:"text", poster:"rendszer"}]})
	ujchatusers = []
	w3.hide('#ujchat')
	elkuld(chatek)
	chatToltes()
}

function openChat(index) {
	aktivChat = userchats.find(function (item){
		return index == item.id
	})
	if (aktivChat) {
		w3.hide('#navbar')
		ugras("marad", "chatbelul", aktivChat.name)
		document.getElementById("chatnev").innerText = aktivChat.name
		chatUzenetToltes()
	} else {
		ugras('marad', 'chat', 'Chat')
		alert('Nem taáljuk ezt a chatet. Ellenőrizze hogy a megfelelő profillal jelentkezett-e be.')
	}
}

function chatInfo() {
	w3.toggleShow('chatuzeno')
	w3.toggleShow('#chatinfo')
}

function closeChat() {
	aktivChat = {}
	w3.show('#navbar')
	ugras("marad", "chat", "Chat")
}

function leaveChat(index) {
	let kivchat = chatek.find( function (item) {
		return index == item.id
	});
	let kivuserindex
	if (kivchat) {
		console.log(kivchat)
		console.log(chatek)
		kivuserindex = kivchat.tagok.findIndex( function (item) {
			console.log("vizsgalom")
			return aktivFelhasznalo.email == item.email
		});
	} else {
		console.error("nincs meg a chat")
		return false
	}
	if (kivuserindex == -1) {
		console.error("nincs meg az ember")
		return false
	} else {
		kivchat.tagok.splice(kivuserindex, 1)
		elkuld(chatek)
		closeChat()
		chatToltes()
		console.log("kész")
	}
}

function ujChat() {
	w3.show('#ujchat')
	w3.show('#emberadd')
	w3.hide('#ujchatnev')
}

function ujember() {
	let input = document.getElementById("emberekinput")
	if (input.value != "") {
		let nev = kellaNev(input.value)
		ujchatusers.push({email:input.value, jog:'user'})
		let lista = document.getElementById("emberlista");
		lista.innerHTML += '<div class="w3-container w3-large w3-padding-large w3-block w3-hover-light-blue w3-border"><i class="fas fa-user"></i><span>' + input.value + ' - ' + nev + '</span></div>'
		input.value = ""
	}
}

function emberekKesz() {
	let input = document.getElementById("emberekinput")
	if (input.value != "") {
		ujchatusers.push({email:input.value, jog:'user'})
	}
	
	
	
	if (ujchatusers.length == 1) {
		let input = document.getElementById("ujchatnevinput")
		let masiknev = kellaNev(ujchatusers[0].email)
		input.value = aktivFelhasznalo.name + "-" + masiknev
		ujchatusers.push({email:aktivFelhasznalo.email, jog:'admin'})
		addChat()
	} else if (ujchatusers.length == 0) {
		alert("Nem chatelhetsz saját magaddal")
	} else {
		ujchatusers.push({email:aktivFelhasznalo.email, jog:'admin'})
		w3.show('#ujchatnev')
		w3.hide('#emberadd')
	}
	


}

function chatInit() {
	
	chatToltes()
	
	// Get the input field
	var chatinput = document.getElementById("chatinput");

	// Execute a function when the user releases a key on the keyboard
	chatinput.addEventListener("keyup", function(event) {
	  // Number 13 is the "Enter" key on the keyboard
	  if (event.keyCode === 13) {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		ujChatUzenet('chatinput', aktivChat.id)
	  }
	});

}