export const initializeStorage = () => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  
  if (!localStorage.getItem("books")) {
    localStorage.setItem(
      "books",
      JSON.stringify([
        {
          id: "book-1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          description: "A novel about the Roaring Twenties.",
          coverImage: "https://images.unsplash.com/photo-1561200758-9523d143ed8f?auto=format&fit=crop&w=400&q=80",
          category: "Fiction",
          isPaid: false,
          price: 0,
        },
        {
          id: "book-2",
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          description: "A classic novel set in the American South.",
          coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
          category: "Fiction",
          isPaid: true,
          price: 9.99,
        },
        {
          id: "book-3",
          title: "Sapiens: A Brief History of Humankind",
          author: "Yuval Noah Harari",
          description: "A sweeping survey of the history of humankind.",
          coverImage: "https://images.unsplash.com/photo-1507842214779-8d0453ef86f3?auto=format&fit=crop&w=400&q=80",
          category: "Non-Fiction",
          isPaid: true,
          price: 12.5,
        },
      ])
    );
  }

  if (!localStorage.getItem("courses")) {
    localStorage.setItem(
      "courses",
      JSON.stringify([
        {
          id: "course-1",
          title: "Web Development Bootcamp",
          instructor: "John Doe",
          description: "Learn web development from scratch.",
          coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
          category: "Programming",
          isPaid: true,
          price: 49.99,
        },
        {
          id: "course-2",
          title: "Graphic Design Masterclass",
          instructor: "Jane Smith",
          description: "Master the art of graphic design.",
          coverImage: "https://images.unsplash.com/photo-1505373469526-3a647d064a43?auto=format&fit=crop&w=500&q=80",
          category: "Design",
          isPaid: true,
          price: 39.99,
        },
        {
          id: "course-3",
          title: "Digital Marketing 101",
          instructor: "Mike Johnson",
          description: "Learn the basics of digital marketing.",
          coverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
          category: "Marketing",
          isPaid: false,
          price: 0,
        },
      ])
    );
  }

  if (!localStorage.getItem("purchases")) {
    localStorage.setItem("purchases", JSON.stringify([]));
  }
};

export const getBooks = () => {
  if (typeof localStorage === 'undefined') {
    return [];
  }
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
};

export const getCourses = () => {
  if (typeof localStorage === 'undefined') {
    return [];
  }
  const courses = localStorage.getItem("courses");
  return courses ? JSON.parse(courses) : [];
};

export const addPurchase = (userId: string, itemId: string) => {
  const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
  purchases.push({ userId, itemId });
  localStorage.setItem("purchases", JSON.stringify(purchases));
};

export const hasUserPurchased = (userId: string, itemId: string) => {
  const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
  return purchases.some(
    (purchase: any) => purchase.userId === userId && purchase.itemId === itemId
  );
};

// Get book by ID
export const getBookById = (id: string) => {
  const books = getBooks();
  return books.find(book => book.id === id);
};

// Get course by ID
export const getCourseById = (id: string) => {
  const courses = getCourses();
  return courses.find(course => course.id === id);
};
