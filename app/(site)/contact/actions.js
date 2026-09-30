'use server'

import { Resend } from 'resend'
import { sanityFetch } from '@/sanity/lib/client'
import { contactQuery } from '@/sanity/lib/queries'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendMessage(_prevState, formData) {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const message = String(formData.get('message') || '').trim()

  // Honeypot — bots fill every field
  if (formData.get('company')) return { ok: true, message: 'Thanks — your message has been sent.' }

  if (!name || !email || !message) return { ok: false, message: 'Please fill out all fields.' }
  if (!EMAIL.test(email)) return { ok: false, message: 'Please enter a valid email address.' }

  const contact = await sanityFetch(contactQuery)
  const to = process.env.CONTACT_TO_EMAIL || contact?.email
  if (!process.env.RESEND_API_KEY || !to) {
    console.error('Contact form: RESEND_API_KEY or recipient email is not configured.')
    return { ok: false, message: 'Sorry, the form is not available right now. Please email directly.' }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev',
    to,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) {
    console.error('Contact form:', error)
    return { ok: false, message: 'Something went wrong. Please try again.' }
  }

  return { ok: true, message: 'Thanks — your message has been sent.' }
}
