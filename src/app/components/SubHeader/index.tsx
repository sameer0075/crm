import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Subheader() {
  return (
    <nav className="flex h-[39px] items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
      <ul className="flex space-x-4 overflow-auto">
        <Link href="/dashboard" prefetch={true}>
          <div className="flex pt-1">
            <Home className="pr-2" />
            <label>Home</label>
          </div>
        </Link>

        <Link href="/leads" prefetch={true}>
          <div className="flex pt-1">
            <img
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/leads-icon.png`}
              className="h-4 w-auto mt-1 pr-2"
            />
            <label>Leads</label>
          </div>
        </Link>

        <Link href="/opportunity" prefetch={true}>
          <div className="flex pt-1">
            <img
              className="h-4 w-auto mt-1 pr-2"
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/opportunity-icon.jpg`}
            />
            <label>Opportunity</label>
          </div>
        </Link>

        <Link href="/appointments" prefetch={true}>
          <div className="flex pt-1">
            <img
              className="h-4 w-auto mt-1 pr-2"
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/appointment-icon.jpg`}
            />
            <label>Appointments</label>
          </div>
        </Link>

        <Link href="/deals" prefetch={true}>
          <div className="flex pt-1">
            <img
              className="h-4 w-auto mt-1 pr-2"
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/deals-icon.jpg`}
            />
            <label>Deals</label>
          </div>
        </Link>
      </ul>
    </nav>
  );
}
