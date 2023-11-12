import { useState } from 'react'
import Header from './components/Header'
import DashboardItem from './components/DashboardItem'

function App() {

  const [filter, setFilter] = useState("")

  return (
    <div className="bg-zinc-700 text-slate-50 font-sans min-h-screen p-1">
     <Header onFilter={setFilter}/>
     <DashboardItem filter={filter} />
    </div>
  )
}

export default App
