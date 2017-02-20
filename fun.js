const script = () => {
	const seq = [
		(then) => fs.readFile(mainFileName, 'utf-8', then),
		(then) => (err, data) => {
			const firstLine = data.split('\n')[0];
			params = /^#define PARAMS /.test(firstLine)?
				firstLine.slice(firstLine.indexOf('PARAMS ') + 7):
				'';
			fs.readFile(templateFileName, 'utf-8', then);
		},
		(then) => (err, data) => {
			const macro = `#define ${componentName}(${params}) ${data.trim().split('\n').join('\\\n')}`;
			fs.writeFile(`${componentOutputDir}/macro.cpp`, macro, then);
		},
		(err) => { if (err) throw err; }
	].reduceRight((prev, curr) => curr(prev));
};

const fun = (() => {
	let args, locals, errorHandler;
	let arg = (...args) => {
	
	};
	let local = (...args) => {
	
	};
	let onError = () => {
	
	};
	let onEnter = () => {
	
	};
	let onExit = () => {
	
	};
	let body = (...args) => {
		return () => {
			args.reduceRight((prev, curr) => curr({ next: prev, error: errorHandler }));
		};
	};
	let call = () => {
	
	};
	
	retrun {
		arg,
		local,
		body,
		input: arg,
		output: body,
		bind: local
	};
})();


let afun = (...args) => {
	const errorHandler = (error) => {
		throw error;
	};
	const ret = {
		onError: (handler) => ret.scope.error = handler,
		scope: { next: undefined, error: errorHandler },
		run: () => {
			args.reduceRight((prev, curr) => {
				ret.scope.next = prev;
				curr(ret.scope);
			});
		}
	};
	
	return ret;
};

let fun = (() => {
	const defaultErrorHandler = (error) => {
		throw error;
	};
	
	const returnHandler = (retVal) => {
		// ?
	};
	
	const argsHandler = scope => {
		scope.next(...scope.args);
	};
	
	return (options) => {
		let {
			onError = defaultErrorHandler,
			body = []
		} = options;
		
		body = [argsHandler, ...body, returnHandler];
		
		const scope = {
			error: onError,
			next: undefined
		};
		
		return (args) => {
			scope.args = args;
			body.reduceRight((prev, curr) => {
				scope.next = prev;
				curr(scope);
			});
		};
	};
})();

let generateComponentMacro = {
	name: 'macro-generate',
	script: fun({
		body: [
			scope => () => {
				scope.templateFileName = `${componentOutputDir}/template.html`;
				scope.mainFileName = `${componentInputDir}/main.cpp`;
				
				fs.readFile(scope.mainFileName, 'utf-8', scope.next)
			},
			scope => (err, data) => {
				const firstLine = data.split('\n')[0];
				scope.params = /^#define PARAMS /.test(firstLine)?
					firstLine.slice(firstLine.indexOf('PARAMS ') + 7):
					'';
				fs.readFile(scope.templateFileName, 'utf-8', scope.next);
			},
			scope => (err, data) => {
				const macro = `#define ${componentName}(${scope.params}) ${data.trim().split('\n').join('\\\n')}`;
				fs.writeFile(`${componentOutputDir}/macro.cpp`, macro, scope.error);
			}
		],
		onError: (err) => { if (err) throw err; }
	});
}

let scope = {
	error: (err) => { if (err) throw err; }
};
let fn = fun(scope, [
	() => {
		scope.templateFileName = `${componentOutputDir}/template.html`;
		scope.mainFileName = `${componentInputDir}/main.cpp`;
		
		fs.readFile(scope.mainFileName, 'utf-8', scope.next)
	},
	(err, data) => {
		const firstLine = data.split('\n')[0];
		scope.params = /^#define PARAMS /.test(firstLine)?
			firstLine.slice(firstLine.indexOf('PARAMS ') + 7):
			'';
		fs.readFile(scope.templateFileName, 'utf-8', scope.next);
	},
	(err, data) => {
		const macro = `#define ${componentName}(${scope.params}) ${data.trim().split('\n').join('\\\n')}`;
		fs.writeFile(`${componentOutputDir}/macro.cpp`, macro, scope.error);
	}
]);

fun(() => {
	const scope = {
		error: (err) => { if (err) throw err; }
	};
	return [
		() => {
			scope.templateFileName = `${componentOutputDir}/template.html`;
			scope.mainFileName = `${componentInputDir}/main.cpp`;
			
			fs.readFile(scope.mainFileName, 'utf-8', scope.next)
		},
		(err, data) => {
			const firstLine = data.split('\n')[0];
			scope.params = /^#define PARAMS /.test(firstLine)?
				firstLine.slice(firstLine.indexOf('PARAMS ') + 7):
				'';
			fs.readFile(scope.templateFileName, 'utf-8', scope.next);
		},
		(err, data) => {
			const macro = `#define ${componentName}(${scope.params}) ${data.trim().split('\n').join('\\\n')}`;
			fs.writeFile(`${componentOutputDir}/macro.cpp`, macro, scope.error);
		}
	]
});

fun((scope) => {
	scope.error = (err) => { if (err) throw err; };
	
	return [() => {
		scope.templateFileName = `${componentOutputDir}/template.html`;
		scope.mainFileName = `${componentInputDir}/main.cpp`;
		
		fs.readFile(scope.mainFileName, 'utf-8', scope.next)
	}, (err, data) => {
		if (err) return scope.error(err);
		const firstLine = data.split('\n')[0];
		scope.params = /^#define PARAMS /.test(firstLine)?
			firstLine.slice(firstLine.indexOf('PARAMS ') + 7):
			'';
		fs.readFile(scope.templateFileName, 'utf-8', scope.next);
	}, (err, data) => {
		if (err) return scope.error(err);
		const macro = `#define ${componentName}(${scope.params}) ${data.trim().split('\n').join('\\\n')}`;
		fs.writeFile(`${componentOutputDir}/macro.cpp`, macro, scope.error);
	}];
});


