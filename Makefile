MAIN_BRANCH = main

cmt-%:
	git commit -m "${@:cmt-%=%}"

push:
	git push origin HEAD

pull:
	git checkout ${MAIN_BRANCH}
	git pull origin ${MAIN_BRANCH}

newb-%:
	git checkout -b ${@:newb-%=%}

delb-%:
	git branch -d ${@:delb-%=%}