import express from 'express'
import crypto from 'crypto'
import { db } from '../db.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const token = crypto.randomBytes(16).toString('hex')
  const data = req.body

  await db.run(
    'INSERT INTO misas (fecha, tiempo, entrada, salmo, ofertorio, comunion, salida, token) VALUES (?,?,?,?,?,?,?,?)',
    [
      data.fecha,
      data.tiempo,
      data.entrada,
      data.salmo,
      data.ofertorio,
      data.comunion,
      data.salida,
      token
    ]
  )

  res.json({ ok: true, token })
})

router.get('/', async (req, res) => {
  const misas = await db.all('SELECT * FROM misas')
  res.json(misas)
})

export default router
