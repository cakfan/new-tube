import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { StudioUploadModal } from "../studio-upload-modal";

export const StudioNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 h-16 bg-background flex items-center px-2 pr-5 z-50 border-b shadow-md">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and Logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href="/studio" className="flex items-center gap-1 p-4">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <p className="text-xl font-semibold tracking-tight">Studio</p>
          </Link>
        </div>

        <div className="flex ml-auto flex-shrink-0 items-center gap-4">
          <StudioUploadModal />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
