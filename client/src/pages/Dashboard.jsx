import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Dashboard.css'

function Dashboard() {
  const [formData, setFormData] = useState({
    role: '',
    location: '',
    cv: null,
    projects: ''
  })
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      cv: e.target.files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('role', formData.role)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('cv', formData.cv)
      formDataToSend.append('projects', formData.projects)

      const response = await axios.post('/api/find-professionals', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setResults(response.data)
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmails = async () => {
    setLoading(true)
    try {
      await axios.post('/api/send-emails', {
        professionals: results.professionals,
        userData: formData
      })
      alert('Emails sent successfully!')
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to send emails. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1 className="logo">🎯 SprayGun</h1>
        <p className="tagline">Spray & Pray Your Way to Success</p>
      </nav>

      <div className="dashboard-content">
        <div className="form-section">
          <h2>Let's Get You Hired! 🚀</h2>
          <form onSubmit={handleSubmit} className="application-form">
            <div className="form-group">
              <label htmlFor="role">Target Role *</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer, Product Manager"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Preferred Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, Remote, New York"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cv">Upload Your CV *</label>
              <input
                type="file"
                id="cv"
                name="cv"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="projects">Projects & Achievements</label>
              <textarea
                id="projects"
                name="projects"
                value={formData.projects}
                onChange={handleInputChange}
                placeholder="Describe your notable projects, achievements, or portfolio links..."
                rows="5"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '🔍 Finding Professionals...' : '🔍 Find Professionals'}
            </button>
          </form>
        </div>

        {results && (
          <div className="results-section">
            <h2>Found {results.professionals.length} Professionals! 🎉</h2>
            <div className="professionals-list">
              {results.professionals.map((professional, index) => (
                <div key={index} className="professional-card">
                  <div className="professional-info">
                    <h3>{professional.name}</h3>
                    <p className="title">{professional.title}</p>
                    <p className="company">{professional.company}</p>
                    <p className="email">📧 {professional.email}</p>
                  </div>
                  <div className="relevance-score">
                    Match: {professional.relevanceScore}%
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="send-emails-btn" 
              onClick={handleSendEmails}
              disabled={loading}
            >
              {loading ? '📧 Sending Emails...' : '📧 Send Networking Emails'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
