'use client';

// react import
import React from 'react';
// mantine import
import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// components import
import Header from '../dashboard/header';
// data import
import { dashboardSidebarLinks } from '@/libs/links';
// next js import
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const pathname = usePathname();

  const checkActiveLink = (path: string) => {
    if (pathname === path) return true;
    return false;
  };

  return (
    <AppShell
      navbar={{
        width: 270,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding='md'
    >
      <AppShell.Navbar p='md'>
        <div className='flex justify-between'>
          <h3 className='text-2xl font-semibold'>Logo</h3>
          <Group h='100%'>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom='sm'
              size='sm'
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom='sm'
              size='sm'
            />
          </Group>
        </div>
        <div className='mt-6'>
          {dashboardSidebarLinks.map((link, i) => (
            <NavLink
              key={i}
              label={link.label}
              component={Link}
              href={link.href}
              leftSection={link.icon}
              active={checkActiveLink(link.href)}
            />
          ))}
        </div>
      </AppShell.Navbar>
      <AppShell.Main>
        <div className='flex items-center'>
          <div>
            <Group h='100%'>
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom='sm'
                size='sm'
              />
              {!desktopOpened && (
                <Burger
                  opened={desktopOpened}
                  onClick={toggleDesktop}
                  visibleFrom='sm'
                  size='sm'
                  mr={10}
                />
              )}
            </Group>
          </div>
          <div className='flex-grow'>
            <Header />
          </div>
        </div>
        <div className='pt-4'>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
};

export default Sidebar;
