"use client";

import { type UserType } from "@/db/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { extractName } from "@/modules/auth/name";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import {
  ClapperboardIcon,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface UserMenuProps {
  me: UserType | null | undefined;
}

export const UserMenu = ({ me }: UserMenuProps) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  if (me) {
    const isAdmin = me.role === "admin";
    const menus = [
      {
        title: "Profile",
        href: `/${me.username}`,
        icon: <UserRound size={16} />,
      },
      {
        title: "Studio",
        href: "/studio",
        icon: <ClapperboardIcon size={16} />,
      },
    ];

    if (isAdmin) {
      menus.unshift({
        title: "Admin",
        href: "/admin",
        icon: <LayoutDashboard size={16} />,
      });
    } else {
      menus.splice(1, 0, {
        title: "Transaksi",
        href: "/transaction",
        icon: <ShoppingBag size={16} />,
      });
    }

    const onSignOut = async () => {
      setIsPending(true);
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsPending(false);
            router.refresh();
          },
        },
      });
    };

    return (
      <Popover>
        <PopoverTrigger className="ml-4">
          <Avatar>
            <AvatarImage src={me.image || "/user-placeholder.svg"} />
            <AvatarFallback>{me.name[0]}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="end" className="flex flex-col">
          <span className="px-2.5 py-2">Hi, {extractName(me.name)}</span>
          {menus.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-2.5 py-2 hover:bg-accent"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
          <button
            onClick={onSignOut}
            disabled={isPending}
            className="group flex items-center gap-4 rounded-xl px-2.5 py-2 hover:bg-red-500/5"
          >
            <LogOut size={16} className="text-red-500" />
            <span className="text-red-500">Log out</span>
          </button>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Link
      href={"/signin"}
      className={cn(buttonVariants({ variant: "default" }), "ml-5")}
    >
      Sign In
    </Link>
  );
};
