import { useState } from 'react'

const initialValues = { name: '', email: '', phone: '' }

const PreChatForm = ({ onSubmit, onShowConversations }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const updateField = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please enter your full name.'
    if (!values.email.trim()) nextErrors.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!values.phone.trim()) nextErrors.phone = 'Please enter your contact number.'
    else if (!/^[+\d][\d\s().-]{5,}$/.test(values.phone.trim())) {
      nextErrors.phone = 'Enter a valid contact number.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onSubmit({ name: values.name.trim(), email: values.email.trim(), phone: values.phone.trim() })
    }
  }

  return (
    <div className="gc-form-screen">
      <div className="gc-screen-intro">
        <span className="gc-eyebrow">WE&apos;RE HERE TO HELP</span>
        <h1>Let&apos;s get you to the right person.</h1>
        <p>Share a few details and our team will be right with you.</p>
      </div>
      <form className="gc-prechat-form" onSubmit={handleSubmit} noValidate>
        <label className="gc-field">
          <span>Full name</span>
          <input autoComplete="name" aria-describedby={errors.name ? 'gc-name-error' : undefined} aria-invalid={Boolean(errors.name)} name="name" onChange={updateField} placeholder="e.g. Alex Morgan" value={values.name} />
          {errors.name && <span className="gc-field-error" id="gc-name-error">{errors.name}</span>}
        </label>
        <label className="gc-field">
          <span>Email address</span>
          <input autoComplete="email" aria-describedby={errors.email ? 'gc-email-error' : undefined} aria-invalid={Boolean(errors.email)} name="email" onChange={updateField} placeholder="you@example.com" type="email" value={values.email} />
          {errors.email && <span className="gc-field-error" id="gc-email-error">{errors.email}</span>}
        </label>
        <label className="gc-field">
          <span>Contact number</span>
          <input autoComplete="tel" aria-describedby={errors.phone ? 'gc-phone-error' : undefined} aria-invalid={Boolean(errors.phone)} name="phone" onChange={updateField} placeholder="+1 (555) 000-0000" type="tel" value={values.phone} />
          {errors.phone && <span className="gc-field-error" id="gc-phone-error">{errors.phone}</span>}
        </label>
        <button className="gc-primary-button" type="submit">
          Start chat
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
        </button>
      </form>
      <button className="gc-text-button" onClick={onShowConversations} type="button">
        Returning customer? <strong>View conversations</strong>
      </button>
    </div>
  )
}

export default PreChatForm
