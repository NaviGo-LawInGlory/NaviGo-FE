import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import PricingCard from "@/components/landing/pricing-card"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="bg-purple-700 text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold flex items-center">
              <span className="text-white">Legal</span>
              <span className="text-white">Pro</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-purple-200">
              Home
            </Link>
            <Link href="/features" className="hover:text-purple-200">
              Features
            </Link>
            <Link href="/faq" className="hover:text-purple-200">
              FAQ
            </Link>
            <Link href="/pricing" className="hover:text-purple-200">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="bg-white text-purple-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-100"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-white text-purple-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-purple-100 hidden md:inline-block"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="relative h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=1200"
              alt="Legal documents and pen"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Integrated Legal Advice</h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Solutions For You</h2>
            <Link
              href="/try-now"
              className="bg-white text-purple-700 px-6 py-2 rounded-md font-medium hover:bg-purple-100 transition-colors"
            >
              Try Now
            </Link>
          </div>
        </section>

        {/* Empowering Section */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-purple-700">Empowering</span> Your Legal Needs,
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Faster Than Ever</h3>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="border border-purple-300 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <div className="bg-purple-700 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">Legal Document Generator</h3>
                <p className="text-sm text-gray-600">
                  Create legally binding documents in minutes with our easy-to-use templates
                </p>
              </div>

              {/* Feature 2 */}
              <div className="border border-purple-300 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <div className="bg-purple-700 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">Video Consultation Service</h3>
                <p className="text-sm text-gray-600">
                  Connect with experienced attorneys through secure video consultations
                </p>
              </div>

              {/* Feature 3 */}
              <div className="border border-purple-300 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <div className="bg-purple-700 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">24/7 Legal Support</h3>
                <p className="text-sm text-gray-600">Get answers to your legal questions anytime, day or night</p>
              </div>

              {/* Feature 4 */}
              <div className="border border-purple-300 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <div className="bg-purple-700 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">Free Contract Review</h3>
                <p className="text-sm text-gray-600">
                  Upload your contracts for professional review and recommendations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Find Out More Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Find Out More About the Laws Here!</h2>
            <p className="text-gray-600 mb-6">DISCOVER EVERYTHING YOU NEED TO KNOW ABOUT LEGAL MATTERS</p>

            <div className="max-w-md mx-auto relative">
              <div className="flex items-center border border-purple-300 rounded-full overflow-hidden bg-white">
                <Search className="ml-3 text-purple-700" size={20} />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full py-2 px-4 focus:outline-none text-gray-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Select Plan that Fits your Needs!</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Plan 1 */}
              <PricingCard />

              {/* Plan 2 */}
              <PricingCard />

              {/* Plan 3 */}
              <PricingCard />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-700 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold flex items-center">
                <span className="text-white">Legal</span>
                <span className="text-white">Pro</span>
              </Link>
              <p className="text-sm mt-1">©2023 LegalPro. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-purple-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </Link>
              <Link href="#" className="text-white hover:text-purple-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
