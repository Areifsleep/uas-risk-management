import { Link, usePage } from "@inertiajs/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { LogOut, User } from "lucide-react";

export const UserButton = () => {
  const auth = usePage().props.auth;
  return (
    <div className="relative">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarFallback className="bg-sky-600 text-white">
              {auth.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-base font-medium leading-none">{auth.user.name}</p>

              <p className="text-xs leading-none text-muted-foreground">{auth.user.email}</p>
              <p className="text-xs leading-none text-muted-foreground font-semibold">
                {auth.user.faculty?.name ?? auth.roles[0] == "super_admin" ? "Admin" : "Rektor"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={route("profile.edit")}
              as="button"
              className="w-full"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={route("logout")}
              as="button"
              className="w-full"
              method="post"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
