import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * Global Standardized Full-Screen Pure Black Modal System (#000000)
 *
 * Requirements satisfied:
 * - Solid, fully opaque pure black background (#000000) via portal to document.body
 * - Zero backdrop bleed-through, zero glassmorphism, zero transparency
 * - Covers full viewport edge-to-edge above all sections and navbar (z-index: 999999)
 * - Traps focus while open, restores focus to triggering element on close
 * - Escape key to close
 * - Background scroll locking on document.body and document.documentElement
 * - Dialog semantics: role="dialog", aria-modal="true"
 * - Content click propagation prevention
 */
export default function Modal({
  isOpen,
  onClose,
  titleId,
  ariaLabel,
  className = 'project-modal-dialog',
  backdropClassName = 'project-modal-backdrop',
  closeOnBackdropClick = true,
  children,
}) {
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // 1. Remember triggering element to restore focus on close
    previousFocusRef.current = document.activeElement

    // 2. Lock page scrolling on background
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    // 3. Move keyboard focus inside dialog
    const focusTimer = setTimeout(() => {
      if (dialogRef.current) {
        // Prioritize close button or first interactive element
        const closeBtn = dialogRef.current.querySelector(
          '.project-modal-close, .certificate-modal-close'
        )
        if (closeBtn) {
          closeBtn.focus()
        } else {
          const focusable = dialogRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusable) {
            focusable.focus()
          } else {
            dialogRef.current.focus()
          }
        }
      }
    }, 40)

    // 4. Keyboard Listener: Escape key and Focus Trap
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose?.()
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (
            document.activeElement === firstElement ||
            document.activeElement === dialogRef.current
          ) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(focusTimer)
      document.body.style.overflow = originalBodyOverflow || ''
      document.documentElement.style.overflow = originalHtmlOverflow || ''
      window.removeEventListener('keydown', handleKeyDown)

      // Restore focus to opener element
      if (
        previousFocusRef.current &&
        typeof previousFocusRef.current.focus === 'function'
      ) {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      className={backdropClassName}
      onClick={closeOnBackdropClick ? onClose : undefined}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={className}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-label={ariaLabel}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}
