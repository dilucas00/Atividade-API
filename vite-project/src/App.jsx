
import './App.css'



function App() {
  

  return (
    <div className='h-130 w-full flex flex-col items-center justify-center p-10'>
      <img src="/futseek-logo.png" alt="Logo do aplicativo" className='w-50 h-50' />
      <h4 className='text-center  text-1xl mt-7 mb-10 '>Pesquise informações essenciais sobre os jogadores de todo o mundo </h4>
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Digite o nome do jogador..."
          className="w-full h-12 rounded-2xl bg-white border border-[#35A369] pl-5 pr-10 focus:outline-none"
          style={{
            background: `linear-gradient(to right, white 85%, #35A369 80%)`,
            backgroundClip: 'padding-box',
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className='cursor-pointer'
            >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default App
