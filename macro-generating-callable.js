callable({body: c=> [
	_ => fs.readFile(mainFileName, 'utf-8', c.next),
	callable.try,
	(data) => {
		const firstLine = data.split('\n')[0];
		params = /^#define PARAMS /.test(firstLine)?
			firstLine.slice(firstLine.indexOf('PARAMS ') + 7):
			'';
		fs.readFile(templateFileName, 'utf-8', c.next);
	},
	callable.try
	(data) => {
		const macro = `#define ${componentName}(${params}) ${data.trim().split('\n').join('\\\n')}`;
		fs.writeFile(`${componentOutputDir}/macro.cpp`, macro, c.next);
	},
	callable.try
]});

// args can be a string or array of names

let generateComponentMacroScript = callable({
args: 'componentName',
static: c=> ({ // shared across instances
	const: {
		mainFileName: `${componentInputDir}/main.cpp`,
		templateFileName: `${componentOutputDir}/template.html`,
		macroFileName: `${componentOutputDir}/macro.cpp`,
		paramsName: 'PARAMS ',
		paramsRegex: RegExp(`#define ${c.paramsName}`),
		fileEncoding: 'utf-8'
	}
}),
let: c=> ({ // a copy for each instance (each call)
	params: undefined
}),
body: c=> [
	_ => fs.readFile(c.mainFileName, c.fileEncoding, c.try),
	data => {
		const firstLine = data.slice(0, data.indexOf('\n'));
		c.params = c.paramsRegex.test(firstLine)?
			'' + firstLine.slice(firstLine.indexOf(c.paramsName) + c.paramsName.length):
			'';
		fs.readFile(c.templateFileName, c.fileEncoding, c.try);
	},
	data => {
		const macro = `#define ${c.componentName}(${c.params}) ${data.trim().split('\n').join('\\\n')}`;
		fs.writeFile(c.macroFileName, c.macro, c.try);
	}
]});
