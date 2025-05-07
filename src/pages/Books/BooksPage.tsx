
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Download } from "lucide-react";
import { getBooks, hasUserPurchased, initializeStorage } from "@/utils/localStorage";
import { toast } from "sonner";

const BooksPage = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    initializeStorage();
    setBooks(getBooks());
  }, []);

  const categories = ["Fiction", "Non-Fiction", "Science", "Technology", "Business", "Self-Help"];
  
  const filterBooks = () => {
    return books.filter(book => {
      // Search term filter
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      // Category filter
      const matchesCategory = category === "all" || book.category === category;
      
      // Price filter
      const matchesPrice = 
        priceFilter === "all" || 
        (priceFilter === "free" && !book.isPaid) ||
        (priceFilter === "paid" && book.isPaid);
        
      return matchesSearch && matchesCategory && matchesPrice;
    });
  };
  
  const handleDownload = (book: any) => {
    if (!user) {
      toast.error("Please login to download this book");
      return;
    }
    
    if (book.isPaid && !hasUserPurchased(user.id, book.id)) {
      toast("Redirecting to purchase page...");
      // In a real app, redirect to purchase page
      return;
    }
    
    toast.success("Download started!");
    // In a real application, this would trigger actual download
    // This is just a simulation
    setTimeout(() => {
      toast.success("Book downloaded successfully!");
    }, 1500);
  };

  const filteredBooks = filterBooks();
  
  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Books Library</h1>
      
      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
        <div className="flex-1">
          <Input
            placeholder="Search by title, author or description..."
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
      
      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <Card key={book.id} className="card-hover overflow-hidden border-none shadow-md">
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img 
                  src={book.coverImage || "https://images.unsplash.com/photo-1561200758-9523d143ed8f?auto=format&fit=crop&w=400&q=80"} 
                  alt={book.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg truncate">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-medium">
                    {book.isPaid ? `$${book.price.toFixed(2)}` : "Free"}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(book)}
                      variant="outline"
                      size="sm"
                      className="text-xs px-2"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {book.isPaid && !user?.id ? "Buy" : "Download"}
                    </Button>
                    <Link to={`/books/${book.id}`}>
                      <Button size="sm" className="text-xs">Details</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Book className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Books Found</h3>
          <p className="text-muted-foreground mb-6">
            {books.length === 0
              ? "Be the first to add a book to the library!"
              : "Try adjusting your filters to find what you're looking for."}
          </p>
          {user && (
            <Link to="/dashboard?tab=upload-book">
              <Button>Upload a Book</Button>
            </Link>
          )}
        </div>
      )}
      
      {/* Upload CTA */}
      {user && (
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Have knowledge to share?</h3>
          <Link to="/dashboard?tab=upload-book">
            <Button size="lg">Upload Your Book</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
