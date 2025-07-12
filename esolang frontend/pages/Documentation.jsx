import React from 'react'
import { CopyBlock, dracula } from 'react-code-blocks';

function Documentation() {
  const codeInfo = [
  {
    title: "Print Statement",
    description: "Use `boloji` to print messages to the console. You can print strings, numbers, or variables.",
    code: `boloji "Hello World!"
boloji 42
`,
  },
  {
    title: "Variable Declaration",
    description: "Use `dekhoji` for mutable variables and `suniyeji` for constants.",
    code: `dekhoji score = 0
suniyeji PI = 3.14
dekhoji name = "Tom"`,
  },
  {
    title: "Function Declaration",
    description: "Create functions using `kaiseji`. Use `dijiye` to return values. Do not leave spaces between params.",
    code: `kaiseji add (a,b) {
  dijiye a + b
}

kaiseji greet (name) {
  boloji "Hello " + name
}

add(5,3)
greet("You")`,
  },
  {
    title: "Operators",
    description: "Supports arithmetic, comparison, and assignment operators.",
    code: `dekhoji sum = 5 + 3
dekhoji product = 4 * 2
dekhoji isGreater = 10 > 5`,
  },
  {
    title: "Comments",
    description: "Use `ignoreji` for single-line comments.",
    code: `ignoreji This is a comment
dekhoji x = 10 
ignoreji initialize x`,
  },
];



  return (
    <div className="bg-secondary-foreground text-secondary mx-auto px-4 py-8">
      <div className='mb-4 text-left px-10'>
        <h1 className="text-3xl font-bold mb-2">Achaji Syntax Snippets</h1>
        <p className='text-gray-400 mb-4  '>
        Write keywords one per line without spaces. Since Achaji is a playful, lightweight esolang, a few rough edges and unexpected errors are totally normal . Visit Github repository for more info </p>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-6 p-6 rounded-lg shadow-lg">
        {codeInfo.map((item, index) => (
          <div key={index} className=" mx-6 p-4 rounded-lg h-fit bg-gray-900 border border-gray-700">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-400 mb-4">{item.description}</p>
            <div className="[&_*]:!text-gray-200  font-medium  ">
            <CopyBlock
              text={item.code}
              language="achaji"
              showLineNumbers={false}
              theme={dracula}
              wrapLongLines={true}
              codeBlock
            />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Documentation