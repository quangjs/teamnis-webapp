import { loginEmail, firebaseGoogleLogin, registerEmail } from "@/services/auth"
import { useMutation, useQueries } from "@tanstack/react-query"

export function useRegisterEmail() {
  return useMutation({
    mutationFn: registerEmail
  })
}

export function useLoginEmail() {
  return useMutation({
    mutationFn: loginEmail
  })
}

export function useGoogleLogin() {
  return useMutation({
    mutationFn: firebaseGoogleLogin
  })
}