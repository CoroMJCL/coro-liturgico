const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

// CORS PRIMERO (CRÍTICO)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// RUTAS
const cantosRoutes = require('./routes/cantos')
app.use('/api/cantos', cantosRoutes)

// RUTA RAÍZ
app.get('/', (req, res) => {
  res.send('API Coro Litúrgico funcionando')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto', PORT)
})

