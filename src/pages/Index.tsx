
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Video } from "lucide-react";
import { getBooks, getCourses, initializeStorage } from "@/utils/localStorage";

const Index = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    // Initialize localStorage if needed
    initializeStorage();
  }, []);
  
  const featuredBooks = getBooks().slice(0, 3);
  const featuredCourses = getCourses().slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-16 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Discover, Learn, and Grow
            </h1>
            <p className="text-xl md:text-2xl mx-auto max-w-[700px] text-white/80">
              Your one-stop marketplace for books and courses on any topic
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/books">
                <Button size="lg" className="gap-2">
                  <Book size={18} />
                  <span>Browse Books</span>
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="gap-2 bg-white/10 border-white/20 hover:bg-white/20">
                  <Video size={18} />
                  <span>Explore Courses</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover border-none shadow-md">
              <CardContent className="pt-6 pb-6">
                <div className="mb-4 rounded-full w-12 h-12 bg-primary/20 flex items-center justify-center">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Extensive Library</h3>
                <p className="text-muted-foreground">
                  Access thousands of books across various categories and subjects.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-none shadow-md">
              <CardContent className="pt-6 pb-6">
                <div className="mb-4 rounded-full w-12 h-12 bg-primary/20 flex items-center justify-center">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Courses</h3>
                <p className="text-muted-foreground">
                  Learn from industry experts through our curated course collection.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-none shadow-md">
              <CardContent className="pt-6 pb-6">
                <div className="mb-4 rounded-full w-12 h-12 bg-primary/20 flex items-center justify-center">
                  <div className="h-6 w-6 text-primary font-bold">$</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Free & Paid Content</h3>
                <p className="text-muted-foreground">
                  Choose from both free resources and premium content to suit your needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Content Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Content</h2>
            <p className="text-muted-foreground mt-2">
              Explore our hand-picked books and courses
            </p>
          </div>
          
          {/* Sample Content */}
          {featuredBooks.length > 0 || featuredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBooks.map(book => (
                <Card key={book.id} className="card-hover overflow-hidden border-none shadow-md">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={book.coverImage || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80"} 
                      alt={book.title}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-bold text-lg">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">
                        {book.isPaid ? `$${book.price.toFixed(2)}` : "Free"}
                      </span>
                      <Link to={`/books/${book.id}`}>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {featuredCourses.map(course => (
                <Card key={course.id} className="card-hover overflow-hidden border-none shadow-md">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={course.coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80"} 
                      alt={course.title}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-bold text-lg">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">
                        {course.isPaid ? `$${course.price.toFixed(2)}` : "Free"}
                      </span>
                      <Link to={`/courses/${course.id}`}>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Placeholder Card if not enough content */}
              {featuredBooks.length + featuredCourses.length < 3 && (
                <Card className="card-hover content-gradient border-none shadow-md flex flex-col items-center justify-center p-6">
                  <h3 className="font-bold text-lg mb-2">Share Your Knowledge</h3>
                  <p className="text-center text-muted-foreground mb-4">
                    Upload your own books and courses to help others learn
                  </p>
                  {user ? (
                    <Link to="/dashboard">
                      <Button>Go to Dashboard</Button>
                    </Link>
                  ) : (
                    <Link to="/register">
                      <Button>Get Started</Button>
                    </Link>
                  )}
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No content available yet. Be the first to share your knowledge!</p>
              {user ? (
                <Link to="/dashboard">
                  <Button>Upload Content</Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button>Register to Contribute</Button>
                </Link>
              )}
            </div>
          )}
          
          <div className="flex justify-center mt-10 gap-4">
            <Link to="/books">
              <Button variant="outline">View All Books</Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline">View All Courses</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-primary-foreground/80 max-w-[800px] mx-auto mb-8">
            Join thousands of learners and creators. Access quality educational content or share your expertise.
          </p>
          {user ? (
            <Link to="/dashboard">
              <Button size="lg" variant="secondary">Go to Your Dashboard</Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button size="lg" variant="secondary">Create Your Account</Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
