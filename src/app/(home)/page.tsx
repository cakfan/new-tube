import { getMe } from "@/modules/auth/me";

export default async function Home() {
  const me = await getMe();
  return <div>Hi, {me?.name}I will load videos in the future!</div>;
}
