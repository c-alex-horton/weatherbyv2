import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './App.css'
import Dashboard from './components/Dashboard'

function App() {
  const client = new QueryClient()
  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <Dashboard />
      </QueryClientProvider>
    </div>
  )
}

export default App
