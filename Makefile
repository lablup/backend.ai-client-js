node: backend.ai-client-node.ts
	./node_modules/typescript/bin/tsc --target ES2017 backend.ai-client-node.ts
es6 : backend.ai-client-node.ts
	./node_modules/typescript/bin/tsc --target ES2017 backend.ai-client-node.ts
	grep -v "Exclude for ES6" ./backend.ai-client-node.js > ./backend.ai-client-node-to-es6.js
	./node_modules/browserify/bin/cmd.js -p tinyify -s ai -o backend.ai-client-es6.js ./backend.ai-client-node-to-es6.js
	rm ./backend.ai-client-node-to-es6.js
