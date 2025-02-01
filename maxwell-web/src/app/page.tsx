import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PatientLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Patient Portal
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Welcome to your patient dashboard. What would you like to do today?
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Button asChild className="w-64 h-16 text-lg">
            <Link href="/update-info">Update Patient Info</Link>
          </Button>
          <Button asChild className="w-64 h-16 text-lg" variant="outline">
            <Link href="/patient-history">Patient History</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
