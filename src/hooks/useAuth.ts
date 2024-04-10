import { emailLogin, firebaseGoogleLogin } from "@/services/auth"
import { useMutation, useQueries } from "@tanstack/react-query"

export function useEmailLogin() {
  return useMutation({
    mutationFn: emailLogin
  })
}

export function useGoogleLogin() {
  return useMutation({
    mutationFn: firebaseGoogleLogin
  })
}