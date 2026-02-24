import { BrowserRouter } from "react-router-dom"
import { AppProvider } from "./contexts"
import { Router } from "./Routes"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ToastContainer className={'z-50'} />
        <Router />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
