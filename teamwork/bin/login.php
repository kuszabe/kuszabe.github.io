<?php

$action = (isset($_GET['action']))?$_GET['action']:'none';

try {
	switch($action) {

	  case 'login':
		if (!isset($_POST['email']) || !isset($_POST['pwd'])) { 
		  throw new Exception("400 Bad Data!");
		};
		 
	    $email = $_POST['email'];
	    $pwd = md5('Bendi'.md5($_POST['pwd']));
	    
        $db = new SQLite3('teamwork.db');
        
        if (!db) {
		  throw new Exception("402 Nincs adatbázis");
		};

        $query = $db->query("select email, nev from felhasznalok where email = '$email' and password='$pwd'");
        
        if (!$query) {
			throw new Exception("402 Nem jó a query");
        
		$row = $query->fetchArray();
	    
	    if (!row) {
			throw new Exception("491 A felhasználó nem azonosítható!");
		}
		
		echo '{"email":"'.$row['email'].'", "nev":"'.$row['nev'].'"}';
	    
	    
	  break;
	  
	  case 'register':
	    
	    
	  break;
	  
	  case 'none': 
	      throw new Exception("400 Nem adtál meg akciót");
	  
	  break;
	  
	  default:
	      throw new Exception("400 Nincs ilyen akció");
	  
	  
	  break;


	}
}
catch(Exception $e){
  header('HTTP/1.0 '.$e->getMessage());
};

?>
