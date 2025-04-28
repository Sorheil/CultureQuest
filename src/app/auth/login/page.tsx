"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    setIsLoading(true)

    try {
      // Appel à l'API de connexion
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Identifiants incorrects")
      }

      // Redirection vers la page d'accueil après connexion
      router.push("/")
    } catch (error) {
      console.error("Erreur de connexion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mobile-container">
      <motion.div
        className="flex flex-col items-center justify-center px-4 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Image src="/quest-owl.png" alt="CultureQuest Owl" width={100} height={100} className="mb-4" />
        </motion.div>

        <motion.h1
          className="text-[#a73c1c] text-3xl font-bold mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Connexion
        </motion.h1>

        <motion.p
          className="text-center text-gray-400 mb-8 px-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Continuez votre voyage culturel avec CultureQuest
        </motion.p>

        {error && (
          <motion.div
            className="w-full max-w-md bg-red-50 text-red-600 p-3 rounded-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-500">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-xl border-gray-300 bg-gray-50"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password" className="text-gray-500">
                Mot de passe
              </Label>
              <Link href="/forgot-password" className="text-sm text-[#a73c1c] hover:text-[#8a3217]">
                Mot de passe oublié?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-xl border-gray-300 bg-gray-50"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="remember"
              className="mt-1"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              disabled={isLoading}
            />
            <Label htmlFor="remember" className="text-sm text-gray-500">
              Se souvenir de moi
            </Label>
          </div>

          <motion.button
            type="submit"
            className="bg-[#a73c1c] hover:bg-[#8a3217] text-white font-bold py-4 px-6 rounded-full shadow-md transition-all duration-200 text-center w-full disabled:opacity-50"
            whileHover={{ scale: isLoading ? 1 : 1.03 }}
            whileTap={{ scale: isLoading ? 1 : 0.97 }}
            disabled={isLoading}
          >
            {isLoading ? "CONNEXION EN COURS..." : "SE CONNECTER"}
          </motion.button>
        </motion.form>

        <motion.div
          className="mt-6 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <span className="text-gray-400">Vous n&apos;avez pas de compte?</span>{" "}
          <Link href="/register" className="font-medium text-[#a73c1c] hover:text-[#8a3217]">
            Inscrivez-vous
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
