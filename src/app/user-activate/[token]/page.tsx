import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Activate",
  description: "User active account",
};

export default function Page({ params }: { params: { token: string } }) {
  return (
      <div>Token: {params.token}</div>
  )
}