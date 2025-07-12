const values = {
    dekhoji : "let",
    boloji : "console.log",
    kaiseji : "function",
    dijiye : "return",
    suniyeji : "const",
    ignoreji : "//"
}


export function compile(tokens) {
    let code = ''
    let delimiterCount = 0
    let functionStack = []
    let variablesStack = []
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
            let functionName = token[1].value
            let params = token[2].value
            let bracket = token[3].value
            if (functionName != undefined || null){
              functionStack.push(functionName)
            }
            if (bracket != undefined || null){
              delimiterCount++
            }
            let myLine = `${values[first.value]} ${functionName} ${params} ${bracket}`
            line += myLine
        } else if (first.type == 'FunctionCall'){
            let functionName = first.value
            if (!functionStack.includes(functionName)){
              throw new Error(`Couldnt find any function ${functionName} declared`)
            }
            line += `${functionName}${token[1].value}`
        } else if ( first.type == 'Delimiter' ){
          delimiterCount++
          line +=  `${first.value}`
          if (delimiterCount == 2){
            delimiterCount = 0
          }
        } else if ( first.type == 'Return' ) {
          if ( delimiterCount != 1 ){
            throw new Error(`dijiye is not inside a function`)
          } else {
            line += `${values[first.value]} ${token[1].value}`
          }
        } else if ( first.type == 'Ignore' ) {
            line += `${values[first.value]} ${token[1].value}`
        }
        else {
            for ( let word of token ) {
                if ( word.type == "Keyword" ) {
                    line += `${values[word.value]} `
                } else {
                    line += `${word.value}`
                }
            }
        }
        code += `${line}\n`
        // console.log(line)
    }
    if (delimiterCount % 2 != 0){
      throw new Error(`${functionStack[0]} Function is not closed properly `)
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
    { type: 'FunctionName', value: 'add' },     
    { type: 'FunctionParams', value: '(a,' },   
    { type: 'Delimiter', value: 'b)' },
    { type: 'Delimiter', value: '{' }
  ],
  [
    { type: 'Return', value: 'dijiye' },        
    { type: 'returning', value: 'a' },
    { type: 'Operator', value: '+' },
    { type: 'Identifier', value: 'b' }
  ],
  [ { type: 'Delimiter', value: '}' } ],        
  [
    { type: 'Function', value: 'kaiseji' },     
    { type: 'FunctionName', value: 'greet' },   
    { type: 'FunctionParams', value: '(name)' },
    { type: 'Delimiter', value: '{' }
  ],
  [
    { type: 'Keyword', value: 'boloji' },
    { type: 'Identifier', value: 'name' }
  ],
  [ { type: 'Delimiter', value: '}' } ],
  [
    { type: 'FunctionCall', value: 'add' },
    { type: 'CallParams', value: '(5,3)' }
  ],
  [
    { type: 'FunctionCall', value: 'greet' },
    { type: 'CallParams', value: '("You")' }
  ]
]


compile(example)