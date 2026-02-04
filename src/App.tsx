import { BrowserRouter } from "react-router-dom"
import { AppProvider } from "./contexts"
import { Router } from "./Routes"

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Router />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
