import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { Delete, History, RotateCcw } from 'lucide-react';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const handleButtonClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput('');
        setResult('');
    };

    const handleDelete = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const handleCalculate = () => {
        try {
            // Replace visual symbols with mathjs compatible ones
            const expression = input
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, 'pi')
                .replace(/√/g, 'sqrt');

            const res = evaluate(expression);
            setResult(res.toString());
            setHistory((prev) => [`${input} = ${res}`, ...prev].slice(0, 10));
        } catch (error) {
            setResult('Error');
        }
    };

    const buttons = [
        { label: 'C', onClick: handleClear, className: 'text-red-500' },
        { label: '(', onClick: () => handleButtonClick('(') },
        { label: ')', onClick: () => handleButtonClick(')') },
        { label: <Delete size={20} />, onClick: handleDelete, className: 'text-orange-500' },

        { label: 'sin', onClick: () => handleButtonClick('sin(') },
        { label: 'cos', onClick: () => handleButtonClick('cos(') },
        { label: 'tan', onClick: () => handleButtonClick('tan(') },
        { label: '÷', onClick: () => handleButtonClick('/') },

        { label: '7', onClick: () => handleButtonClick('7') },
        { label: '8', onClick: () => handleButtonClick('8') },
        { label: '9', onClick: () => handleButtonClick('9') },
        { label: '×', onClick: () => handleButtonClick('*') },

        { label: '4', onClick: () => handleButtonClick('4') },
        { label: '5', onClick: () => handleButtonClick('5') },
        { label: '6', onClick: () => handleButtonClick('6') },
        { label: '-', onClick: () => handleButtonClick('-') },

        { label: '1', onClick: () => handleButtonClick('1') },
        { label: '2', onClick: () => handleButtonClick('2') },
        { label: '3', onClick: () => handleButtonClick('3') },
        { label: '+', onClick: () => handleButtonClick('+') },

        { label: '0', onClick: () => handleButtonClick('0') },
        { label: '.', onClick: () => handleButtonClick('.') },
        { label: 'π', onClick: () => handleButtonClick('pi') },
        { label: '=', onClick: handleCalculate, className: 'bg-blue-600 text-white rounded-full' },
    ];

    const scientificButtons = [
        { label: 'log', onClick: () => handleButtonClick('log(') },
        { label: 'ln', onClick: () => handleButtonClick('log(') }, // mathjs log is ln by default, log10 is log10
        { label: '√', onClick: () => handleButtonClick('sqrt(') },
        { label: '^', onClick: () => handleButtonClick('^') },
        { label: 'e', onClick: () => handleButtonClick('e') },
        { label: 'deg', onClick: () => handleButtonClick('deg') },
    ];

    return (
        <div className="bg-gray-800 p-6 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
            {/* Display */}
            <div className="mb-6 bg-gray-900 p-4 rounded-xl text-right h-32 flex flex-col justify-end relative overflow-hidden">
                <div className="text-gray-400 text-sm mb-1 h-6 overflow-hidden">{result}</div>
                <div className="text-3xl font-bold text-white break-all">{input || '0'}</div>

                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="absolute top-2 left-2 text-gray-500 hover:text-white"
                >
                    <History size={20} />
                </button>
            </div>

            {/* History Panel */}
            {showHistory && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10 p-4">
                    <h3 className="text-white font-bold mb-2">History</h3>
                    <ul className="text-gray-300 text-sm space-y-1 max-h-40 overflow-y-auto">
                        {history.map((item, index) => (
                            <li key={index} className="border-b border-gray-700 pb-1">{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Scientific Row */}
            <div className="grid grid-cols-6 gap-2 mb-4">
                {scientificButtons.map((btn, idx) => (
                    <button
                        key={idx}
                        onClick={btn.onClick}
                        className="p-2 bg-gray-700 rounded-lg text-xs font-medium hover:bg-gray-600 transition text-cyan-400"
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-4 gap-3">
                {buttons.map((btn, idx) => (
                    <button
                        key={idx}
                        onClick={btn.onClick}
                        className={`p-4 rounded-xl text-xl font-semibold transition active:scale-95 flex items-center justify-center
              ${btn.className || 'bg-gray-700 hover:bg-gray-600 text-white'}
            `}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
