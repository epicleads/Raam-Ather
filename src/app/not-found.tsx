import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Raam Ather',
  description: 'The page you are looking for could not be found. Explore our electric scooters in Hyderabad and Chennai.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            The page you are looking for might have been moved or no longer exists.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Go Home
          </Link>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <Link
              href="/hyderabad"
              className="text-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-md transition-colors"
            >
              Hyderabad Store
            </Link>
            <Link
              href="/chennai"
              className="text-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-md transition-colors"
            >
              Chennai Store
            </Link>
            <Link
              href="/rizta"
              className="text-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-md transition-colors"
            >
              Ather Rizta
            </Link>
            <Link
              href="/ather-450"
              className="text-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-md transition-colors"
            >
              Ather 450
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}