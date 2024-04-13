import { redirect } from "next/navigation";
import { getSession, destroySession } from "@/utils/authHelpers";

export default async function Dashboard() {
  const session = await getSession();

  return (
    <main>
      Dashboard
      <form
        action={async () => {
          "use server";
          await destroySession();
          redirect("/login");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
