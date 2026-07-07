import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { StoreProvider } from '@/store'

function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  )
}

export default App
