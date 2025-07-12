// import { readFile, writeFile } from 'fs/promises'
import { lexer } from './lexer.js'
import { compile } from './compliler.js'

const code =
    `
dekhoji a = 10
dekhoji b = 12
dekhoji c = a + b
boloji c
boloji "hello world"
boloji "This is Achaji language"
`

const Keywords = ['dekhoji', 'boloji']

// dekhoji == let
// boloji = print

// async function getCode (name) {
//     try {
//         const data = await readFile(name,'utf-8')
//         // console.log(data)
//         return String(data)
//     } catch (err) {
//         console.log(`Error in reading file : ${err}`)
//     }
// }

export function runTranspiledCode(jsCode) {
    let output = "";
    const originalLog = console.log;
    console.log = (...args) => {
        output += args.join(" ") + "\n";
    };

    try {
        eval(jsCode);
    } catch (err) {
        output += `Error: ${err.message}\n`;
    }
    console.log = originalLog;
    return output;
}


export function runCode(code) {
    try {
        // const args = (process.argv)[2];
        // let code = await getCode(args)
        // console.log(code)
        if (code) {
            let tokens = lexer(code)
            // console.log(tokens)
            let jsCode = compile(tokens)
            // console.log(jsCode)
            const output = runTranspiledCode(jsCode)
            return output;
        } else {
            console.log(`code not found : `, code)
            return "Code not found";
        }
    } catch (err) {
        console.log('Error in runningcode ', err)
        return `Error in runner : ${err.message}`;
    }
}