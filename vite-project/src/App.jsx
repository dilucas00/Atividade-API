
import './App.css'
import { Search } from "lucide-react"
function App() {
  

  return (
    <div className='h-130 w-full flex flex-col items-center justify-center p-10'>
      <img src="/futseek-logo.png" alt="Logo do aplicativo" className='w-50 h-50' />
      <h4 className='text-center font-medium mt-7 mb-10 '>Pesquise informações essenciais sobre os jogadores de todo o mundo </h4>
      <div>
        <input type="text" placeholder='Digite o nome do jogador...' className='w-80 h-12  rounded-2xl bg-white border border-[#35A369] ' />
        <Search size={24}></Search>
      </div>
    </div>
  )
}

export default App
