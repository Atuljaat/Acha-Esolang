const keywords = ["dekhoji", "boloji", "kaiseji","dijiye"];

function createTokens(type, value) {
    return { type: type, value: value };
}

export function lexer(code) {
    // i get code in array form
    // [ 'dekhoji a = 10', 'dekhoji b = 12', 'dekhoji c = a + b', 'boloji c' ]
    const lines = code.trim().split('\n').map(line => line.trim());
    let tokens = [];
    const functionCallRegex = /^([a-zA-Z_]\w*)\(([^()]*)\)$/;
    const variableRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

    for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
        const line = lines[lineNumber];
        let spiltedLine = line.split("");
        let temp_word = "";
        let token = [];
        let i = 0;
        let commaCount = 0;
        while (i < spiltedLine.length) {
            if (spiltedLine[i] == `"` || spiltedLine[i] == `'`) {
                commaCount++;
            }
            if (spiltedLine[i] == " " && commaCount % 2 == 0) {
                token.push(temp_word);
                temp_word = "";
            } else {
                temp_word += spiltedLine[i];
            }
            i++;
        }
        token.push(temp_word);
        // console.log(token)
        let fullToken = [];
        for (let k = 0; k < token.length; k++) {
            let word = token[k];
            if (
                (word.startsWith('"') || word.startsWith("'")) &&
                !(word.endsWith('"') || word.endsWith("'"))
            ) {
                throw new Error(
                    `dekhliyeji string ko band kijiye line ${lineNumber + 1}: ${word}`
                );
            }
            // if (word == ""){
                // throw new Error(`Line spaces is not allowed here line : ${lineNumber + 1}`)
            // }
            if (
                token[k][0] == `"` ||
                (token[k][0] == `'` && token[k][token.length - 1] == `"`) ||
                token[k][token.length - 1] == `'`
            ) {
                fullToken.push(createTokens("String", token[k]));
            } else if (keywords.includes(token[k])) {
                if (token[k] == "kaiseji") {
                    let functionName = token[k + 1];
                    let params = token[k + 2];
                    let bracket = token[k + 3];

                    if (bracket == null || bracket == "" ){
                        throw new Error(`give space after the params Line : ${lineNumber + 1}`)
                    } 

                    fullToken.push(createTokens("Function", token[k]));
                    fullToken.push(createTokens("FunctionName", functionName));
                    fullToken.push(createTokens("FunctionParams", params));
                    fullToken.push(createTokens("Delimiter", bracket));
                    k = k + 3;
                } else if ( token[k] === "dijiye" ){
                        fullToken.push(createTokens("Return",token[k]))
                        if ( token[k+1] == null || token[k+1] == ""){
                            throw new Error(`you didnt return anything in line : ${lineNumber + 1}`)
                        }
                        fullToken.push(createTokens("returning",token[k+1]))
                        k = k + 1 
                    }
                else {
                    fullToken.push(createTokens("Keyword", token[k]));
                }
            } else if (/^(\+|\-|\*|\/|%|==|!=|<=|>=|<|>|=)$/.test(token[k])) {
                fullToken.push(createTokens("Operator", token[k]));
            } else if (!isNaN(token[k]) && isFinite(token[k])) {
                fullToken.push(createTokens("Number", token[k]));
            } else if (token[k] === "{" || token[k] === "}") {
                fullToken.push(createTokens("Delimiter", token[k]));
            } else if (functionCallRegex.test(token[k])) {
                let match = token[k].match(functionCallRegex);
                let funcName = match[1];
                let funcParam = `(${match[2]})`;
                fullToken.push(createTokens("FunctionCall", funcName));
                fullToken.push(createTokens("CallParams", funcParam));
            } else if (variableRegex.test(token[k])) {
                if (token[k].endsWith("ji") && !keywords.includes(token[k])) {
                    throw new Error(
                        `Unknown keyword '${token[k]}' on line ${lineNumber + 1}`
                    );
                } else {
                        fullToken.push(createTokens("Identifier", token[k]));
                }
            } else {
                throw new Error(
                    `Unrecognized token '${word}' on line ${lineNumber + 1}`
                );
            }
        }
        tokens.push(fullToken);
    }
    // console.log(tokens)
    return tokens;
}

const code = `
dekhoji a = 10
dekhoji b = 23
dekhoji c = a + b
kaiseji abc (a) {
boloji a
dijiye a
}
dekhoji d = abc(a) 
boloji d
`;

lexer(code);
