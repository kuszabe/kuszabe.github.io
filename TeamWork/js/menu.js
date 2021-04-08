function cimsorVizsgalat() {
  switch (location.hash) {
    case "#teams" :
      ugras('marad', 'teams', 'Csapatok')
    break;

    case "#chat" :
      ugras('none', 'chat', 'Chat')
    break;

    case "#beallitasok" :
      ugras('none', 'beallitasok', 'Beállítások')
    break;

    case "#user" :
      ugras('none', 'user', 'Én')
    break;

    default :
      if (location.hash[1] == "$") {
        switch(location.hash.length) {
          case 2:
            ugras('marad', 'teams', 'Csapatok')
          break;
            
          case 3:
            openteam(location.hash[2])
          break;

          case 4:
            openteam(location.hash[2] + location.hash[3])
          break;

          case 5:
            openteam(location.hash[2] + location.hash[3] + location.hash[4])
          break;
          
          case 6:
            openteam(location.hash[2] + location.hash[3] + location.hash[4] + location.hash[5])
          break;
          
          case 7:
            openteam(location.hash[2] + location.hash[3] + location.hash[4] + location.hash[5] + location.hash[6])
          break;
          
          case 8:
            openteam(location.hash[2] + location.hash[3] + location.hash[4] + location.hash[5] + location.hash[6] + location.hash[7])
          break;
        }
        
      } else if (location.hash[1] == "%") {
        switch(location.hash.length) {
          case 2:
            ugras('none', 'chat', 'Chat')
          break;

          case 3:
            openChat(location.hash[2])
          break;

          case 4:
            openChat(location.hash[2] + location.hash[3])
          break;

          case 5:
            openChat(location.hash[2] + location.hash[3] + location.hash[4])
          break;
          
          case 6:
            openChat(location.hash[2] + location.hash[3] + location.hash[4] + location.hash[5])
          break;
          
          case 7:
            openChat(location.hash[2] + location.hash[3] + location.hash[4] + location.hash[5] + location.hash[6])
          break;
          
          case 8:
            openChat(location.hash[2] + location.hash[3] + location.hash[4] + location.hash[5] + location.hash[6] + location.hash[7])
          break;
        }
      } else {
        ugras('marad', 'teams', 'Csapatok')
      }
    break;
  }
}

function ugras(evt, hova, mit) {
  // Declare all variables 
  var i, tabcontent, tablinks;
  
  switch (hova) {
    case "teambelul" :
      location.hash = "$" + aktivteam.id 
    break;

    case "chatbelul" :
      location.hash = "%" + aktivChat.id
    break;

    default :
      location.hash = hova
    break;
  }

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }


if (evt != 'marad') {
  // Get all elements with class="tablinks" and remove the class "w3-white"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-white", "");
  }
}

  // Show the current tab, and add an "w3-white" class to the button that opened the tab
  document.getElementById(hova).style.display = "block";
  if (evt != "none" && evt != 'marad') {
	evt.target.className += " w3-white";
  }
  
  //set the page title to the current page
  window.document.title = mit + " - TeamWork"
}

function setTitle() {
  let i;
  let linkspan = document.getElementsByClassName("linkspan");
  for (i = 0; i < linkspan.length; i++) {
    linkspan[i].style.display = "block";
  }
  
  let linkicon = document.getElementsByClassName("linkicon");
  for (i = 0; i < linkicon.length; i++) {
    linkicon[i].style.display = "none";
  }
}

function setIcon() {
  let i;
  let linkspan = document.getElementsByClassName("linkspan");
  for (i = 0; i < linkspan.length; i++) {
    linkspan[i].style.display = "none";
  }
  
  let linkicon = document.getElementsByClassName("linkicon");
  for (i = 0; i < linkicon.length; i++) {
    linkicon[i].style.display = "block";
  }
}

function setTitleAndIcon() {
  let i;
  let linkspan = document.getElementsByClassName("linkspan");
  let linkicon = document.getElementsByClassName("linkicon");
  
  for (i = 0; i < linkspan.length; i++) {
    linkspan[i].style.display = "none";
  }
  
  for (i = 0; i < linkicon.length; i++) {
    linkicon[i].style.display = "none";
  }
  
  for (i = 0; i < linkspan.length; i++) {
    linkspan[i].style.display = "block";
  }
  
  for (i = 0; i < linkicon.length; i++) {
    linkicon[i].style.display = "block";
  }

}
