let code = 
`
let a=10
let b=23
let c=a+b
function abc (a) {
console.log(a)    
return a
}
let d=abc(a)       
console.log(d)
`

eval(code)