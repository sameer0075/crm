import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home } from 'lucide-react';

interface NavBarInterface {
  href: string;
  icon: ReactNode;
  label: string;
}

export default function Subheader() {
  return (
    <nav className="flex h-[39px] items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
      <ul className="flex space-x-4 overflow-auto">
        <NavItem href="/" icon={<Home className="h-4 w-4" />} label="Home" />
        <NavItem
          href="/leads"
          icon={
            <img
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/leads-icon.png`}
              className="h-4 w-4"
            />
          }
          label="Leads"
        />
        <NavItem
          href="/opportunity"
          icon={
            <img
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/opportunity-icon.jpg`}
            />
          }
          label="Opportunity"
        />
        <NavItem
          href="/appointments"
          icon={
            <img
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/appointment-icon.jpg`}
            />
          }
          label="Appointments"
        />
        <NavItem
          href="/deals"
          icon={
            <img
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/deals-icon.jpg`}
            />
          }
          label="Deals"
        />
      </ul>
    </nav>
  );
}

function NavItem({ href, icon, label }: NavBarInterface) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href; // Determine if the current path matches href
  function handleRouting(url: string) {
    router.push(url);
  }

  return (
    <li>
      <div
        onClick={() => handleRouting(href)}
        className={`flex items-center space-x-1 cursor-pointer rounded-md px-3 py-2 text-sm font-medium ${
          isActive
            ? 'bg-[#4D81D4] bg-opacity-10 border-b-[5px] border-b-[#3673D4] text-[#3673D4] shadow-sm'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        {icon}
        <span className="font-bold">{label}</span>
      </div>
    </li>
  );
}
