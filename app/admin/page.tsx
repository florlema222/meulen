'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    // Redirect to the static admin HTML page
    window.location.href = '/admin/index.html'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Cargando panel de administración...</p>
    </div>
  )
}
