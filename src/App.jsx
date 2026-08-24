import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import About from './components/About.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <main className="bg-ink">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
