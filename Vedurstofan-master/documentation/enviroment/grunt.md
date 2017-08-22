# Vedurstofan
Mælirekstrarkerfi fyrir Veðurstofu Íslands

####Grunt

	Við notumst við Grunt hérna, en það má sjá hvað grunt gerir og hvernig það er uppset í skrá í rót sem heitir gruntfile.js. Það sem grunt gerir er að pakka öllu saman í skrár og setja þær í main og sjá til þess að allar breytingar eru uptodate við server og verkefni á rauntíma, sem þýðir að ef þú gerir breytingu þá er hún komin á síðuna og ætti að vera virk, ef ekki þá er eitthvað um villu í kóðanum sem er að gera hana óvirka og ber að skoða það betur en annað.

	Til þess að nota grunt, sem er bæði nauðsynlegt og þægilegt er nóg að skryfa í folder á verkefni í terminal :

		grunt

	Til að finna skrár sem grunt gerir og hendir upp þá eru þær í "public/main".

	Setja upp Grunt og Nodejs fyrir Ubuntu 15.04

	1. Byrja á að setja upp Nodejs
		sudo apt-get update
		sudo apt-get install nodejs

	2. Setjum upp NPM
		sudo apt-get install npm
	
	3. Setja upp Node Legacy
		sudo apt-get install nodejs-legacy

	4. Setjum upp Grunt, -g þýðir að setja það upp globally, fyrir alla notendur tölvunnar.
		sudo npm install -g grunt
		sudo npm install -g grunt-cli

	5. Opna möppuna sem inniheldur Veðurstofuna í terminal. T.d. cd lokaverkefni/Vedurstofan og keyra eftirfarandi skipun til að setja upp dependencies sem verkefnið þarfnast.
		sudo npm install

	6. Keyra eftirfarandi skipun til að vera viss um að Grunt hafi verið sett upp.
		grunt --version
		Á að skila til baka svipuðum niðurstöðum og eftirfarandi
			grunt-cli v0.1.13
			grunt v0.4.5
	
	7. Keyra eftirfarandi skipun í lokaverkefni/Vedurstofan
		grunt
		Á að skila til baka fullt af upplýsingum og enda á
			The server is up and running if local => http://localhost:3000

	8. Grunt ætti að vera uppsett og tilbúið til notkunar.

	Setja upp Grunt og Nodejs fyrir Windows.

	1. Byrja á að setja upp Nodejs
		Sækja Nodejs frá https://nodejs.org/ og fylgja leiðbeiningum um uppsetningu.
		NPM pakkakerfið fylgir Nodejs og þarfnast ekki sér uppsetningar.

	4. Setjum upp Grunt, -g þýðir að setja það upp globally, fyrir alla notendur tölvunnar.
		Keyra Command Prompt sem administrator og keyra eftirfarandi skipanir.
		npm install -g grunt
		npm install -g grunt-cli

	5. Opna möppuna sem inniheldur Veðurstofun í Command prompt. T.d. cd c://lokaverkefni/Vedurstofan og keyra eftirfarandi skipun til að setja upp dependencies sem 	verkefnið þarfnast.
		Passa að keyra Command Prompt sem administrator.		
		npm install

	6. Keyra eftirfarandi skipun í Command Prompt til að vera viss um að Grunt hafi verið sett upp.
		grunt --version
		Á að skila til baka svipuðum niðurstöðum og eftirfarandi
			grunt-cli v0.1.13
			grunt v0.4.5
	
	7. Keyra eftirfarandi skipun í lokaverkefni/Vedurstofan
		grunt
		Á að skila til baka fullt af upplýsingum og enda á
			The server is up and running if local => http://localhost:3000

	8. Grunt ætti að vera uppsett og tilbúið til notkunar.



	