const keywords = [ 'dekhoji' , 'boloji' , 'kaiseji' ]

function createTokens (type,value) {
    return { type : type , value : value }
}

function functionToken ( name , params , body ) {
    return {
        type : "function",
        name : name ,
        params : params ,
        body : body
    }
}


export function lexer ( code ) {
    // i get code in array form
    // [ 'dekhoji a = 10', 'dekhoji b = 12', 'dekhoji c = a + b', 'boloji c' ]
    const lines = code.trim().split('\n')
    let tokens = []
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
        
        let fullToken = []
        for ( let word of token ){
            if ( word[0] == `"` || word[0] == `'` && word[word.length - 1 ] == `"` || word[word.length - 1] == `'` ){
                fullToken.push(createTokens('String',word))
            } else if ( keywords.includes(word) ) {

                if (word == 'kaiseji'){
                    
                } 
                else {
                fullToken.push(createTokens('Keyword',word))
                }

            } else if ( /^(\+|\-|\*|\/|%|==|!=|<=|>=|<|>|=)$/.test(word) ){
                fullToken.push(createTokens('Operator',word))
            } else if ( !isNaN(word) && isFinite(word) ) {
                fullToken.push(createTokens('Number',word))
            }
            else  {
                fullToken.push(createTokens('Identifier',word))
            }
        } 

        tokens.push(fullToken)
    }
    console.log(tokens)
    return tokens
    // console.log(tokens)
}



const code = 
`
boloji "Hello World"
kaiseji (a) {
    boloji a
}
`

lexer(code)