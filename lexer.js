const keywords = [ 'dekhoji' , 'boloji' , 'kaiseji', 'ghumoji', 'forji' ]

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

function loopToken ( loopType, condition, body ) {
    return {
        type : "loop",
        loopType : loopType,
        condition : condition,
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
                if (temp_word !== "") {
                    token.push(temp_word)
                    temp_word = ""
                }
            } else {
                temp_word += spiltedLine[i]
            }
            i++
        }
        if (temp_word !== "") {
            token.push(temp_word)
        }
        
        let fullToken = []
        for ( let j = 0 ; j < token.length ; j++){
            let word = token[j] // Fixed: was using undefined 'word' variable
            
            if ( word[0] == `"` || word[0] == `'` && word[word.length - 1 ] == `"` || word[word.length - 1] == `'` ){
                fullToken.push(createTokens('String',word))
            } else if ( keywords.includes(word) ) {

                if (word == 'kaiseji'){
                    fullToken.push(createTokens('Function',word))
                } else if (word == 'ghumoji') {
                    fullToken.push(createTokens('WhileLoop',word))
                } else if (word == 'forji') {
                    fullToken.push(createTokens('ForLoop',word))
                } else {
                    fullToken.push(createTokens('Keyword',word))
                }

            } else if ( /^(\+|\-|\*|\/|%|==|!=|<=|>=|<|>|=)$/.test(word) ){
                fullToken.push(createTokens('Operator',word))
            } else if ( !isNaN(word) && isFinite(word) ) {
                fullToken.push(createTokens('Number',word))
            } else if ( /^[{}();,]$/.test(word) ) {
                fullToken.push(createTokens('Delimiter',word))
            } else  {
                fullToken.push(createTokens('Identifier',word))
            }
        } 

        if (fullToken.length > 0) {
            tokens.push(fullToken)
        }
    }
    console.log(tokens)
    return tokens
}

const code = 
`
boloji "Hello World"
kaiseji (a) {
    boloji a
}
ghumoji (i < 10) {
    boloji i
    dekhoji i = i + 1
}
forji (i = 0; i < 5; i++) {
    boloji "Iteration"
    boloji i
}
`

lexer(code)