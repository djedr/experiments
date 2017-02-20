() => {}
_=>{}
\[]

{ content: c.call(fs::readFile, fileName, fileEncoding) }
_ => doSthWith(c.content)

@let(@content, @fs.readFile


_ => fs.readFile(fileName, fileEncoding, c.next);
content => ...

let content = fs.readFile(fileName, fileEncoding, cb);

queue
multiple readers
    // listeners?
multiple writers
    // emitters?

order ~ queue ~ buffering

_ => {
    x.addEventListener('keypress', c.next);
    x.addEventListener('click', c.next);
},
e => console.log(e)

{ e: [c.call([x, addEventListener], 'keypress'), c.call([x, addEventListener], 'click')] }

implement c.return

@async(@{let content = fs.readFile(fileName, fileEncoding);})

_ => fs.readFile(fileName, fileEncoding, c.next),
v => {
    c.content = v;
    ...
}

_ => fs.readFile(fileName, fileEncoding, c.next),
callable.bind('content'),
content => ...


(e, i) => {
    exec(com(i), (e, so, se) => {
        console.log(so);
        console.error(se);
    });
}

\[exec[com[->0] \[log[->1] error[->2]]]]
\[exec[com[->[0]] \[log[->[1]] error[->[2]]]]]
\[
    exec[com[->/0] \[log[->/1] error[->/2]]]
]


\/exec[com[->/0] \[log[->/1] error[->/2]]]


a/b/c
a[b[c]]
a[b][c]


\|exec[com[->|0] \[log[->|1] error[->|2]]]



\/exec[com/->/0 \[log/->/1 error/->/2]]


\|exec[com|->|0 \[log|->|1 error|->|2]]

\[exec[com[->[0]] \[log[->[1]] error[->[2]]]]]

\[
    exec[
        com[->[0]]
        \[
            log[->[1]]
            error[->[2]]
        ]
    ]
]

\[
    exec[
        com[
            ->[0]
        ]
        \[
            log[
                ->[1]
            ]
            error[
                ->[2]
            ]
        ]
    ]
]


\[ exec[ com[ ->[0] ] \[ log[ ->[1] ] error[ ->[2] ] ] ] ]

\[exec[com[->[0]]
    \[log[->[1]]
        error[->[2]]
    ]
]]

\[
    exec[com[->[0]]
        \[log[->[1]]
            error[->[2]]
        ]
    ]
]

\[
    exec[
        com[->[0]]
        \[
            log[->[1]]
            error[->[2]]
        ]
    ]
]

\[exec[com[->[0]]
    \[do[log[->[1]]
        error[->[2]]
    ]]
]]

\[exec[com[->[0]] \[do[log[->[1]] error[->[2]] ]] ]]
