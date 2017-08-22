# Vedurstofan
Mælirekstrarkerfi fyrir Veðurstofu Íslands

####Kóðareglur

	Vinsamlegast fylgja þessum reglum, lestu þetta yfir og kíktu yfir uppsetningar á verkefninu. Þetta gerir það að verkum að kóði og annað er allt eins og gerir auðvelt að lesa yfir, fallegri kóði kemur til með að verða til staðar. Góð vinnubrögð.

	1. Ekki setja neitt inn á github nema það virki. Þar að segja að allt sé stabílt og virki eins og það á að virka. Ef skyldi að það fari eitthvað inn á github sem ekki á að vera þar, vinsamlegast láttu vita af því og laga áður en það smitar í verkefni hjá öðrum. 

	2. Best væri að notast við brances, þar sem hver og einn er að vinna á eigin brance áður en því er sameinað á github. Ef farið er varlega þá er ekki þörf á því, bara passa hvað er veri að setja á github.

	3. Nafnagiftir á Folders og Files.

		Folders : Named with lowercase
		Files 	: Named with both lowercase and uppercase
					Models in server folder is uppercase 
					Other files are lowercase

	4. Folder structure

		Main
			..bin
				..www (main server logic).
			..*node_modules*
			..public (Angular project)
				..javascript
					..controllers (angular controllers)
					..services	(factories, getting things from server)
					.angularApp.js (routings)
				..main (grunt injections of files to use) DO NOT CHANGE FILES.
					.myApp.css
					.myApp.js
					.myApp.min.css
					.myApp.min.js
				..stylesheets
					..css
						.style.css
						.*other files to use for each view.. will be injected
					..less
						.*other files to use for each view.. will be injected
				..vews
					.fileName.html 
			..server
				..config (This is global configuration to use. One place change in server)
					.database.js
					.passport.js
					.secrets.js
					.*other files to use for configuration will build up.
				..models (This is schema for mongodb and logic needed)
					.Comments.js
					.Posts.js
					.Users.js
					.*other files to use for schems in the project will build up.
				..routes (Api calls, dont use only index... make new for each part)
					.basicRoutesToStart.js (DO NOT CHANGE, for copy to new routes)
					.index.js
					.posts.js
					.users.js
					.*other files to use for routes to make better oversight of api.
		.gruntfile.js
		.info.md
		.package.json
		.README.md
		.server.js

	5. Code sample

		function (req, res) {
			if (err) {
				....
			}
			....
		};

		For all variable use camelCase fx : 

			var thisHere = 1 + 1;

		app.controller('AuthCtrl', ['$scope', '$state', 'auth',
    			function ($scope, $state, auth) {
        			....
    			}
    		]);
    
    6. Comments
    		
    		Please comment code briefly at all times. It doesn't matter how great your'e code
    		looks, ut doesn't matter how great and good programmer you are. At some point 
    		someone will be looking at the code, changing it, adding to it. When working on 
    		projects it's best to comment some thought down, this will help you and others
    		to get better understanding of the code, setup and geting into the code in better
    		time. Be fare with yourself and others.
    		
    		Please read this short article about the subject comments, it will change the way
    		you will code to the better with simple changes without have to change large 
    		factor in your coding skills.
    		
    		http://blog.codefx.org/techniques/documentation/comment-your-fucking-code/
    		
    		Comment your'e code, be a teamplayer! 
    		
    7. (Work in progress).

