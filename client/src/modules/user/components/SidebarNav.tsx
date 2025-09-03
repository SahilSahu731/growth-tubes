// components/SidebarNav.tsx
"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarNavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    href: string;
  }[];
}

export function SidebarNav({ isCollapsed, links }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <TooltipProvider>
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors',
                      pathname === link.href && 'bg-gray-100 text-gray-900'
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                  {link.label && <span className="ml-auto text-muted-foreground">{link.label}</span>}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  'flex items-center gap-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors',
                  pathname === link.href && 'bg-gray-100 text-gray-900'
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{link.title}</span>
                {link.label && (
                  <span
                    className={cn(
                      'ml-auto text-xs',
                      pathname === link.href ? 'text-gray-900' : 'text-gray-500'
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
        </TooltipProvider>
      </nav>
    </div>
  );
}