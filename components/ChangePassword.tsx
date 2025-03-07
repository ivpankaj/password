"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import DashboardHeader from "@/components/dashboard-header"
import { changePassword } from "@/lib/actions/passwords"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

interface ChangePasswordProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function ChangePassword({ user }: ChangePasswordProps) {
  // console.log("ChangePassword rendering with user:", user);
  
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Add states for displaying feedback messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Effect to log user data when it changes
  useEffect(() => {
    // console.log("User data in ChangePassword effect:", user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    
    // Clear any status messages when user starts modifying the form
    setSuccessMessage("");
    setErrorMessage("");
  };

  const validateForm = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!formValues.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!formValues.newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (formValues.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formValues.newPassword !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear any existing messages
    setSuccessMessage("");
    setErrorMessage("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // console.log("Submitting password change with values:", {
      //   currentPassword: formValues.currentPassword ? "Provided" : "Empty",
      //   newPassword: formValues.newPassword ? "Provided" : "Empty",
      // });
  
      const result = await changePassword(
        formValues.currentPassword,
        formValues.newPassword
      );
      
      console.log("Change password result:", result);
      
      if (result && result.success) {
        // Display success message in component
        setSuccessMessage("Password updated successfully! Redirecting to login page...");
        
        // Also try toast as backup
        toast({
          title: "Success",
          description: "Your password has been updated successfully",
          duration: 5000,
        });
        
        // Reset form
        setFormValues({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        
        // Redirect to login page after a longer delay to ensure message is seen
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        // Show error in component
        setErrorMessage(result?.error || "Failed to change password");
        
        // Also try toast as backup
        toast({
          variant: "destructive",
          title: "Password Change Failed",
          description: result?.error || "Failed to change password",
          duration: 5000,
        });
        
        // If it's specifically a current password error, highlight that field
        if (result && result.error === "Current password is incorrect") {
          setErrors(prev => ({
            ...prev,
            currentPassword: "Current password is incorrect"
          }));
        }
      }
    } catch (error) {
      console.error("Error during password change:", error);
      setErrorMessage("Something went wrong. Please try again later.");
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state if user data isn't available yet
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Pass empty object to prevent errors, but this header will show loading state */}
        <DashboardHeader user={{id: "", name: "Loading...", email: ""}} />
        
        <main className="flex-1 container py-10 flex items-center justify-center">
          <p>Loading user information...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader user={user} />
      
      <main className="flex-1 container py-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6">Change Password</h1>
          
          {/* Success message alert */}
          {successMessage && (
            <Alert className="mb-6 bg-green-50 border-green-500 text-green-700">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          
          {/* Error message alert */}
          {errorMessage && (
            <Alert className="mb-6 bg-red-50 border-red-500 text-red-700">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium">
                Current Password
              </label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formValues.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter your current password"
                className={errors.currentPassword ? "border-red-500" : ""}
              />
              {errors.currentPassword && (
                <p className="text-sm font-medium text-red-500">
                  {errors.currentPassword}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium">
                New Password
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formValues.newPassword}
                onChange={handleInputChange}
                placeholder="Enter your new password"
                className={errors.newPassword ? "border-red-500" : ""}
              />
              {errors.newPassword && (
                <p className="text-sm font-medium text-red-500">
                  {errors.newPassword}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm font-medium text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Changing password..." : "Change Password"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}