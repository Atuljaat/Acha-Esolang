# Achaji Programming Language

A Hindi-inspired programming language that compiles to JavaScript, making programming concepts more accessible through familiar syntax.

## 🌟 Features

### Keywords and Their Compilation

| Achaji Syntax          | Compiles to JavaScript   | Usage                |
| ---------------------- | ------------------------ | -------------------- |
| `dekhoji x = 10`     | `let x = 10`           | Variable declaration |
| `suniyeji PI = 3.14` | `const PI = 3.14`      | Constant declaration |
| `boloji "Hello"`     | `console.log("Hello")` | Print to console     |
| `kaiseji add(a,b)`   | `function add(a,b)`    | Function declaration |
| `dijiye result`      | `return result`        | Return statement     |
| `ignoreji "Hello"`   | `// "Hello"`           | Comment line         |

### Code Examples with Compilation

#### 1. Hello World

```javascript
// Achaji Code
boloji "Hello World"

// Compiles to
console.log("Hello World")
```

#### 2. Variables

```javascript
// Achaji Code
dekhoji number = 42
suniyeji name = "Atul"

// Compiles to
let number = 42
const name = "Atul"
```

#### 3. Functions

```javascript
// Achaji Code
kaiseji add(a, b) {
    dijiye a + b
}

// Compiles to
function add(a, b) {
    return a + b
}
```

### 4. Comment

```javascript
// Achaji Code
ignoreji "Hello"

// Compiles to
// "Hello"

```


### Token Types and Their JavaScript Equivalents

| Token Type | Achaji Example     | JavaScript Output   |
| ---------- | ------------------ | ------------------- |
| String     | `"hello"`        | `"hello"`         |
| Number     | `42`             | `42`              |
| Operator   | `+, -, *, /`     | `+, -, *, /`      |
| Function   | `kaiseji name()` | `function name()` |
| Variable   | `dekhoji x`      | `let x`           |
| Constant   | `suniyeji x`     | `const x`         |

## 🔄 Compilation Process

1. **Lexical Analysis**

   - Splits code into tokens
   - Identifies keywords, operators, strings, numbers
   - Validates syntax
2. **Token Generation**

   ```javascript
   // Input: dekhoji x = 10
   // Generates tokens:
   [
     { type: "Keyword", value: "dekhoji" },
     { type: "Identifier", value: "x" },
     { type: "Operator", value: "=" },
     { type: "Number", value: "10" }
   ]
   ```
3. **JavaScript Generation**

   - Converts tokens to valid JavaScript
   - Maintains proper scoping
   - Preserves code structure

## ⚡ Error Handling with Compilation

```javascript
// Invalid Achaji Code
dekhoji = 10

// Compilation Error
"Variable name is required after dekhoji"

// Invalid Function
kaiseji add(a,b) 

// Compilation Error
"Function body is missing"
```


## 🛠️ Technical Details

-**Regex Support**: Function calls and variable name validation

-**Token Types**: String, Number, Keyword, Operator, Identifier, Function, Return

-**Line-by-Line Processing**: Accurate error reporting with line numbers

## 📖 License

MIT License

---

*Built with 💝 for making programming more accessible*
