
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Video } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getCourseById, hasUserPurchased } from "@/utils/localStorage";
import { toast } from "sonner";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const course = getCourseById(id || "");

  const handleAccessCourse = () => {
    if (!user) {
      toast.error("Please login to access this course");
      return;
    }
    
    if (course?.isPaid && !hasUserPurchased(user.id, course.id)) {
      toast("Redirecting to purchase page...");
      // In a real app, redirect to purchase page
      return;
    }
    
    toast.success("Accessing course content!");
    // In a real app, redirect to the course content page
  };

  if (!course) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Button onClick={() => navigate("/courses")}>Back to Courses</Button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" onClick={() => navigate("/courses")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img 
            src={course.coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80"} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">By {course.instructor}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {course.category}
            </span>
            <span className="font-semibold text-lg">
              {course.isPaid ? `$${course.price.toFixed(2)}` : "Free"}
            </span>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About this course</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{course.description}</p>
            </CardContent>
          </Card>
          
          <div className="flex gap-4">
            <Button onClick={handleAccessCourse} className="flex-1 gap-2">
              <Video className="h-4 w-4" />
              {course.isPaid && !hasUserPurchased(user?.id || '', course.id) ? "Purchase & Access" : "Start Learning"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
