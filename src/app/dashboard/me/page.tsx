  "use client";

  import { useAuth } from "@/context/AuthContext";
  import { User, Mail, Calendar, MapPin, Award, FileText, Clock } from "lucide-react";

  export default function DashboardPage() {
    const { user } = useAuth();

    if (!user) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] mx-auto space-y-4 md:space-y-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-purple-900 pl-2">Welcome, {user.name}!</h1>


            <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
              <div className="flex items-center gap-3 md:gap-4 mb-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-md">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-purple-600 font-medium">Free Account</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <User className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-800">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium text-gray-800">{new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-800">Indonesia</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Account Type</p>
                      <p className="font-medium text-gray-800">Free Tier</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-700" />
                  Document Activity
                </h3>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center p-3 hover:bg-purple-50 rounded-lg transition-colors">
                    <div>
                      <p className="font-medium">Documents Generated</p>
                      <p className="text-sm text-gray-500">Create and download legal documents</p>
                    </div>
                    <span className="text-2xl font-bold text-purple-700">0</span>
                  </div>

                  <div className="flex justify-between items-center p-3 hover:bg-purple-50 rounded-lg transition-colors">
                    <div>
                      <p className="font-medium">Documents Analyzed</p>
                      <p className="text-sm text-gray-500">AI-powered legal document review</p>
                    </div>
                    <span className="text-2xl font-bold text-purple-700">0</span>
                  </div>
                </div>
              </div>


              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-700" />
                  Recent Activity
                </h3>
                <div className="h-[200px] flex items-center justify-center text-gray-500 text-center">
                  <div>
                    <p>No recent activity</p>
                    <p className="text-sm mt-2">Your recent actions will appear here</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Upgrade to NaviGo Premium</h3>
              <p className="mb-3 md:mb-4 opacity-90 text-sm md:text-base">Get unlimited access to all features and priority support</p>
              <button className="bg-white text-purple-700 px-4 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-gray-100 transition-colors shadow-md font-medium text-sm md:text-base">Upgrade Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

