import {readFile , writeFile} from 'fs/promises'
import { lexer } from './lexer.js'
import { compile } from './compliler.js'

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


async function runCode () {
    try {
        const args = (process.argv)[2];
        let code = await getCode(args)
        // console.log(code)
        if ( code ) {
            let tokens = lexer(code)
            // console.log(tokens)
            let jsCode = compile(tokens)
            // console.log(jsCode)
            eval(jsCode)
        } else {
            console.log(`code not found : ` , code)
        }
    } catch (err) {
        console.log('Error in runningcode ' , err)
    }
}

runCode()