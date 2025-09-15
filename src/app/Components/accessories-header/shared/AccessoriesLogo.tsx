// src/app/Components/accessories-header/shared/AccessoriesLogo.tsx
import Link from 'next/link';

export default function AccessoriesLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-[#00E396] rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">A</span>
      </div>
      <span className="text-xl font-bold text-gray-900">Ather</span>
    </Link>
  );
}
