![Magnium-CIt](https://magnum-ci.com/status/0faa117e455c6c801848d1b2e0ddcce1.png)
![Dependency](https://david-dm.org/skvisan/Vedurstofan.svg)
# Vedurstofan
Mælirekstrarkerfi fyrir Veðurstofu Íslands

####Hvernig á að byrja. 
	
	Lestu þig til um hvað þarf í Manual folder. Þar er verið að byggja upp library um þetta 
	verkefni, reglur og annað. Endilega kynntu þér það áður en þú byrjar og sjáðu hvort þú 
	sért með allt á hreinu.

	Fyrsta sem þú þarft að gera er að ná í þetta verkefni, gerir það með því að klóna 
	verkefnið af github :

		git clone git@github.com:skvisan/Vedurstofan.git

	Við þetta hefur þú búið til skrá á þeim stað sem þú klónaðir verkefnið sem heitir 
	Vedurstofan.

	Næst þarf að setja upp allar dependencies fyrir verkefnið og það er gert með þvi að vera 
	í terminal og í Vedurstofan möppu, 

		cd Vedurstofan && npm install

	Með þessu hefur þú komið  þér í Vedurstofan möppu af því gefnu að þú hafir verið á þeim 
	stað sem þú afritaðir verkefnið á, npm install er skipun til að setja upp allar dependencies, 
	en það hefðir allveg verið hægt að gera

		cd Vedurstofan

	og svo 

		npm install

	Þá eru dependencies virkar sem verkefnið er að styðja við, það sem þarf næst að gera er að 
	tryggja að þú hafir postgres installed og setja verkefnið upp á réttan stað. 

		Endilega lestu þig til um hvernig á að setja upp postgres og öðru nauðsynlegu 
		varðandi hann. 

		Fyrir Mac mæli ég með að þú notir Postgres.app. Virkilega einfalt og þæginlegt í 
		notkun, en það er hægt að finna allar leiðbeiningar um það : 

			http://postgresapp.com/documentation/


	Til þess að gera verkefnið virkt er nóg að skrifa grunt í terminal

		grunt

	Það kveikir á server og tengir allt sman og þú ættir að geta farið á þann stað sem env hefur 
	skilgreint, ef þú hefur ekkert skilgreint í env verður verkefnið aðgengilegt á vefsíðu localy 
	á porti 3000, því er nóg að opna browser og fara á:


		http://localhost:3000

	Passa þarf upp á að javascript má ekki vera óvirkt á vafra. Ef það er óvirkt þá þarf að virkja það annars virkar hugbúnaðurinn ekki rétt að öllu leyti

