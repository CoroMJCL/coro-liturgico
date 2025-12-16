import express from 'express'
import cors from 'cors'
import cantosRoutes from './routes/cantos.js'
import misasRoutes from './routes/misas.js'
import './db.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/cantos', cantosRoutes)
app.use('/api/misas', misasRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Servidor listo en puerto', PORT)
})
