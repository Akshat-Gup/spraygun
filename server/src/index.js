import express from 'express'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'
import { findProfessionals, sendNetworkingEmails } from './services/jobService.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SprayGun API is running!' })
})

app.post('/api/find-professionals', upload.single('cv'), async (req, res) => {
  try {
    const { role, location, projects } = req.body
    const cvFile = req.file

    if (!role || !location || !cvFile) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Find professionals using AI
    const professionals = await findProfessionals({
      role,
      location,
      projects,
      cvPath: cvFile.path
    })

    res.json({ professionals })
  } catch (error) {
    console.error('Error finding professionals:', error)
    res.status(500).json({ error: 'Failed to find professionals' })
  }
})

app.post('/api/send-emails', async (req, res) => {
  try {
    const { professionals, userData } = req.body

    if (!professionals || !userData) {
      return res.status(400).json({ error: 'Missing required data' })
    }

    // Send networking emails
    await sendNetworkingEmails(professionals, userData)

    res.json({ success: true, message: 'Emails sent successfully' })
  } catch (error) {
    console.error('Error sending emails:', error)
    res.status(500).json({ error: 'Failed to send emails' })
  }
})

app.listen(PORT, () => {
  console.log(`🎯 SprayGun server running on port ${PORT}`)
})
