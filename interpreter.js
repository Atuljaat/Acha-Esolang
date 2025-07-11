const values = {
    dekhoji : "let",
    boloji : "console.log",
    kaiseji : "function",
}


export function interpreter(tokens) {
    let code = ''
    for ( let token of tokens ) {
        // console.log('Token => ',token)
        let line = ""
        let first = token[0]
        if ( first.type == 'Keyword' && first.value == 'boloji' ) {
            if ( token[1] != 'Keyword' ) {
                let printValue = token[1].value
                line += `${values[first.value]}(${printValue})`
            }
        } else if (first.type == 'Function') {
            let myLine = `${values[first.value]} ${token[1].value} ${token[2].value} ${token[3].value}`
            line += myLine
        } else if (first.type == 'FunctionCall'){
            line += `${first.value}${token[1].value}`
        }
        else {
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
    code = code.trim()
    console.log(code)
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
    { type: 'Function', value: 'kaiseji' },    
    { type: 'FunctionName', value: 'abc' },    
    { type: 'FunctionParams', value: '(a,b)' },
    { type: 'Delimiter', value: '{' }
  ],
  [
    { type: 'Keyword', value: 'boloji' },      
    { type: 'Identifier', value: 'a' }
  ],
  [ { type: 'Delimiter', value: '}' } ],       
  [
    { type: 'Keyword', value: 'dekhoji' },     
    { type: 'Identifier', value: 'b' },        
    { type: 'Operator', value: '=' },
    { type: 'Number', value: '12' }
  ],
  [
    { type: 'FunctionCall', value: 'abc' },
    { type: 'CallParams', value: '(b)' }
  ],
  [
    { type: 'Keyword', value: 'boloji' },
    { type: 'String', value: '"Hello World"' }
  ]
]


interpreter(example)