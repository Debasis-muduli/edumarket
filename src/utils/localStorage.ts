
interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  category: string;
  fileUrl?: string;
  isPaid: boolean;
  uploadedBy: string;
  createdAt: string;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  coverImage: string;
  category: string;
  videoUrl?: string;
  materialUrl?: string;
  isPaid: boolean;
  uploadedBy: string;
  createdAt: string;
}

interface Purchase {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'book' | 'course';
  purchaseDate: string;
}

// Initialize storage if it doesn't exist
export const initializeStorage = () => {
  if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('courses')) {
    localStorage.setItem('courses', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('purchases')) {
    localStorage.setItem('purchases', JSON.stringify([]));
  }
};

// Books
export const getBooks = (): Book[] => {
  return JSON.parse(localStorage.getItem('books') || '[]');
};

export const getBook = (id: string): Book | undefined => {
  const books = getBooks();
  return books.find(book => book.id === id);
};

export const addBook = (book: Omit<Book, 'id' | 'createdAt'>): Book => {
  const books = getBooks();
  const newBook = {
    ...book,
    id: `book-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
  return newBook;
};

export const updateBook = (id: string, updates: Partial<Book>) => {
  let books = getBooks();
  const index = books.findIndex(book => book.id === id);
  
  if (index !== -1) {
    books[index] = { ...books[index], ...updates };
    localStorage.setItem('books', JSON.stringify(books));
    return true;
  }
  return false;
};

export const deleteBook = (id: string) => {
  const books = getBooks();
  const filtered = books.filter(book => book.id !== id);
  
  if (filtered.length !== books.length) {
    localStorage.setItem('books', JSON.stringify(filtered));
    return true;
  }
  return false;
};

// Courses
export const getCourses = (): Course[] => {
  return JSON.parse(localStorage.getItem('courses') || '[]');
};

export const getCourse = (id: string): Course | undefined => {
  const courses = getCourses();
  return courses.find(course => course.id === id);
};

export const addCourse = (course: Omit<Course, 'id' | 'createdAt'>): Course => {
  const courses = getCourses();
  const newCourse = {
    ...course,
    id: `course-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  
  courses.push(newCourse);
  localStorage.setItem('courses', JSON.stringify(courses));
  return newCourse;
};

export const updateCourse = (id: string, updates: Partial<Course>) => {
  let courses = getCourses();
  const index = courses.findIndex(course => course.id === id);
  
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updates };
    localStorage.setItem('courses', JSON.stringify(courses));
    return true;
  }
  return false;
};

export const deleteCourse = (id: string) => {
  const courses = getCourses();
  const filtered = courses.filter(course => course.id !== id);
  
  if (filtered.length !== courses.length) {
    localStorage.setItem('courses', JSON.stringify(filtered));
    return true;
  }
  return false;
};

// Purchases
export const addPurchase = (userId: string, itemId: string, itemType: 'book' | 'course') => {
  const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
  
  // Check if already purchased
  const existingPurchase = purchases.find(
    (p: Purchase) => p.userId === userId && p.itemId === itemId
  );
  
  if (existingPurchase) {
    return existingPurchase;
  }
  
  const newPurchase = {
    id: `purchase-${Date.now()}`,
    userId,
    itemId,
    itemType,
    purchaseDate: new Date().toISOString(),
  };
  
  purchases.push(newPurchase);
  localStorage.setItem('purchases', JSON.stringify(purchases));
  return newPurchase;
};

export const getUserPurchases = (userId: string): Purchase[] => {
  const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
  return purchases.filter((p: Purchase) => p.userId === userId);
};

export const hasUserPurchased = (userId: string, itemId: string): boolean => {
  const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
  return purchases.some(
    (p: Purchase) => p.userId === userId && p.itemId === itemId
  );
};

// User content
export const getUserUploads = (userId: string) => {
  const books = getBooks();
  const courses = getCourses();
  
  return {
    books: books.filter(book => book.uploadedBy === userId),
    courses: courses.filter(course => course.uploadedBy === userId)
  };
};

// File handling utilities (simulate file storage using localStorage)
export const storeFileData = (fileName: string, fileData: string): string => {
  const fileId = `file-${Date.now()}`;
  localStorage.setItem(fileId, fileData);
  return fileId;
};

export const getFileData = (fileId: string): string | null => {
  return localStorage.getItem(fileId);
};
