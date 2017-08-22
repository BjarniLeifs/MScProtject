Github
Basic commands:

	git add filename/foldername 
	git commit -m "message to commit with "
	git pull 
	git push


[For Windows](https://windows.github.com) | [For Mac](https://mac.github.com) | [All platforms](http://git-scm.com)
------------ | ------------- | -------------


Command | Information
------------ | -------------
(`$ git config --global user.name "[name]"`) | Sets the name you want, to your commit transactions
(`$ git config --global user.email "[email]"`) | Sets the email you want, to your commit transactions
(`$ git config --global color.ui auto`) | Enables helpful colorization of command line output
(`$ git init [project-name]`) | Creates a new local repository with the specified name
(`$ git clone [url] `) | Downloads a project & its entire version history
(`$ git status`) | Lists all new or modified files to be commited
(`$ git add [file]`) | Snapshots the file in preparation for versioning
(`$ git reset [file]`) | Unstages the file, but preserve its contents
(`$ git diff`) | Shows file differences not yet staged
(`$ git diff --staged`) | Shows file differences - staging vs last version
(`$ git commit -m "[descriptive message]"`) | Records file snapshots permanently in version history
(`$ git branch`) | Lists all local branches in the current repository
(`$ git branch [branch-name]`) | Creates a new branch
(`$ git checkout [branch-name]`) | Switches to the specified branch & updates the directory
(`$ git merge [branch]`) | Combines the specified branch history to current branch
(`$ git branch -d [branch-name]`) | Deletes the specified branch
(`$ git rm [file]`) | Deletes the file from the directory & stages the deletion
(`$ git rm --cached [file]`) | Removes the file from version control but preserves
(`$ git mv [file-original] [file-renamed]`) | Changes the file name and prepares it for commit
(`$ git ls-files --other --ignored --exclude-standard`) | Lists all ignored files in this project
(`$ git stash`) | Temporarily stores all modified tracked files
(`$ git stash list`) | Lists all stashed changesets
(`$ git stash pop`) | Restores the most recently stashed files
(`$ git stash drop`) | Discards the most recently stashed changeset
(`$ git log`) | Lists version history for the current branch
(`$ git log --follow [file]`) | Lists version history for a file, including renames
(`$ git diff [1st-branch]...[2nd-branch]`) | Shows content differences between two branches
(`$ git show [commit]`) | Outputs metadata & content changes of the commit
(`$ git reset [commit]`) | Undoes all commits, preserving changes locally
(`$ git reset --hard [commit]`) | Discards all history and changes back to the commit
(`$ git fetch [bookmark]`) | Downloads all history from the repository bookmark
(`$ git merge [bookmark]/[branch]`) | Combines bookmark’s branch into current local branch
(`$ git push [alias] [branch]`) | Uploads all local branch commits to GitHub
(`$ git pull`) | Downloads bookmark history & incorporates changes
 |
[Resolving a merge conflict from the command line](https://help.github.com/articles/resolving-a-merge-conflict-from-the-command-line) | [Using Git blame to trace changes in a file](https://help.github.com/articles/using-git-blame-to-trace-changes-in-a-file/)
[Understanding the GitHub Flow](https://guides.github.com/introduction/flow/index.html)|[Associating text editors with Git](https://help.github.com/articles/associating-text-editors-with-git)
[Ignoring files](https://help.github.com/articles/ignoring-files) | [GitHub Glossary](https://help.github.com/articles/github-glossary)
[Git Reference](http://git-scm.com/docs) | 	