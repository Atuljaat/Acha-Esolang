import {readFile , writeFile} from 'fs/promises'
import { lexer } from './lexer.js'
import { interpreter } from './interpreter.js'

const code = 
`
dekhoji a = 10
dekhoji b = 12
dekhoji c = a + b
boloji c
`

const Keywords = ['dekhoji','boloji']

// dekhoji == let
// boloji = print

async function getCode (name) {
    try {
        const data = await readFile(name,'utf-8')
        // console.log(data)
        return String(data)
    } catch (err) {
        console.log(`Error in reading file : ${err}`)
    }
}


async function runCompiler () {
    const args = (process.argv)[2];
    let code = await getCode(args)
    if ( code ) {
        let tokens = lexer(code)
        let jsCode = interpreter(tokens)
        eval(jsCode)
    } else {
        console.log(`code not found : ` , code)
    }
}

runCompiler()