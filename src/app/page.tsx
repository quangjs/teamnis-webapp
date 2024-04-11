import { getSession } from "@/utils/authHelpers";

export default async function Home() {
  const session = await getSession();

  return (
    <main>
      Home Page
    </main>
  );
}
