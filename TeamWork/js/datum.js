function datumObjekt() {
	var nap = new Date();
	var nap2 = nap.getDate();
	var ev = new Date();
	var ev2 = ev.getFullYear();	
	var ho = new Date();
	var ho2 = ho.getMonth() + 1;	
	var osszdatum = ev2 + "-" + ho2 + "-" + nap2;
	return osszdatum;
}	