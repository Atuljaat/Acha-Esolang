const values = {
    dekhoji : "let",
    boloji : "console.log"
}


export function interpreter(tokens) {
    let code = ''
    for ( let token of tokens ) {
        let line = ""
        let first = token[0]
        if ( first.type == 'Keyword' && first.value == 'boloji' ) {
            if ( token[1] != 'Keyword' ) {
                let printValue = token[1].value
                line += `${values[first.value]}(${printValue})`
            }
        } else {
            for ( let word of token ) {
                if ( word.type == "Keyword" ) {
                    line += values[word.value]
                } else {
                    line += ` ${word.value}`
                }
            }
        }
        code += `${line}\n`
        // console.log(line)
    }
    // console.log(code)
    code = code.trim()
    return code
}


// const example = [
//     [
//         { type: "Keyword", value: "dekhoji" },
//         { type: "Identifier", value: "num" },
//         { type: "Operator", value: "=" },
//         { type: "Number", value: "10" },
//     ],
//     [
//         { type: "Keyword", value: "boloji" },
//         { type: "String", value: '"hello dosto"' },
//     ],
//     [
//         { type: "Keyword", value: "boloji" },
//         { type: "String", value: '"acha ji"' },
//     ],
// ];
const example = [
  [
    { type: 'Keyword', value: 'dekhoji' },
    { type: 'Identifier', value: 'num' }, 
    { type: 'Operator', value: '=' },     
    { type: 'Number', value: '10' },
    { type: 'Operator', value: '+' },
    { type: 'Number', value: '10' }
  ],
  [
    { type: 'Keyword', value: 'boloji' },
    { type: 'String', value: '"hello dosto"' }
  ],
  [
    { type: 'Keyword', value: 'boloji' },
    { type: 'String', value: '"acha ji"' }
  ]
]

// interpreter(example)