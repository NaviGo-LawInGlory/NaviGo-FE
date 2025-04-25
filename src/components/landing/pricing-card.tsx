import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PricingCard() {
  return (
    <div className="rounded-3xl border-2 border-purple-600 overflow-hidden p-6 flex flex-col">
      <h3 className="text-purple-600 text-2xl font-bold mb-1 text-left">Gratis</h3>
      <div className="flex items-baseline mb-6 text-left">
        <span className="text-gray-700 text-lg font-medium">Rp</span>
        <span className="text-5xl font-bold text-gray-800">0</span>
        <span className="text-gray-600 ml-1">/month</span>
      </div>

      <Link
        href="#"
        className="bg-purple-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-between mb-6 hover:bg-purple-700 transition-colors"
      >
        <span>Get Started</span>
        <ArrowRight size={20} />
      </Link>

      <div className="space-y-3 flex-grow">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded-full w-full"></div>
        ))}
      </div>
    </div>
  )
}
