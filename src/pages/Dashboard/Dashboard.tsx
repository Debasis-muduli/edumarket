import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Book, Video, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  getUserUploads,
  getUserPurchases,
  getUserDownloadedBooks,
  getUserAccessedCourses,
  addBook,
  addCourse,
  deleteBook,
  deleteCourse,
  getBook,
  getCourse,
  getBooks,
  getCourses,
  hasUserPurchased,
  initializeStorage,
  formatPrice
} from "@/utils/localStorage";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [userBooks, setUserBooks] = useState<any[]>([]);
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<any[]>([]);
  const [downloadedBooks, setDownloadedBooks] = useState<any[]>([]);
  const [accessedCourses, setAccessedCourses] = useState<any[]>([]);
  
  // Book upload form
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookPrice, setBookPrice] = useState("0");
  const [bookIsPaid, setBookIsPaid] = useState(false);
  const [bookCategory, setBookCategory] = useState("");
  const [bookCoverImage, setBookCoverImage] = useState("");
  
  // Course upload form
  const [courseTitle, setCourseTitle] = useState("");
  const [courseInstructor, setCourseInstructor] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState("0");
  const [courseIsPaid, setCourseIsPaid] = useState(false);
  const [courseCategory, setCourseCategory] = useState("");
  const [courseCoverImage, setCourseCoverImage] = useState("");
  const [courseVideoUrl, setCourseVideoUrl] = useState("");
  
  // Profile form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    
    // Initialize if needed
    initializeStorage();
    
    // Set profile data
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    
    // Check for query params
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
    
    // Load user data
    loadUserData();
  }, [user, navigate, location]);
  
  const loadUserData = () => {
    if (!user) return;
    
    // Get user uploads
    const uploads = getUserUploads(user.id);
    setUserBooks(uploads.books);
    setUserCourses(uploads.courses);
    
    // Get purchases
    const purchases = getUserPurchases(user.id);
    const purchasedContent = [];
    
    for (const purchase of purchases) {
      if (purchase.itemType === "book") {
        const book = getBook(purchase.itemId);
        if (book) {
          purchasedContent.push({
            ...book,
            type: "book",
            purchaseDate: purchase.purchaseDate
          });
        }
      } else {
        const course = getCourse(purchase.itemId);
        if (course) {
          purchasedContent.push({
            ...course,
            type: "course",
            purchaseDate: purchase.purchaseDate
          });
        }
      }
    }
    
    setPurchasedItems(purchasedContent);
    
    // Get downloaded books
    setDownloadedBooks(getUserDownloadedBooks(user.id));
    
    // Get accessed courses
    setAccessedCourses(getUserAccessedCourses(user.id));
  };
  
  const handleBookUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to upload books");
      return;
    }
    
    // Basic validation
    if (!bookTitle || !bookAuthor || !bookDescription || !bookCategory) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      addBook({
        title: bookTitle,
        author: bookAuthor,
        description: bookDescription,
        price: parseFloat(bookPrice),
        coverImage: bookCoverImage || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=500&q=80",
        category: bookCategory,
        isPaid: bookIsPaid,
        uploadedBy: user.id
      });
      
      toast.success("Book uploaded successfully!");
      
      // Reset form
      setBookTitle("");
      setBookAuthor("");
      setBookDescription("");
      setBookPrice("0");
      setBookIsPaid(false);
      setBookCategory("");
      setBookCoverImage("");
      
      // Refresh data
      loadUserData();
      
      // Switch to My Content tab
      setActiveTab("my-content");
    } catch (error) {
      toast.error("Failed to upload book. Please try again.");
    }
  };
  
  const handleCourseUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to create courses");
      return;
    }
    
    // Basic validation
    if (!courseTitle || !courseInstructor || !courseDescription || !courseCategory || !courseVideoUrl) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      addCourse({
        title: courseTitle,
        instructor: courseInstructor,
        description: courseDescription,
        price: parseFloat(coursePrice),
        coverImage: courseCoverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
        category: courseCategory,
        videoUrl: courseVideoUrl,
        isPaid: courseIsPaid,
        uploadedBy: user.id
      });
      
      toast.success("Course created successfully!");
      
      // Reset form
      setCourseTitle("");
      setCourseInstructor("");
      setCourseDescription("");
      setCoursePrice("0");
      setCourseIsPaid(false);
      setCourseCategory("");
      setCourseCoverImage("");
      setCourseVideoUrl("");
      
      // Refresh data
      loadUserData();
      
      // Switch to My Content tab
      setActiveTab("my-content");
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
    }
  };
  
  const handleDeleteItem = (id: string, type: "book" | "course") => {
    if (!user) return;
    
    try {
      if (type === "book") {
        deleteBook(id);
      } else {
        deleteCourse(id);
      }
      
      toast.success(`${type === "book" ? "Book" : "Course"} deleted successfully!`);
      loadUserData();
    } catch (error) {
      toast.error("Failed to delete item. Please try again.");
    }
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    // In a real app, you would update the user info in your backend
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="my-content">My Content</TabsTrigger>
          <TabsTrigger value="my-library">My Library</TabsTrigger>
          <TabsTrigger value="upload-book">Upload Book</TabsTrigger>
          <TabsTrigger value="upload-course">Create Course</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">Email cannot be changed</p>
                </div>
                
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Purchased Items</CardTitle>
            </CardHeader>
            <CardContent>
              {purchasedItems.length > 0 ? (
                <div className="space-y-4">
                  {purchasedItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-muted rounded-md">
                      <div className="w-16 h-16 bg-secondary rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.coverImage || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&q=80"} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.type === "book" ? `By ${item.author}` : `Instructor: ${item.instructor}`}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                            {item.type === "book" ? "Book" : "Course"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Purchased on {new Date(item.purchaseDate).toLocaleDateString()}
                          </span>
                          <span className="text-xs font-medium ml-auto">
                            {formatPrice(item.price, item.currency)}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => toast.success("Accessing content!")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Access
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Download className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You haven't purchased any items yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* My Content Tab */}
        <TabsContent value="my-content">
          <Card>
            <CardHeader>
              <CardTitle>My Uploaded Books</CardTitle>
            </CardHeader>
            <CardContent>
              {userBooks.length > 0 ? (
                <div className="space-y-4">
                  {userBooks.map(book => (
                    <div key={book.id} className="flex items-center gap-4 p-4 bg-muted rounded-md">
                      <div className="w-16 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={book.coverImage || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&q=80"} 
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">By {book.author}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-muted-foreground/20 px-2 py-1 rounded">
                            {book.category}
                          </span>
                          <span className="text-xs">
                            {book.isPaid ? `$${book.price.toFixed(2)}` : "Free"}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => handleDeleteItem(book.id, "book")}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You haven't uploaded any books yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>My Created Courses</CardTitle>
            </CardHeader>
            <CardContent>
              {userCourses.length > 0 ? (
                <div className="space-y-4">
                  {userCourses.map(course => (
                    <div key={course.id} className="flex items-center gap-4 p-4 bg-muted rounded-md">
                      <div className="w-24 h-16 bg-secondary rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={course.coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&q=80"} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-muted-foreground/20 px-2 py-1 rounded">
                            {course.category}
                          </span>
                          <span className="text-xs">
                            {course.isPaid ? `$${course.price.toFixed(2)}` : "Free"}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => handleDeleteItem(course.id, "course")}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You haven't created any courses yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* My Library Tab */}
        <TabsContent value="my-library">
          <Card>
            <CardHeader>
              <CardTitle>Downloaded Books</CardTitle>
            </CardHeader>
            <CardContent>
              {downloadedBooks.length > 0 ? (
                <div className="space-y-4">
                  {downloadedBooks.map(book => (
                    <div key={book.id} className="flex items-center gap-4 p-4 bg-muted rounded-md">
                      <div className="w-16 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={book.coverImage || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=200&q=80"} 
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">By {book.author}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-muted-foreground/20 px-2 py-1 rounded">
                            {book.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Downloaded on {new Date(book.downloadDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => toast.success("Downloading book again!")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You haven't downloaded any books yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Accessed Courses</CardTitle>
            </CardHeader>
            <CardContent>
              {accessedCourses.length > 0 ? (
                <div className="space-y-4">
                  {accessedCourses.map(course => (
                    <div key={course.id} className="flex items-center gap-4 p-4 bg-muted rounded-md">
                      <div className="w-24 h-16 bg-secondary rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={course.coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&q=80"} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-muted-foreground/20 px-2 py-1 rounded">
                            {course.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Last accessed on {new Date(course.accessDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => toast.success("Accessing course content!")}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You haven't accessed any courses yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Upload Book Tab */}
        <TabsContent value="upload-book">
          <Card>
            <CardHeader>
              <CardTitle>Upload a New Book</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="book-title">Book Title</Label>
                  <Input 
                    id="book-title" 
                    value={bookTitle} 
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="Enter book title" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="book-author">Author</Label>
                  <Input 
                    id="book-author" 
                    value={bookAuthor} 
                    onChange={(e) => setBookAuthor(e.target.value)}
                    placeholder="Enter author name" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="book-description">Description</Label>
                  <Textarea 
                    id="book-description" 
                    value={bookDescription} 
                    onChange={(e) => setBookDescription(e.target.value)}
                    placeholder="Enter book description" 
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="book-category">Category</Label>
                  <Select 
                    value={bookCategory} 
                    onValueChange={setBookCategory}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fiction">Fiction</SelectItem>
                      <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Self-Help">Self-Help</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="book-is-paid">Paid Book</Label>
                      <Switch 
                        id="book-is-paid" 
                        checked={bookIsPaid}
                        onCheckedChange={setBookIsPaid}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Toggle if this is a paid book
                    </p>
                  </div>
                  
                  {bookIsPaid && (
                    <div className="space-y-2">
                      <Label htmlFor="book-price">Price ($)</Label>
                      <Input 
                        id="book-price" 
                        type="number" 
                        min="0.99" 
                        step="0.01"
                        value={bookPrice} 
                        onChange={(e) => setBookPrice(e.target.value)}
                        required={bookIsPaid}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="book-cover">Cover Image URL</Label>
                  <Input 
                    id="book-cover" 
                    value={bookCoverImage} 
                    onChange={(e) => setBookCoverImage(e.target.value)}
                    placeholder="Enter image URL (or leave blank for default)" 
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave blank to use a default cover image
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="book-file">Book File</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="book-file"
                      type="file"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline">
                      <Upload className="h-4 w-4 mr-2" /> Upload
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Note: File upload is simulated in this demo
                  </p>
                </div>
                
                <Button type="submit" className="w-full">
                  Upload Book
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Create Course Tab */}
        <TabsContent value="upload-course">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Course</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCourseUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="course-title">Course Title</Label>
                  <Input 
                    id="course-title" 
                    value={courseTitle} 
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="Enter course title" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course-instructor">Instructor Name</Label>
                  <Input 
                    id="course-instructor" 
                    value={courseInstructor} 
                    onChange={(e) => setCourseInstructor(e.target.value)}
                    placeholder="Enter instructor name" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course-description">Description</Label>
                  <Textarea 
                    id="course-description" 
                    value={courseDescription} 
                    onChange={(e) => setCourseDescription(e.target.value)}
                    placeholder="Enter course description" 
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course-category">Category</Label>
                  <Select 
                    value={courseCategory} 
                    onValueChange={setCourseCategory}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Programming">Programming</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Personal Development">Personal Development</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="course-is-paid">Paid Course</Label>
                      <Switch 
                        id="course-is-paid" 
                        checked={courseIsPaid}
                        onCheckedChange={setCourseIsPaid}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Toggle if this is a paid course
                    </p>
                  </div>
                  
                  {courseIsPaid && (
                    <div className="space-y-2">
                      <Label htmlFor="course-price">Price ($)</Label>
                      <Input 
                        id="course-price" 
                        type="number" 
                        min="0.99" 
                        step="0.01"
                        value={coursePrice} 
                        onChange={(e) => setCoursePrice(e.target.value)}
                        required={courseIsPaid}
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course-video-url">Video URL</Label>
                  <Input 
                    id="course-video-url" 
                    value={courseVideoUrl} 
                    onChange={(e) => setCourseVideoUrl(e.target.value)}
                    placeholder="YouTube or Vimeo embed URL" 
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter a YouTube or video embed URL
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course-cover">Cover Image URL</Label>
                  <Input 
                    id="course-cover" 
                    value={courseCoverImage} 
                    onChange={(e) => setCourseCoverImage(e.target.value)}
                    placeholder="Enter image URL (or leave blank for default)" 
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave blank to use a default cover image
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course-materials">Course Materials</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="course-materials"
                      type="file"
                      className="flex-1"
                      multiple
                    />
                    <Button type="button" variant="outline">
                      <Upload className="h-4 w-4 mr-2" /> Upload
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Note: File upload is simulated in this demo
                  </p>
                </div>
                
                <Button type="submit" className="w-full">
                  Create Course
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
