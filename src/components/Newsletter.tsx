'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import {
  Description,
  Field,
  Fieldset,
  Label,
  Legend,
} from '@headlessui/react'
import { CheckCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { motionTransition, smoothSpring } from '@/lib/transitions'

const recipientEmail = 'yordymartegacia@gmail.com'
const errorMessage = 'Please enter a valid email and message.'

function SubmitButton() {
  let { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      Send
    </Button>
  )
}

export function Newsletter() {
  let formRef = useRef<HTMLFormElement>(null)
  let [dialogOpen, setDialogOpen] = useState(false)
  let [error, setError] = useState<string | null>(null)
  let reduceMotion = useReducedMotion()

  let messageTransition = motionTransition(smoothSpring, reduceMotion)

  useEffect(() => {
    if (!error) {
      return
    }

    let timer = window.setTimeout(() => {
      setError(null)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [error])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    let formData = new FormData(event.currentTarget)
    let senderEmail = String(formData.get('email') ?? '').trim()
    let message = String(formData.get('message') ?? '').trim()

    if (!senderEmail || !message) {
      setError(errorMessage)
      return
    }

    let subject = encodeURIComponent('New message from your website')
    let body = encodeURIComponent(
      `Sender email: ${senderEmail}\n\n${message}`,
    )

    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`
    formRef.current?.reset()
    setDialogOpen(true)
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border p-6"
      >
        <Fieldset>
          <Legend className="flex text-sm font-semibold text-foreground">
            <EnvelopeIcon className="size-6 flex-none text-muted-foreground" />
            <span className="ml-3">Contact me</span>
          </Legend>
          <Field className="mt-2">
            <Label className="sr-only">Your email</Label>
            <Description className="text-sm text-muted-foreground">
              Send a message to {recipientEmail}. Include your own email so I can
              reply back.
            </Description>
            <div className="mt-6 flex flex-col gap-4">
              <Input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="min-w-0 flex-auto"
              />
              <textarea
                name="message"
                placeholder="Write your message..."
                required
                rows={4}
                className="min-h-[120px] w-full rounded-xl border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <SubmitButton />
            </div>
            <AnimatePresence initial={false}>
              {error && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={messageTransition}
                  className="overflow-hidden text-sm text-destructive"
                >
                  <span className="block pt-3">{error}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </Field>
        </Fieldset>
      </form>

      <Dialog open={dialogOpen} onClose={setDialogOpen}>
        <DialogContent>
          <CheckCircleIcon className="size-6 flex-none text-accent" />
          <DialogHeader>
            <DialogTitle>Your email app is opening</DialogTitle>
            <DialogDescription>
              Send the message from your email app to {recipientEmail}.
            </DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            variant="secondary"
            className="w-fit"
            onClick={() => setDialogOpen(false)}
          >
            Got it, thanks!
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
