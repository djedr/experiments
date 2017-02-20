const exec = require('child_process').exec;

`
pwd

ls -al

cat node-bash.js

`.split('\n').filter(l => l)
.map(l => exec(l))
.map(c => ['stdout', 'stderr']
    .map(s => c[s].pipe(process[s]))
);

// (e, so, se) => console.log(so, se)
