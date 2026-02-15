import OpenAI from 'openai'
import nodemailer from 'nodemailer'
import fs from 'fs/promises'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

/**
 * Find relevant professionals for networking based on user's role and location
 */
export async function findProfessionals({ role, location, projects, cvPath }) {
  try {
    // Read CV content (simplified - in production, use a PDF parser)
    let cvContent = ''
    try {
      cvContent = await fs.readFile(cvPath, 'utf-8')
    } catch (error) {
      cvContent = 'CV file uploaded'
    }

    // Use OpenAI to generate relevant professional profiles
    const prompt = `You are an AI assistant helping someone find professionals to network with for job opportunities.

User details:
- Target Role: ${role}
- Preferred Location: ${location}
- Projects/Achievements: ${projects || 'Not specified'}
- CV Summary: ${cvContent.substring(0, 500)}

Generate a list of 5-7 fictional but realistic professional contacts who would be relevant for networking in this field and location. These should be people the user could potentially reach out to for job opportunities or networking.

Return the result as a JSON array with this exact structure:
[
  {
    "name": "Full Name",
    "title": "Job Title",
    "company": "Company Name",
    "email": "email@company.com",
    "relevanceScore": 85
  }
]

Make sure the professionals are relevant to the role and location specified.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates realistic professional contact information for job networking. Always return valid JSON arrays."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    })

    const responseText = completion.choices[0].message.content
    
    // Extract JSON from response
    let professionals = []
    try {
      // Try to find JSON in the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        professionals = JSON.parse(jsonMatch[0])
      } else {
        professionals = JSON.parse(responseText)
      }
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      // Fallback to sample data
      professionals = generateSampleProfessionals(role, location)
    }

    return professionals
  } catch (error) {
    console.error('Error in findProfessionals:', error)
    // Return sample data if AI fails
    return generateSampleProfessionals(role, location)
  }
}

/**
 * Send personalized networking emails to professionals
 */
export async function sendNetworkingEmails(professionals, userData) {
  try {
    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Generate personalized emails for each professional
    for (const professional of professionals) {
      const emailContent = await generateEmailContent(professional, userData)
      
      // In production, actually send the email
      // For demo purposes, just log it
      console.log(`Would send email to ${professional.email}:`)
      console.log(emailContent)
      
      // Uncomment to actually send emails:
      /*
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: professional.email,
        subject: emailContent.subject,
        text: emailContent.body
      })
      */
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending emails:', error)
    throw error
  }
}

/**
 * Generate personalized email content using AI
 */
async function generateEmailContent(professional, userData) {
  try {
    const prompt = `Generate a professional networking email for the following scenario:

From: A job seeker looking for ${userData.role} positions in ${userData.location}
To: ${professional.name}, ${professional.title} at ${professional.company}
Projects/Achievements: ${userData.projects || 'Various professional projects'}

Write a concise, professional networking email (150-200 words) that:
1. Introduces the sender professionally
2. Mentions their interest in the field/role
3. Highlights 1-2 key achievements or projects
4. Asks for a brief informational chat or advice
5. Sounds genuine and not overly formal

Return in this format:
SUBJECT: [email subject line]
BODY: [email body]`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert at writing professional networking emails that are warm, genuine, and effective."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    })

    const response = completion.choices[0].message.content
    const subjectMatch = response.match(/SUBJECT: (.+)/)
    const bodyMatch = response.match(/BODY: ([\s\S]+)/)

    return {
      subject: subjectMatch ? subjectMatch[1] : `Connecting about ${userData.role} opportunities`,
      body: bodyMatch ? bodyMatch[1].trim() : response
    }
  } catch (error) {
    console.error('Error generating email:', error)
    return {
      subject: `Connecting about ${userData.role} opportunities`,
      body: `Hi ${professional.name},\n\nI hope this email finds you well. I'm currently exploring opportunities in ${userData.role} and came across your profile at ${professional.company}.\n\nI'd love to learn more about your experience in the field and would appreciate any insights you might have about opportunities in ${userData.location}.\n\nWould you be open to a brief call?\n\nBest regards`
    }
  }
}

/**
 * Generate sample professionals as fallback
 */
function generateSampleProfessionals(role, location) {
  return [
    {
      name: "Sarah Johnson",
      title: "Senior Recruiter",
      company: "Tech Corp",
      email: "sarah.j@techcorp.com",
      relevanceScore: 92
    },
    {
      name: "Michael Chen",
      title: "Engineering Manager",
      company: "Innovation Labs",
      email: "m.chen@innovationlabs.com",
      relevanceScore: 88
    },
    {
      name: "Emily Rodriguez",
      title: "HR Director",
      company: "StartUp Inc",
      email: "emily.r@startupinc.com",
      relevanceScore: 85
    },
    {
      name: "David Park",
      title: "VP of Engineering",
      company: "Growth Systems",
      email: "david.park@growthsystems.com",
      relevanceScore: 90
    },
    {
      name: "Jessica Taylor",
      title: "Talent Acquisition Lead",
      company: "Future Technologies",
      email: "j.taylor@futuretech.com",
      relevanceScore: 87
    }
  ]
}
