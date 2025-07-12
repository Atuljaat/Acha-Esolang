import React, { useRef } from 'react'
import { Editor } from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { FaPlay } from 'react-icons/fa'
import {runCode} from '../esolang/runner.js'

function Playground() {
  const editorRef = useRef(null)
  const [output, setOutput] = React.useState("");

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  function runcode () {``
    const code = editorRef.current.getValue();
    const result = runCode(code);
    setOutput(result);
    console.log(result);
  }
  

  return (
    <div className="min-h-screen bg-secondary-foreground">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-secondary pb-8">
          Achaji Esolang Playground
        </h1>
        
        {/* Action Buttons */}
        <div className='flex justify-center items-center gap-4 mb-8'>
          <Button 
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:cursor-pointer"
            onClick={runcode}
          >
            <FaPlay className="w-2 h-2" />
            Run Code
          </Button>
        </div>

        {/* Editor and Output Section */}
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Editor Section */}
            <div className="rounded-xl overflow-hidden shadow-2xl bg-gray-850 border border-gray-700">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <h2 className="text-sm font-medium text-gray-300">Editor</h2>
              </div>
              <Editor 
                height="60vh"
                defaultLanguage='achaji'
                defaultValue='boloji "hello world"'
                theme='vs-dark'
                options={{
                  fontSize: 16,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  roundedSelection: false,
                  padding: { top: 16 },
                }}
                onMount={handleEditorDidMount}
              />
            </div>

            {/* Output Section */}
            <div className="rounded-xl overflow-hidden shadow-2xl bg-gray-850 border border-gray-700">
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <h2 className="text-sm font-medium text-gray-300">Output</h2>
              </div>
              <div className="p-6 h-[60vh] overflow-auto">
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  { output ? 
                  <pre className="text-gray-200 whitespace-pre-wrap">
                    {output}
                  </pre>
                  :
                  <div>
                    <p className="text-gray-400">// Output will appear here after running the code</p>
                    <p className="text-green-400 mt-2">→ Ready to execute</p>
                  </div>
                  }
                </div>

                {/* Sample Output - You can make this dynamic */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">►</span>
                    <p className="text-gray-300">Console output will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Playground