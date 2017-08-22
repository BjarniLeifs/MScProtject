# Vedurstofan
Mælirekstrarkerfi fyrir Veðurstofu Íslands

####Postgresql

	Við notumst við Postgresql í þessu verkefni, það má skoða package.json skrá til að sjá hvað við erum að nota í þessu verkefni en postgresql er pg þar. Ef það er eitthvað vandarmál með postgres þá er hægt að finna documentation á 

		Vefsíða : http://www.postgresql.org

	Fyrir Mac:

	Við mælum með að fyrir mac er notað Postgres.app en það kemur til með að einfalt allt local, en við munum koma til með að hafa tengingu yfir vírinn (web) en annars er þetta tól virkilega gott að hafa. það er hægt að finna það 

		Vefsíða : http://postgresapp.com

	Fyrir Windows:

		Setja inn upplýsingar hérna.

	Fyrir Linux: 

		Til að setja upp PostgreSQL fyrir linux er hægt að nota pakkakerfið.
		Fyrir Ubuntu er hægt að keyra skipunina
			sudo apt-get install postgresql-9.4 

 

	Til þess að database virki þá er gott að muna að það þarf að hafa tenginu með eitthver sql kerfi, þessu tilviki er það postgresql, það þarf að vera til grunnur með því nafni sem notast er við, og þá töflur líka. 

####Skipanir og annað.

	Documentation : http://www.tutorialspoint.com/postgresql/postgresql_create_table.htm
	
	Í terminal sem er ekki postgres sjálft

	Gera database  : createdb dbName
	Henta database : dropdb dbName

	Í terminal sem er postgres sjálft.

	\list 			: sjá hvaða database er til 
	\dt   			: sjá hvaða töflur eru í database
	\d nameOftable  : sér hvernig tafla lítur út
	\connect dbName : Skipta yfir í dbName database

	Endilega safna þessu upp...

	Til að setja upp töflu í database er nóg að gera í folder...

	node nameOfFile.js