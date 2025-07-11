const keywords = [ 'dekhoji' , 'boloji' , 'kaiseji' ]

function createTokens (type,value) {
    return { type : type , value : value }
}


export function lexer ( code ) {
    // i get code in array form
    // [ 'dekhoji a = 10', 'dekhoji b = 12', 'dekhoji c = a + b', 'boloji c' ]
    const lines = code.trim().split('\n')
    let tokens = []
    const functionCallRegex = /^([a-zA-Z_]\w*)\(([^()]*)\)$/;
    for ( let line of lines ) {
        let spiltedLine = line.split("")
        let temp_word = ""
        let token = []
        let i = 0
        let commaCount = 0
        while ( i <  spiltedLine.length){
            if ( spiltedLine[i] == `"` || spiltedLine[i] == `'`  ) {
                commaCount++;
            } 

            if ( spiltedLine[i] == " " && commaCount % 2 == 0 ){
                token.push(temp_word)
                temp_word = ""
            } else {
                temp_word += spiltedLine[i]
            }
            i++
        }
        token.push(temp_word)
        // console.log(token)
        let fullToken = []
        for ( let k = 0 ; k < token.length ; k++){
            if ( token[k][0] == `"` || token[k][0] == `'` && token[k][token.length - 1 ] == `"` || token[k][token.length - 1] == `'` ){
                fullToken.push(createTokens('String',token[k]))
            } else if ( keywords.includes(token[k]) ) {
                if (token[k] == 'kaiseji'){
                    let functionName = token[k+1]
                    let params = token[k+2]
                    let closeParam = token[k+3]
                    fullToken.push(createTokens('Function' , token[k]))
                    fullToken.push(createTokens('FunctionName' , functionName))
                    fullToken.push(createTokens('FunctionParams' , params))
                    fullToken.push(createTokens('Delimiter',closeParam))
                    k = k + 3
                }
                else {
                    fullToken.push(createTokens('Keyword',token[k]))
                }
            } else if ( /^(\+|\-|\*|\/|%|==|!=|<=|>=|<|>|=)$/.test(token[k]) ){
                fullToken.push(createTokens('Operator',token[k]))
            } else if ( !isNaN(token[k]) && isFinite(token[k]) ) {
                fullToken.push(createTokens('Number',token[k]))
            } else if (token[k] === '{' || token[k] === '}') {
                fullToken.push(createTokens('Delimiter', token[k]))
            } else if ( functionCallRegex.test(token[k]) ) {
                let match = token[k].match(functionCallRegex)
                let funcName = match[1]
                let funcParam = `(${match[2]})`
                fullToken.push(createTokens('FunctionCall' , funcName))
                fullToken.push(createTokens('CallParams' , funcParam))
            }
            else  {
                fullToken.push(createTokens('Identifier',token[k]))
            }
        } 
        tokens.push(fullToken)
    }
    console.log(tokens)
    return tokens
}



const code = `
kaiseji abc (a,b) {
boloji a
}
dekhoji b = 12
abc(b)
boloji "Hello World"
`

lexer(code)