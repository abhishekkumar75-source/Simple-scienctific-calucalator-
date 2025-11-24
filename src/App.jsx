import Calculator from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <Calculator />
      <div className="mt-4 text-gray-400 font-medium text-sm tracking-widest opacity-70">
        by abhishek
      </div>
    </div>
  )
}

export default App;
