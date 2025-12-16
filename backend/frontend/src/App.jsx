import { useEffect, useState } from 'react'

function App() {
  const [cantos, setCantos] = useState([])
  const [titulo, setTitulo] = useState('')
  const [archivo, setArchivo] = useState(null)

  const API = 'https://coro-liturgico-backend.onrender.com'

  useEffect(() => {
    cargarCantos()
  }, [])

  const cargarCantos = () => {
    fetch(`${API}/api/cantos`)
      .then(res => res.json())
      .then(data => setCantos(data))
  }

  const subirCanto = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('titulo', titulo)
    formData.append('pdf', archivo)

    await fetch(`${API}/api/cantos`, {
      method: 'POST',
      body: formData
    })

    setTitulo('')
    setArchivo(null)
    cargarCantos()
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Coro Litúrgico</h1>

      <h2>Subir canto</h2>
      <form onSubmit={subirCanto}>
        <input
          placeholder="Título del canto"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setArchivo(e.target.files[0])}
          required
        />
        <br /><br />
        <button type="submit">Subir PDF</button>
      </form>

      <hr />

      <h2>Cantos disponibles</h2>

      {cantos.length === 0 && <p>No hay cantos cargados</p>}

      <ul>
        {cantos.map(canto => (
          <li key={canto._id}>
            {canto.titulo} –{' '}
            <a href={`${API}${canto.pdfUrl}`} target="_blank">
              Ver PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App


