import express from 'express'
import multer from 'multer'
import { db } from '../db.js'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.post('/', upload.single('pdf'), async (req, res) => {
  const { nombre, tiempo, momento } = req.body
  const archivo = req.file.filename

  await db.run(
    'INSERT INTO cantos (nombre, tiempo, momento, archivo) VALUES (?,?,?,?)',
    [nombre, tiempo, momento, archivo]
  )

  res.json({ ok: true })
})

router.get('/', async (req, res) => {
  const cantos = await db.all('SELECT * FROM cantos')
  res.json(cantos)
})

export default router
