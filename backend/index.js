import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Resend } from 'resend'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const backendDirectory = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(backendDirectory, '.env') })

const app = express()
const PORT = process.env.PORT || 3000
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: frontendOrigin }))
app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY)

app.post('/contact/send-email', async (req, res) => {
    const { name, email, message } = req.body || {}

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' })
    }

    try {
        await resend.emails.send({
            from: "lambino.parick.competente@gmail.com",
            to: email,
            subject: 'Hello from Resend!',
            html: `<p>Hello ${name},</p><p>${message}</p>`,
        })
        res.status(200).json({ message: 'Email sent successfully!' })
    } catch (error) {
        console.error('Error sending email:', error)
        res.status(500).json({ message: 'Failed to send email.' })
    }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})