
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getBookById, hasUserPurchased, addDownloadedBook, formatPrice } from "@/utils/localStorage";
import { toast } from "sonner";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const book = getBookById(id || "");

  const handleDownload = () => {
    if (!user) {
      toast.error("Please login to download this book");
      return;
    }
    
    if (book?.isPaid && !hasUserPurchased(user.id, book.id)) {
      toast("Redirecting to purchase page...");
      // In a real app, redirect to purchase page
      return;
    }
    
    // Add to user's downloaded books
    if (user && book) {
      addDownloadedBook(user.id, book.id);
    }
    
    toast.success("Download started!");
    // In a real application, this would trigger actual download
    setTimeout(() => {
      toast.success("Book downloaded successfully!");
    }, 1500);
  };

  if (!book) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <Button onClick={() => navigate("/books")}>Back to Books</Button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" onClick={() => navigate("/books")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
          <img 
            src={book.coverImage || "https://images.unsplash.com/photo-1561200758-9523d143ed8f?auto=format&fit=crop&w=400&q=80"} 
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">By {book.author}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {book.category}
            </span>
            <span className="font-semibold text-lg">
              {formatPrice(book.price, book.currency)}
            </span>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{book.description}</p>
            </CardContent>
          </Card>
          
          <div className="flex gap-4">
            <Button onClick={handleDownload} className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              {book.isPaid && !hasUserPurchased(user?.id || '', book.id) ? "Purchase & Download" : "Download Now"}
            </Button>
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
