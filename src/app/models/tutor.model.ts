export interface Video {
  id: string;
  title: string;
  titleZh: string;         // Chinese subtitle
  category: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  thumbnail?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  nameZh: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  titleZh: string;
  duration: string;
  type: 'video' | 'practice' | 'quiz' | 'worksheet';
  free?: boolean;
  completed?: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDuration: string;
  lessonsCount: number;
  color: string;
  icon: string;
  sections: CourseSection[];
}

export interface Service {
  icon: string;
  title: string;
  titleZh: string;
  description: string;
  price: string;
  highlight?: boolean;
}
