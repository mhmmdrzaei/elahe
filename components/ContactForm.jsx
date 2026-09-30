'use client'

import { useActionState } from 'react'
import { sendMessage } from '@/app/(site)/contact/actions'
import styles from './ContactForm.module.scss'

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, null)

  if (state?.ok) return <p className={styles.status}>{state.message}</p>

  return (
    <form action={formAction} className={styles.form}>
      <label>
        <span>Name</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows={6} required />
      </label>
      <input name="company" type="text" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true" />

      <button type="submit" disabled={pending}>
        {pending ? 'Sending…' : 'Send'}
      </button>
      {state && !state.ok && (
        <p className={styles.error} role="alert">
          {state.message}
        </p>
      )}
    </form>
  )
}
