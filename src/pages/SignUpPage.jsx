import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#2D2B3A] text-white flex items-center justify-center p-4">
      <div className="bg-[#1C1B23] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
        <div className="w-full md:w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cyBDbacALV15icnO5buNvvtI36hkCj.png')",
            }}
          ></div>
          <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-2">Smart Home</h2>
            <div className="mt-auto">
              <h3 className="text-3xl font-bold mb-2">Intelligent Living</h3>
              <h3 className="text-3xl font-bold">Simplified Management</h3>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Create an account
          </h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                className="bg-[#2D2B3A] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="bg-[#2D2B3A] border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Create a password"
                  className="bg-[#2D2B3A] border-0 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm text-gray-400">
                I agree to the Terms & Conditions
              </Label>
            </div>
            <Link to={"/login"}>
              <Button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
                Sign Up
              </Button>
            </Link>
          </form>
          <p className="mt-4 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#7C3AED] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
