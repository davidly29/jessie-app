import { Injectable } from '@angular/core';
import { Video, Testimonial, Course, Service } from '../models/tutor.model';

@Injectable({ providedIn: 'root' })
export class TutorDataService {

  getVideos(): Video[] {
    return [
      {
        id: 'v1',
        title: 'How to Introduce Yourself Naturally',
        titleZh: '如何自然地自我介绍',
        category: 'Conversation',
        description: 'Learn the phrases native speakers actually use — not the textbook version.',
        duration: '18:30',
        level: 'Beginner',
        tags: ['Speaking', 'Greetings', 'Daily Life'],
        featured: true,
      },
      {
        id: 'v2',
        title: 'Business Email Writing Masterclass',
        titleZh: '商务邮件写作精讲',
        category: 'Business English',
        description: 'Professional tone, structure, and vocabulary for workplace emails that impress.',
        duration: '35:12',
        level: 'Intermediate',
        tags: ['Writing', 'Business', 'Workplace'],
        featured: true,
      },
      {
        id: 'v3',
        title: 'IELTS Speaking: Band 7+ Strategies',
        titleZh: 'IELTS 口语 7 分策略',
        category: 'IELTS Prep',
        description: 'Examiner-tested techniques to boost your speaking score in every part.',
        duration: '42:05',
        level: 'Advanced',
        tags: ['IELTS', 'Speaking', 'Exam'],
        featured: true,
      },
      {
        id: 'v4',
        title: 'Common Mistakes Chinese Speakers Make',
        titleZh: '中国人学英语的常见错误',
        category: 'Grammar',
        description: 'The top 10 grammar patterns that trip up Mandarin speakers — and how to fix them.',
        duration: '26:44',
        level: 'Beginner',
        tags: ['Grammar', 'Chinese Speakers', 'Tips'],
      },
      {
        id: 'v5',
        title: 'Phrasal Verbs in Real Conversations',
        titleZh: '真实对话中的短语动词',
        category: 'Vocabulary',
        description: 'Stop memorising lists. Learn phrasal verbs the way native speakers use them.',
        duration: '22:18',
        level: 'Intermediate',
        tags: ['Vocabulary', 'Phrasal Verbs', 'Speaking'],
      },
      {
        id: 'v6',
        title: 'Job Interview English: Q&A Practice',
        titleZh: '英文面试问答实战练习',
        category: 'Business English',
        description: 'Real interview questions with model answers and key phrases to make you stand out.',
        duration: '38:50',
        level: 'Advanced',
        tags: ['Business', 'Interview', 'Speaking'],
      },
    ];
  }

  getTestimonials(): Testimonial[] {
    return [
      {
        id: 't1',
        name: 'Wei Chen',
        nameZh: '陈薇',
        role: 'Software Engineer, Shanghai',
        text: "Jessy's approach is unlike any tutor I've had. She notices exactly where my Chinese-English thinking patterns cause mistakes, and gently redirects them. My confidence in meetings has transformed completely.",
        avatar: '👩‍💻',
        rating: 5,
      },
      {
        id: 't2',
        name: 'Mei Lin',
        nameZh: '林美',
        role: 'University Student, Beijing',
        text: 'I went from IELTS 5.5 to 7.0 in three months with Jessy. Her structured feedback and patience with my pronunciation made all the difference. She truly cares about every student.',
        avatar: '🎓',
        rating: 5,
      },
      {
        id: 't3',
        name: 'Jian Wu',
        nameZh: '吴健',
        role: 'Marketing Director, Guangzhou',
        text: 'Professional, warm, and incredibly effective. My presentations to international clients are now something I look forward to rather than dread. Worth every session.',
        avatar: '👔',
        rating: 5,
      },
    ];
  }

