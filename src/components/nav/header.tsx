import Link from "next/link"

import { siteConfig } from "@/config/site"

import auth from "@/lib/auth"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOutButton } from "@/components/auth/signout-button"
import { Icons } from "@/components/icons"
import { Navigation } from "@/components/nav/navigation"
import { NavigationMobile } from "@/components/nav/navigation-mobile"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export async function Header(): Promise<JSX.Element> {
  const session = await auth()

  return (
    <header className="fixed top-0 z-40 flex h-20 w-full bg-red-50/70 backdrop-blur-sm shadow-lg">
      <div className="container flex items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-lg font-bold tracking-wide transition-all duration-300 ease-in-out"
        >
          {/* <Icons.rocket className="size-6 md:hidden lg:flex" /> */}
          <Image
            src={"/images/logo/12nets.webp"}
            width={120}
            height={120}
            alt=""
          />
        </Link>

        {/* Protected nav items that can be visible after signing in. */}
        {session?.user ? (
          <Navigation navItems={siteConfig.protectedNavItems} />
        ): (
          <></>
        )}

        {/* Normal nav items that is visible publicly. */}
        <Navigation navItems={siteConfig.navItems} />


        <div className="flex items-center justify-center">
          <ThemeToggle />
          <NavigationMobile navItems={siteConfig.navItems} />

          <nav className="space-x-1">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className={cn(
                    buttonVariants({ variant: "user", size: "icon" }),
                    "transition-all duration-300 ease-in-out hover:opacity-70"
                  )}
                >
                  <Avatar className="size-9">
                    {session?.user.image ? (
                      <AvatarImage
                        src={session?.user.image}
                        alt={session?.user.name ?? "user's profile picture"}
                        className="size-7 rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="size-9 cursor-pointer p-1.5 text-xs capitalize">
                        <Icons.user className="size-5 rounded-full" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/account"
                        aria-label="Account page"
                      >
                        <Icons.avatar
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings">
                        <Icons.settings
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                aria-label="Sign up"
                href="/signup"
                className={cn(buttonVariants({ size: "sm" }), "ml-2")}
              >
                Sign up
                <span className="sr-only">Sign up</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
