import React, { useState } from "react"
import { ContactFormData } from "../types"

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void
}

const classifyMessage = (text: string): string => {
  const lower = text.toLowerCase()
  if (lower.includes("amo") || lower.includes("gostei") || lower.includes("parabéns") || lower.includes("muito bom"))
    return "elogio"
  if (lower.includes("ruim") || lower.includes("péssimo") || lower.includes("critico") || lower.includes("não gostei"))
    return "crítica"
  if (lower.includes("como") || lower.includes("quando") || lower.includes("onde") || lower.endsWith("?"))
    return "dúvida"
  if (lower.includes("erro") || lower.includes("bug") || lower.includes("problema") || lower.includes("travando"))
    return "problema técnico"
  return "outro"
}

const saveToLocalStorage = (data: any) => {
  const existing = JSON.parse(localStorage.getItem("contactMessages") || "[]")
  const updated = [...existing, data]
  localStorage.setItem("contactMessages", JSON.stringify(updated))
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (!value.trim()) {
      setErrors(prev => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} é obrigatório`
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório"
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido"
    if (!formData.message.trim()) newErrors.message = "Mensagem é obrigatória"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const category = classifyMessage(formData.message)
    const fullData = { ...formData, category, timestamp: new Date().toISOString() }
    saveToLocalStorage(fullData)
    onSubmit(fullData)
    setFormData({ name: "", email: "", message: "" })
    setErrors({})
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-[var(--primary-color)] text-center mb-8">Envie sua Mensagem</h2>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold text-[var(--text-color)] mb-2">Nome Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`px-4 py-3 border-2 rounded-lg font-sans text-base transition-all ${
              errors.name ? "border-[var(--error-color)]" : "border-[var(--medium-gray)]"
            } focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[rgba(102,51,255,0.1)]`}
          />
          {errors.name && <span className="text-[var(--error-color)] text-sm mt-1 font-medium">{errors.name}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold text-[var(--text-color)] mb-2">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="seu.email@exemplo.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`px-4 py-3 border-2 rounded-lg font-sans text-base transition-all ${
              errors.email ? "border-[var(--error-color)]" : "border-[var(--medium-gray)]"
            } focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[rgba(102,51,255,0.1)]`}
          />
          {errors.email && <span className="text-[var(--error-color)] text-sm mt-1 font-medium">{errors.email}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="font-semibold text-[var(--text-color)] mb-2">Mensagem</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Digite sua mensagem aqui..."
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`px-4 py-3 border-2 rounded-lg font-sans text-base transition-all resize-vertical min-h-[150px] ${
              errors.message ? "border-[var(--error-color)]" : "border-[var(--medium-gray)]"
            } focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[rgba(102,51,255,0.1)]`}
          />
          {errors.message && <span className="text-[var(--error-color)] text-sm mt-1 font-medium">{errors.message}</span>}
        </div>

        <button
          type="submit"
          className="mt-2 px-6 py-4 bg-[var(--primary-color)] text-white font-bold rounded-lg text-lg transition-all hover:bg-[var(--accent-color)] hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  )
}
