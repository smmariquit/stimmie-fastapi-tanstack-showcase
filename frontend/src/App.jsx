import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function App() {
  const queryClient = useQueryClient()
  const [name, setName] = useState('')

  // 1. Fetching Data with useQuery (handles caching and loading states naturally)
  const { data: items, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/items')
      if (!res.ok) throw new Error('Network response was not ok')
      return res.json()
    }
  })

  // 2. Mutating Data with useMutation (handles POST requests and query invalidation)
  const mutation = useMutation({
    mutationFn: async (newItem) => {
      const res = await fetch('http://localhost:8000/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      })
      return res.json()
    },
    onSuccess: () => {
      // 3. Invalidate and refetch immediately after successful mutation!
      queryClient.invalidateQueries({ queryKey: ['items'] })
      setName('')
    }
  })

  if (isLoading) return <h2>Fetching data from FastAPI (simulated latency)...</h2>
  if (error) return <h2>Error: {error.message}</h2>

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>TanStack Query + FastAPI</h1>
      <p>This demonstrates seamless server-state caching and invalidation.</p>
      <ul>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: '10px' }}>{item.name}</li>
        ))}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Type new item..." 
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button 
          onClick={() => mutation.mutate({ id: Date.now(), name })}
          disabled={mutation.isPending || !name}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          {mutation.isPending ? 'Mutating Database...' : 'Add Item'}
        </button>
      </div>
    </div>
  )
}