let test = fun((scope) => {
	Object.assign(scope, {
		error: () => {},
		cancel: () => {},
	});
	return [
		() => {
			return scope.ret(5);
		}
	];
});

let cancelTest = test((five) => console.log(five));


scope.resolve / scope.return / fun.return
scope.reject / scope.throw / fun.throw
scope.produce / scope.generate / scope.yield
scope.then
scope.cancel / fun.cancel / fun.return

scope.generate



fun.next(x?).value
fun.next(x?).done

generator.return ~> generator.cancel(value);

let test = fun((self) => {
	Object.assign(self, {
		reject: () => {},
		cancel: () => {},
	});
	return [
		() => {
			return scope.resolve(5);
		}
	];
});

let test = fun((self) => {
	Object.assign(self, {
		reject: () => {},
		cancel: () => {},
	});
	return [
		() => {
			return scope.produce(5);
		},
		(five) => {
			scope.val = five;
		}
	];
});


function* fibonacci(){
  var fn1 = 0;
  var fn2 = 1;
  while (true){  
    var current = fn1;
    fn1 = fn2;
    fn2 = current + fn1;
    var reset = yield current;
    if (reset){
        fn1 = 0;
        fn2 = 1;
    }
  }
}

const fibonacci = fun((self) => [
	() => {
		self.fn1 = 0;
		self.fn2 = 1;
		
		self.advance();
		//return self.next();
	},
	self.while(true), self.begin,
	() => {
		self.current = fn1;
		self.fn1 = self.fn2;
		self.fn2 = current + self.fn1;
		
		return self.yield(current);
	},
	(reset) => {
		if (reset) {
			self.fn1 = 0;
			self.fn2 = 1;
		}
	},
	self.end
]);

scope.advance = () => {
	// schedule next step as microtask
	return Promise.resolve(5).then(scope.next());
}

scope.while = (condition) => {
	return () => {
		if (condition) {
			scope.iterating = true;
			return scope.next();
		} else {
			let count = 0;
			
			scope.iterating = false;
			
			while (count > 0) {
				f = scope.next();
				if (f === scope.begin) {
					count += 1;
				} else if (f === scope.end) {
					count -= 1;
				}
			}
			return scope.next();
		}
	}
}

// or use stack to track begin & end positions

scope.begin = () => {
	scope.advance();
}

scope.end = () => {
	if (scope.iterating) { // perhaps this is not necessary
		let count = 1;
		
		while (count > 0) {
			f = scope.prev();
			if (f === scope.begin) {
				count -= 1;
			} else if (f === scope.end) {
				count += 1;
			}
		}
		return scope.prev();
	} else {
		return scope.next();
	}
}


s.while(true),
x,
y,
z,
s.end


s.while = (condition) => () => {
	s.begins.push(s.nextIndex);
	if (condition) {
		
	}
}

const fibonacci = fun((self) => [
	() => {
		self.fn1 = 0;
		self.fn2 = 1;
		
		self.while(true)(() => {
			self.current = fn1;
			self.fn1 = self.fn2;
			self.fn2 = current + self.fn1;
			
			return self.yield(current);
		}, (reset) => {
			if (reset) {
				self.fn1 = 0;
				self.fn2 = 1;
			}
			
			return self.loop();
		});
	}
]);

s.while = (predicate) => (...body) => {
	let loopBody = fun((s) => [...body]);
	
	let loop = () => {
		if (predicate()) loopBody(loop);
	};
	
	loop();
};

break
continue

f((ret) => {
	
})(args)

fun((scope) => (hooks) => (args) => [

]);

fun((scope, hooks) => [(args)

]);

fun.while(() => s.i > 3)(

);


(err, data) => {
	
},

fs.readFile(scope.mainFileName, 'utf-8', scope.next())

let scope = [
	() => {
		scope.seq = scope.values();
		
		fs.readFile(scope.mainFileName, 'utf-8', scope.seq.next().value);
	},
];

scope.next = () => {
	return bodyValues.next().value;
};


() => fs.readFile(scope.mainFileName, 'utf-8', scope.then()),
scope.checkError,
(data) => {
	
}

() => fs.readFile(scope.mainFileName, 'utf-8', scope.thenMaybe()),
(data) => {
	
}

s.maybe	
s.checkError = (err, ...args) => {
	if (err) return scope.error(err);
	scope.advance(...args);
}

s.thenMaybe = () => {
	return s.checkError; // s.maybe
}

scope.callbackConvention = 'nodejs'; // error first callbacks

scope.checkErrorThen();
scope.maybeThen();

scope.next // getter would work

let x = {
	i: 0,
	get next() {
		return x.i++;
	}
};


let f = fun((scope) => [(...args) => {
	
}, () => {
	
}], {
	onError: () => {},
	onReturn: () => {},
	onCancel: () => {},
	callbackConvention: 'nodejs',
	checkErrorsImplicitly: true
});

f(a, b, c, {
	onError: () => {},
	onReturn: () => {},
	onCancel: () => {},
	callbackConvention: 'nodejs',
	checkErrorsImplicitly: true
});

fun({
	body: (scope) => [
	
	],
	// ...
});



