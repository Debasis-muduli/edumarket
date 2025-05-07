
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
  
  if (!localStorage.getItem("userBooks")) {
    localStorage.setItem("userBooks", JSON.stringify([]));
  }
  
  if (!localStorage.getItem("userCourses")) {
    localStorage.setItem("userCourses", JSON.stringify([]));
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
