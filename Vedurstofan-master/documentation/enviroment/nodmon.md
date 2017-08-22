# Vedurstofan
Mælirekstrarkerfi fyrir Veðurstofu Íslands

####Nodemon

	Nodemon er allveg eins og node hvað kemur að því að vera með server í gangi, þetta er lítið tól sem er að hlusta á server skrár og endurræsir server ef það verða eitthverjar breytingar á skrám sem hann notast við. Með þessu þarf ekki að hafa áhyggjur af því að ef hann dettur niður vegna villu í skrá, þá er nóg að laga villu, eftir það ræsir hann sig upp sjálfkrafa um leið og villa er löguð. Ef það er breyting sem leiðir ekki af sér villu þá endurræsir hann sig eðilega og hægt er að prufa breytingu strax án allar óþæginda.

	Ef þú hefur hann ekki uppsetan nú þegar þá er það mjög einfalt en þú gerir það með því að :

		npm install -g nodemon

		(-g er global flag sem setur upp nodemon á vélinni en ekki aðeins verkefni)

	Ef þú hefur nodemon uppsetan, þá þarftu ekki að fara í gegnum þetta ferli. En packet.json er með allar dependencies sem þarf og er nodemon þar inni.

	Grunt er depended á nodemon og því þarf hann að vera til staðar.

	

