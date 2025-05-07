
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Download } from "lucide-react";
import { getCourses, hasUserPurchased, initializeStorage } from "@/utils/localStorage";
import { toast } from "sonner";

const CoursesPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    initializeStorage();
    setCourses(getCourses());
  }, []);

  const categories = ["Programming", "Design", "Business", "Marketing", "Personal Development", "Health"];
  
  const filterCourses = () => {
    return courses.filter(course => {
      // Search term filter
      const matchesSearch = 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      // Category filter
      const matchesCategory = category === "all" || course.category === category;
      
      // Price filter
      const matchesPrice = 
        priceFilter === "all" || 
        (priceFilter === "free" && !course.isPaid) ||
        (priceFilter === "paid" && course.isPaid);
        
      return matchesSearch && matchesCategory && matchesPrice;
    });
  };
  
  const handleAccessCourse = (course: any) => {
    if (!user) {
      toast.error("Please login to access this course");
      return;
    }
    
    if (course.isPaid && !hasUserPurchased(user.id, course.id)) {
      toast("Redirecting to purchase page...");
      // In a real app, redirect to purchase page
      return;
    }
    
    // In a real app, redirect to the course content page
    toast.success("Accessing course content!");
  };

  const filteredCourses = filterCourses();
  
  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Courses Library</h1>
      
      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
        <div className="flex-1">
          <Input
            placeholder="Search by title, instructor or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2 md:w-auto">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="free">Free Only</SelectItem>
              <SelectItem value="paid">Paid Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.id} className="card-hover overflow-hidden border-none shadow-md">
              <div className="aspect-video overflow-hidden relative bg-muted">
                <img 
                  src={course.coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80"} 
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button 
                    variant="secondary" 
                    onClick={() => handleAccessCourse(course)}
                    className="gap-2"
                  >
                    <Video className="h-4 w-4" />
                    Watch Preview
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg truncate">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-medium">
                    {course.isPaid ? `$${course.price.toFixed(2)}` : "Free"}
                  </span>
                  <Link to={`/courses/${course.id}`}>
                    <Button size="sm" className="text-xs">Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
          <p className="text-muted-foreground mb-6">
            {courses.length === 0
              ? "Be the first to add a course to the library!"
              : "Try adjusting your filters to find what you're looking for."}
          </p>
          {user && (
            <Link to="/dashboard?tab=upload-course">
              <Button>Upload a Course</Button>
            </Link>
          )}
        </div>
      )}
      
      {/* Upload CTA */}
      {user && (
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Share your expertise</h3>
          <Link to="/dashboard?tab=upload-course">
            <Button size="lg">Create a Course</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