  getCourses(): Course[] {
    return [
      {
        id: 'c1',
        title: 'Everyday English Foundations',
        titleZh: '日常英语基础课程',
        description: 'Build rock-solid conversational English from the ground up — designed specifically for Mandarin speakers.',
        level: 'Beginner',
        totalDuration: '8h 20m',
        lessonsCount: 28,
        color: '#8aab92',
        icon: '🌱',
        sections: [
          {
            id: 's1', title: 'Unit 1 — Greetings & Introductions',
            lessons: [
              { id: 'l1', title: 'Your First English Conversation', titleZh: '你的第一次英语对话', duration: '12:00', type: 'video',   free: true,  completed: true  },
              { id: 'l2', title: 'Introducing Yourself',            titleZh: '自我介绍',           duration: '15:00', type: 'video',   free: true,  completed: true  },
              { id: 'l3', title: 'Practice: Role Play',             titleZh: '练习：角色扮演',      duration: '10:00', type: 'practice',free: false, completed: false },
              { id: 'l4', title: 'Unit Quiz',                       titleZh: '单元测验',           duration: '5:00',  type: 'quiz',    free: false, completed: false },
            ]
          },
          {
            id: 's2', title: 'Unit 2 — Daily Routines',
            lessons: [
              { id: 'l5', title: 'Talking About Your Day',     titleZh: '谈论你的一天',     duration: '18:00', type: 'video',     free: false, completed: false },
              { id: 'l6', title: 'Time Expressions',           titleZh: '时间表达',         duration: '14:00', type: 'video',     free: false, completed: false },
              { id: 'l7', title: 'Worksheet: Fill in the Gaps',titleZh: '工作表：填空',      duration: '15:00', type: 'worksheet', free: false, completed: false },
            ]
          },
          {
            id: 's3', title: 'Unit 3 — Shopping & Ordering',
            lessons: [
              { id: 'l8',  title: 'At the Coffee Shop',         titleZh: '在咖啡店',        duration: '16:00', type: 'video',   free: false, completed: false },
              { id: 'l9',  title: 'Polite Requests',            titleZh: '礼貌请求',        duration: '20:00', type: 'video',   free: false, completed: false },
              { id: 'l10', title: 'Practice Dialogue',          titleZh: '练习对话',        duration: '12:00', type: 'practice',free: false, completed: false },
            ]
          },
        ]
      },
      {
        id: 'c2',
        title: 'Business English Pro',
        titleZh: '商务英语进阶',
        description: 'Master professional communication for meetings, presentations, emails and workplace culture in international companies.',
        level: 'Intermediate',
        totalDuration: '11h 45m',
        lessonsCount: 36,
        color: '#c9a96e',
        icon: '💼',
        sections: [
          {
            id: 's4', title: 'Unit 1 — Professional Writing',
            lessons: [
              { id: 'l11', title: 'Email Etiquette',              titleZh: '邮件礼仪',         duration: '22:00', type: 'video',     free: true,  completed: false },
              { id: 'l12', title: 'Reports and Proposals',        titleZh: '报告与提案',        duration: '28:00', type: 'video',     free: false, completed: false },
              { id: 'l13', title: 'Writing Workshop',             titleZh: '写作工坊',         duration: '30:00', type: 'worksheet', free: false, completed: false },
            ]
          },
          {
            id: 's5', title: 'Unit 2 — Meetings & Presentations',
            lessons: [
              { id: 'l14', title: 'Leading a Meeting',            titleZh: '主持会议',         duration: '25:00', type: 'video',   free: false, completed: false },
              { id: 'l15', title: 'Presentation Structure',       titleZh: '演示结构',         duration: '30:00', type: 'video',   free: false, completed: false },
              { id: 'l16', title: 'Handling Q&A',                 titleZh: '处理问答',         duration: '20:00', type: 'practice',free: false, completed: false },
            ]
          },
        ]
      },
      {
        id: 'c3',
        title: 'IELTS Complete Preparation',
        titleZh: 'IELTS 全面备考',
        description: 'A full IELTS preparation course targeting Band 7+, covering all four skills with Jessy\'s proven exam strategies.',
        level: 'Advanced',
        totalDuration: '15h 30m',
        lessonsCount: 48,
        color: '#e8c4b8',
        icon: '🎯',
        sections: [
          {
            id: 's6', title: 'Part 1 — Listening',
            lessons: [
              { id: 'l17', title: 'Listening Strategies Overview', titleZh: '听力策略概述',    duration: '20:00', type: 'video',   free: true,  completed: false },
              { id: 'l18', title: 'Section 1 & 2 Practice',       titleZh: '第1、2节练习',    duration: '35:00', type: 'practice',free: false, completed: false },
              { id: 'l19', title: 'Section 3 & 4 Practice',       titleZh: '第3、4节练习',    duration: '35:00', type: 'practice',free: false, completed: false },
            ]
          },
          {
            id: 's7', title: 'Part 2 — Speaking',
            lessons: [
              { id: 'l20', title: 'Part 1: Common Topics',         titleZh: '第1部分：常见话题', duration: '28:00', type: 'video',   free: false, completed: false },
              { id: 'l21', title: 'Part 2: Long Turn',             titleZh: '第2部分：长篇独白', duration: '32:00', type: 'video',   free: false, completed: false },
              { id: 'l22', title: 'Part 3: Discussion Skills',     titleZh: '第3部分：讨论技巧', duration: '30:00', type: 'practice',free: false, completed: false },
            ]
          },
        ]
      },
    ];
  }

  getServices(): Service[] {
    return [
      {
        icon: '💬',
        title: '1-on-1 Conversation Class',
        titleZh: '一对一口语课',
        description: 'Live video sessions focused on natural speaking, fluency building, and real-world communication.',
        price: 'From ¥280 / session',
      },
      {
        icon: '🎯',
        title: 'IELTS / TOEFL Coaching',
        titleZh: '雅思 / 托福 辅导',
        description: 'Targeted exam preparation with mock tests, detailed feedback, and proven Band 7+ strategies.',
        price: 'From ¥320 / session',
        highlight: true,
      },
      {
        icon: '💼',
        title: 'Business English',
        titleZh: '商务英语',
        description: 'Professional communication skills for emails, meetings, presentations, and international workplace culture.',
        price: 'From ¥300 / session',
      },
    ];
  }
}
