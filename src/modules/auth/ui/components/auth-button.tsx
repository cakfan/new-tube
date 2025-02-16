import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import { getMe } from "@/actions/user/me";
import { UserMenu } from "./user-menu";
import Link from "next/link";

export const AuthButton = async () => {
  const me = await getMe();

  if (!me) {
    return (
      <Button
        asChild
        variant="outline"
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none "
      >
        <Link href="/signin">
          <UserCircleIcon /> Sign in
        </Link>
      </Button>
    );
  }

  return <UserMenu me={me} />;
};
