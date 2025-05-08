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
          currency: "INR"
        },
        {
          id: "book-2",
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          description: "A classic novel set in the American South.",
          coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
          category: "Fiction",
          isPaid: true,
          price: 799,
          currency: "INR"
        },
        {
          id: "book-3",
          title: "Sapiens: A Brief History of Humankind",
          author: "Yuval Noah Harari",
          description: "A sweeping survey of the history of humankind.",
          coverImage: "https://images.unsplash.com/photo-1507842214779-8d0453ef86f3?auto=format&fit=crop&w=400&q=80",
          category: "Non-Fiction",
          isPaid: true,
          price: 999,
          currency: "INR"
        },
        {
          id: "book-4",
          title: "Java: The Complete Reference",
          author: "Herbert Schildt",
          description: "Comprehensive guide to Java programming language with examples and best practices.",
          coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=400&q=80",
          category: "Technology",
          isPaid: true,
          price: 1499,
          currency: "INR"
        },
        {
          id: "book-5",
          title: "Python Crash Course",
          author: "Eric Matthes",
          description: "A hands-on, project-based introduction to programming with Python.",
          coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=400&q=80",
          category: "Technology",
          isPaid: true,
          price: 1299,
          currency: "INR"
        },
        {
          id: "book-6",
          title: "Data Science from Scratch",
          author: "Joel Grus",
          description: "First principles with Python for data science and machine learning fundamentals.",
          coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
          category: "Technology",
          isPaid: true,
          price: 1699,
          currency: "INR"
        }
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
          price: 3999,
          currency: "INR"
        },
        {
          id: "course-2",
          title: "Graphic Design Masterclass",
          instructor: "Jane Smith",
          description: "Master the art of graphic design.",
          coverImage: "https://images.unsplash.com/photo-1505373469526-3a647d064a43?auto=format&fit=crop&w=500&q=80",
          category: "Design",
          isPaid: true,
          price: 2999,
          currency: "INR"
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
          currency: "INR"
        },
        {
          id: "course-4",
          title: "Advanced Java Programming",
          instructor: "Rajesh Kumar",
          description: "Master Java programming with advanced concepts and frameworks.",
          coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80",
          category: "Programming",
          isPaid: true,
          price: 4999,
          currency: "INR"
        },
        {
          id: "course-5",
          title: "Python for Data Science",
          instructor: "Priya Sharma",
          description: "Learn Python programming for data analysis and visualization.",
          coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=500&q=80",
          category: "Data Science",
          isPaid: true,
          price: 5499,
          currency: "INR"
        },
        {
          id: "course-6",
          title: "Machine Learning Fundamentals",
          instructor: "Amit Patel",
          description: "Introduction to machine learning algorithms and implementations.",
          coverImage: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?auto=format&fit=crop&w=500&q=80",
          category: "Data Science",
          isPaid: true,
          price: 6999,
          currency: "INR"
        }
      ])
    );
  }

  if (!localStorage.getItem("purchases")) {
    localStorage.setItem("purchases", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("userBooks")) {
    localStorage.setItem("userBooks", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("userCourses")) {
    localStorage.setItem("userCourses", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("downloadedBooks")) {
    localStorage.setItem("downloadedBooks", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("accessedCourses")) {
    localStorage.setItem("accessedCourses", JSON.stringify([]));
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

export const addPurchase = (userId: string, itemId: string, itemType: 'book' | 'course') => {
  const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
  purchases.push({ 
    userId, 
    itemId, 
    itemType,
    purchaseDate: new Date().toISOString() 
  });
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

// Get a specific book (alias for getBookById for compatibility)
export const getBook = (id: string) => {
  return getBookById(id);
};

// Get a specific course (alias for getCourseById for compatibility)
export const getCourse = (id: string) => {
  return getCourseById(id);
};

// Add a book to user's downloaded books
export const addDownloadedBook = (userId: string, bookId: string) => {
  const downloadedBooks = JSON.parse(localStorage.getItem("downloadedBooks") || "[]");
  
  // Check if book is already in the user's downloaded books
  const alreadyDownloaded = downloadedBooks.some(
    (item: any) => item.userId === userId && item.bookId === bookId
  );
  
  if (!alreadyDownloaded) {
    downloadedBooks.push({ 
      userId, 
      bookId,
      downloadDate: new Date().toISOString() 
    });
    localStorage.setItem("downloadedBooks", JSON.stringify(downloadedBooks));
  }
};

// Add a course to user's accessed courses
export const addAccessedCourse = (userId: string, courseId: string) => {
  const accessedCourses = JSON.parse(localStorage.getItem("accessedCourses") || "[]");
  
  // Check if course is already in the user's accessed courses
  const alreadyAccessed = accessedCourses.some(
    (item: any) => item.userId === userId && item.courseId === courseId
  );
  
  if (!alreadyAccessed) {
    accessedCourses.push({ 
      userId, 
      courseId,
      accessDate: new Date().toISOString() 
    });
    localStorage.setItem("accessedCourses", JSON.stringify(accessedCourses));
  }
};

// Get user's downloaded books
export const getUserDownloadedBooks = (userId: string) => {
  const downloadedBooks = JSON.parse(localStorage.getItem("downloadedBooks") || "[]");
  const userDownloads = downloadedBooks.filter((item: any) => item.userId === userId);
  
  return userDownloads.map((download: any) => {
    const book = getBookById(download.bookId);
    return {
      ...book,
      downloadDate: download.downloadDate
    };
  }).filter(Boolean); // Filter out any undefined books
};

// Get user's accessed courses
export const getUserAccessedCourses = (userId: string) => {
  const accessedCourses = JSON.parse(localStorage.getItem("accessedCourses") || "[]");
  const userAccesses = accessedCourses.filter((item: any) => item.userId === userId);
  
  return userAccesses.map((access: any) => {
    const course = getCourseById(access.courseId);
    return {
      ...course,
      accessDate: access.accessDate
    };
  }).filter(Boolean); // Filter out any undefined courses
};

// Add a new book
export const addBook = (bookData: any) => {
  const books = getBooks();
  const newBook = {
    ...bookData,
    id: `book-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  
  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));
  
  // Also add to user books
  const userBooks = JSON.parse(localStorage.getItem("userBooks") || "[]");
  userBooks.push({
    userId: bookData.uploadedBy,
    bookId: newBook.id
  });
  localStorage.setItem("userBooks", JSON.stringify(userBooks));
  
  return newBook;
};

// Add a new course
export const addCourse = (courseData: any) => {
  const courses = getCourses();
  const newCourse = {
    ...courseData,
    id: `course-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  
  courses.push(newCourse);
  localStorage.setItem("courses", JSON.stringify(courses));
  
  // Also add to user courses
  const userCourses = JSON.parse(localStorage.getItem("userCourses") || "[]");
  userCourses.push({
    userId: courseData.uploadedBy,
    courseId: newCourse.id
  });
  localStorage.setItem("userCourses", JSON.stringify(userCourses));
  
  return newCourse;
};

// Delete a book
export const deleteBook = (bookId: string) => {
  let books = getBooks();
  books = books.filter(book => book.id !== bookId);
  localStorage.setItem("books", JSON.stringify(books));
  
  // Also remove from user books
  const userBooks = JSON.parse(localStorage.getItem("userBooks") || "[]");
  const updatedUserBooks = userBooks.filter((item: any) => item.bookId !== bookId);
  localStorage.setItem("userBooks", JSON.stringify(updatedUserBooks));
};

// Delete a course
export const deleteCourse = (courseId: string) => {
  let courses = getCourses();
  courses = courses.filter(course => course.id !== courseId);
  localStorage.setItem("courses", JSON.stringify(courses));
  
  // Also remove from user courses
  const userCourses = JSON.parse(localStorage.getItem("userCourses") || "[]");
  const updatedUserCourses = userCourses.filter((item: any) => item.courseId !== courseId);
  localStorage.setItem("userCourses", JSON.stringify(updatedUserCourses));
};

// Get user uploads (books and courses)
export const getUserUploads = (userId: string) => {
  // Get user books
  const userBooks = JSON.parse(localStorage.getItem("userBooks") || "[]");
  const userBookIds = userBooks
    .filter((item: any) => item.userId === userId)
    .map((item: any) => item.bookId);
  
  // Get user courses
  const userCourses = JSON.parse(localStorage.getItem("userCourses") || "[]");
  const userCourseIds = userCourses
    .filter((item: any) => item.userId === userId)
    .map((item: any) => item.courseId);
  
  // Get full book and course objects
  const books = getBooks().filter(book => userBookIds.includes(book.id));
  const courses = getCourses().filter(course => userCourseIds.includes(course.id));
  
  return { books, courses };
};

// Get user purchases
export const getUserPurchases = (userId: string) => {
  const purchases = JSON.parse(localStorage.getItem("purchases") || "[]");
  return purchases.filter((purchase: any) => purchase.userId === userId);
};

// Format price to INR
export const formatPrice = (price: number, currency: string = "INR") => {
  if (price === 0) return "Free";
  
  if (currency === "INR") {
    return `₹${price.toLocaleString('en-IN')}`;
  }
  
  return `$${price.toFixed(2)}`;
};
