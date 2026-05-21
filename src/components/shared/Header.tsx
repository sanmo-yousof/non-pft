"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Footprints,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import useAuth from "@/hook/useAuth";
import InstallButton from "./InstallButton";

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isActive = (path: string): boolean => pathname === path;

  const walkerLinks = [
    { href: "/walker-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/walker-activity", label: "Activity", icon: Footprints },
    { href: "/walker-team", label: "Team", icon: Users },
    { href: "/walker-support", label: "Supporters", icon: Heart },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const supporterLinks = [
    { href: "/supporter-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const publicLinks = [
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const adminLinks = [
    { href: "/admin-dashboard", label: "Admin", icon: Settings },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const getLinks = () => {
    if (!user) return publicLinks;
    if (user?.role === "admin") return adminLinks;
    if (user?.role === "supporter") return supporterLinks;
    return walkerLinks;
  };

  const links = getLinks();

  return (
    <nav
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-stone-200"
      data-testid="navbar"
    >
      <div className="container-app flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          data-testid="nav-logo"
        >
          <Image
            src="/logo/logo.png"
            alt="KEF"
            width={40}
            height={40}
            className="w-10 h-10 object-contain mx-auto"
          />
          <span
            className="font-bold text-lg sm:text-xl tracking-tight"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              color: "#1a3660",
            }}
          >
            The Kenya Challenge
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`nav-${link.label.toLowerCase()}`}
            >
              <Button
                variant={isActive(link.href) ? "default" : "ghost"}
                size="sm"
                className={
                  isActive(link.href)
                    ? "rounded-full bg-primary-500 hover:bg-primary-600 text-white"
                    : "rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }
              >
                <link.icon className="w-4 h-4 mr-1.5" />
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="rounded-full gap-2 text-stone-700 flex items-center px-2 py-1 hover:bg-stone-100 cursor-pointer">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-50/30 flex items-center justify-center">
                    {user?.image ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${user.image}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        width={56}
                        height={56}
                      />
                    ) : (
                      <User className="w-4 h-4 text-primary-700" />
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">
                    {user?.display_name || user?.full_name}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  data-testid="nav-profile-link"
                >
                  <User className="w-4 h-4 mr-2" /> Profile
                </DropdownMenuItem>
                {user.role === "walker" && (
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/fundraise/${user?.registrations?.id}`)
                    }
                    data-testid="nav-fundraise-link"
                  >
                    <Heart className="w-4 h-4 mr-2" /> My Fundraising Page
                  </DropdownMenuItem>
                )}
                {user.role === "supporter" && (
                  <DropdownMenuItem
                    onClick={() => router.push("/supporter-dashboard")}
                    data-testid="nav-supporter-dashboard-link"
                  >
                    <Heart className="w-4 h-4 mr-2" /> My Pledges
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  data-testid="nav-logout-btn"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="rounded-full text-stone-600"
                  data-testid="nav-login-btn"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className="rounded-full bg-primary-500 hover:bg-primary-600 text-white"
                  data-testid="nav-signup-btn"
                >
                  Join the Challenge
                </Button>
              </Link>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <div className="md:hidden cursor-pointer p-2">
                <Menu className="w-5 h-5" />
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-2 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  >
                    <Button
                      variant={isActive(link.href) ? "default" : "ghost"}
                      className={`w-full justify-start rounded-xl ${isActive(link.href) ? "bg-primary-600 hover:bg-primary-700 text-white" : "text-stone-700"}`}
                    >
                      <link.icon className="w-4 h-4 mr-3" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
                {!user && (
                  <>
                    <Link href="/signin" onClick={() => setOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start rounded-xl text-stone-700"
                        data-testid="mobile-login-btn"
                      >
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setOpen(false)}>
                      <Button
                        className="w-full rounded-xl bg-primary-600 hover:bg-primary-700 text-white"
                        data-testid="mobile-signup-btn"
                      >
                        Join the Challenge
                      </Button>
                    </Link>
                  </>
                )}
                <InstallButton/>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Header;
