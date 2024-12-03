// components/Navbar.tsx

"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className='bg-background border-b w-full'>
      <div className='flex justify-between items-center mx-auto px-4 lg:px-[5%] max-w-7xl h-16 lg:h-18'>
        {/* Logo Section */}
        <Link href='/' className='flex items-center'>
          <Image
            src='/api/placeholder/120/40'
            alt='Logo'
            width={120}
            height={40}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className='lg:flex lg:items-center lg:gap-6 hidden'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href='/features' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Link One
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href='/pricing' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Link Two
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href='/about' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Link Three
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Link Four</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className='p-2 w-48'>
                    <Link
                      href='/dropdown1'
                      className='block hover:bg-accent p-2 rounded'
                    >
                      Dropdown Item 1
                    </Link>
                    <Link
                      href='/dropdown2'
                      className='block hover:bg-accent p-2 rounded'
                    >
                      Dropdown Item 2
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className='flex items-center gap-4'>
            <Button variant='outline'>Button One</Button>
            <Button>Button Two</Button>
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <div className='lg:hidden'>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu className='w-6 h-6' />
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-full sm:w-[300px]'>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className='flex flex-col gap-4 mt-6'>
                <Link
                  href='/features'
                  className='py-2 text-md hover:text-primary'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Link One
                </Link>
                <Link
                  href='/pricing'
                  className='py-2 text-md hover:text-primary'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Link Two
                </Link>
                <Link
                  href='/about'
                  className='py-2 text-md hover:text-primary'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Link Three
                </Link>
                <div className='flex flex-col gap-2 mt-4'>
                  <Button variant='outline' className='w-full'>
                    Button One
                  </Button>
                  <Button className='w-full'>Button Two</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
