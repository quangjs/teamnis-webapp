import { getSession } from "@/utils/authHelper";

export default async function Home() {
  const session = await getSession();

  return (
    <main>
      Home Page
    </main>
  );
}
