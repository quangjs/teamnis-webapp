import { redirect } from "next/navigation";
import { getSession, logout } from "@/utils/authHelpers";

export default async function Dashboard() {
  const session = await getSession();

  return (
    <main>
      Dashboard
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
