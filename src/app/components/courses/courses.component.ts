import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorDataService } from '../../data/tutor.data';
import { Course, CourseLesson, CourseSection } from '../../models/tutor.model';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="courses" class="section courses-section">
      <div class="container">

        <div class="section-eyebrow">Structured learning</div>
        <h2 class="section-title">Courses & <em>curriculum</em></h2>
        <p class="section-subtitle">
          Step-by-step courses that take you from where you are to where you want to be.
          Every lesson includes Chinese subtitles — 每节课均含中文字幕.
        </p>

        <div class="courses-layout">

          <!-- Course selector tabs -->
          <aside class="sidebar">
            <p class="sidebar-label">Choose a course</p>
            <div class="course-tabs">
              <button
                *ngFor="let c of courses"
                class="course-tab"
                [class.active]="activeCourseId() === c.id"
                (click)="selectCourse(c.id)">
                <span class="tab-icon">{{ c.icon }}</span>
                <div class="tab-text">
                  <span class="tab-name">{{ c.title }}</span>
                  <span class="tab-zh">{{ c.titleZh }}</span>
                  <span class="tab-meta">{{ c.level }} · {{ c.totalDuration }}</span>
                </div>
                <span class="tab-level-dot" [style.background]="c.color"></span>
              </button>
            </div>
          </aside>

          <!-- Course detail + tree -->
          <div class="course-panel" *ngIf="activeCourse() as course">

            <!-- Header -->
            <div class="panel-header" [style.border-top-color]="course.color">
              <div class="panel-top">
                <span class="course-icon-lg">{{ course.icon }}</span>
                <div class="panel-title-block">
                  <div class="panel-level-badge"
                    [style.background]="course.color + '22'"
                    [style.color]="course.color"
                    [style.border-color]="course.color + '55'">
                    {{ course.level }}
                  </div>
                  <h3 class="panel-title">{{ course.title }}</h3>
                  <p class="panel-title-zh">{{ course.titleZh }}</p>
                </div>
              </div>
              <p class="panel-desc">{{ course.description }}</p>

              <div class="panel-meta">
                <span class="meta-item">⏱ {{ course.totalDuration }}</span>
                <span class="meta-item">🎬 {{ course.lessonsCount }} lessons</span>
                <span class="meta-item">📂 {{ course.sections.length }} sections</span>
                <span class="meta-item free-tag">✨ 2 free lessons</span>
              </div>

              <!-- Progress -->
              <div class="progress-wrap">
                <div class="progress-track">
                  <div class="progress-fill"
                    [style.width]="progressPercent(course) + '%'"
                    [style.background]="course.color">
                  </div>
                </div>
                <span class="progress-text">
                  {{ completedCount(course) }} / {{ totalCount(course) }} lessons completed
                  &nbsp;·&nbsp; {{ progressPercent(course) }}%
                </span>
              </div>
            </div>

            <!-- Tree view -->
            <div class="tree-view">
              <div class="tree-section" *ngFor="let sec of course.sections; let si = index">

                <!-- Section header node -->
                <div class="tree-node node-section"
                  (click)="toggleSection(course.id, sec.id)">
                  <span class="toggle-icon">
                    {{ isSectionOpen(course.id, sec.id) ? '▾' : '▸' }}
                  </span>
                  <span class="node-folder">📁</span>
                  <span class="node-label">{{ sec.title }}</span>
                  <span class="node-count">{{ sec.lessons.length }}</span>
                  <span class="sec-pct" [style.color]="course.color">
                    {{ sectionPct(sec) }}%
                  </span>
                </div>

                <!-- Lesson nodes -->
                <div class="tree-children" [class.open]="isSectionOpen(course.id, sec.id)">
                  <div class="tree-node node-lesson"
                    *ngFor="let lesson of sec.lessons; let li = index; let last = last"
                    [class.completed]="lesson.completed"
                    (click)="toggleLesson(lesson)">

                    <span class="branch-line">{{ last ? '└─' : '├─' }}</span>
                    <span class="lesson-icon">{{ typeIcon(lesson.type) }}</span>
                    <div class="lesson-label-wrap">
                      <span class="lesson-title">{{ lesson.title }}</span>
                      <span class="lesson-zh">{{ lesson.titleZh }}</span>
                    </div>
                    <span class="free-badge" *ngIf="lesson.free">FREE</span>
                    <span class="lesson-dur">{{ lesson.duration }}</span>
                    <span class="check" [class.checked]="lesson.completed">
                      {{ lesson.completed ? '✓' : '○' }}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <!-- CTA -->
            <div class="panel-cta">
              <button class="enrol-btn"
                [style.background]="course.color"
                [style.box-shadow]="'0 8px 24px ' + course.color + '44'">
                Enrol in this Course →
              </button>
              <p class="cta-note">7-day free trial · No credit card required</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .courses-section { background: var(--cream-2); }

    .courses-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 28px;
      align-items: start;
    }

    /* ── Sidebar ── */
    .sidebar { position: sticky; top: 88px; }
    .sidebar-label {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 12px;
    }
    .course-tabs { display: flex; flex-direction: column; gap: 8px; }
    .course-tab {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--white);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius);
      padding: 14px 16px;
      cursor: pointer;
      text-align: left;
      transition: all var(--transition);
      &:hover { border-color: var(--sage-light); box-shadow: var(--shadow-sm); }
      &.active {
        border-color: var(--sage-light);
        background: var(--sage-pale);
        box-shadow: var(--shadow-sm);
      }
    }
    .tab-icon { font-size: 24px; flex-shrink: 0; }
    .tab-text {
      display: flex;
      flex-direction: column;
      gap: 1px;
      flex: 1;
      min-width: 0;
    }
    .tab-name {
      font-size: 13px;
      font-weight: 500;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tab-zh { font-size: 11px; color: var(--text-dim); letter-spacing: 0.03em; }
    .tab-meta { font-size: 11px; color: var(--text-dim); }
    .tab-level-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* ── Panel ── */
    .course-panel {
      background: var(--white);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .panel-header {
      padding: 28px;
      border-bottom: 1px solid var(--border-soft);
      border-top: 4px solid;
    }
    .panel-top {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    .course-icon-lg { font-size: 40px; }
    .panel-title-block { flex: 1; }
    .panel-level-badge {
      display: inline-block;
      border: 1px solid;
      border-radius: var(--radius-sm);
      padding: 2px 10px;
      font-size: 11px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    .panel-title {
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 2px;
    }
    .panel-title-zh {
      font-size: 13px;
      color: var(--text-dim);
      letter-spacing: 0.04em;
    }
    .panel-desc {
      font-size: 14px;
      color: var(--text-mid);
      line-height: 1.65;
      margin-bottom: 16px;
    }
    .panel-meta {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .meta-item {
      background: var(--cream);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-sm);
      padding: 4px 11px;
      font-size: 12px;
      color: var(--text-mid);
      &.free-tag { color: var(--sage); border-color: var(--sage-light); background: var(--sage-pale); }
    }
    .progress-wrap { display: flex; flex-direction: column; gap: 6px; }
    .progress-track {
      height: 4px;
      background: var(--border-soft);
      border-radius: 2px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .progress-text { font-size: 11px; color: var(--text-dim); }

    /* ── Tree ── */
    .tree-view { padding: 16px 20px; }
    .tree-section { margin-bottom: 4px; }

    .tree-node {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 9px 10px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: background var(--transition);
      &:hover { background: var(--cream); }
    }

    .node-section {
      font-size: 13px;
      font-weight: 500;
      color: var(--text);
      .toggle-icon { color: var(--sage); font-size: 11px; width: 12px; flex-shrink: 0; }
      .node-folder { font-size: 14px; }
      .node-label  { flex: 1; font-size: 13px; }
      .node-count  {
        font-size: 11px;
        color: var(--text-dim);
        background: var(--cream-2);
        border-radius: 999px;
        padding: 1px 8px;
      }
      .sec-pct { font-size: 11px; font-weight: 600; min-width: 30px; text-align: right; }
    }

    .tree-children {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1);
      &.open { max-height: 1000px; }
    }

    .node-lesson {
      padding-left: 24px;
      align-items: center;
      gap: 8px;
      &.completed .lesson-title { color: var(--text-dim); text-decoration: line-through; }
    }
    .branch-line { color: var(--border); font-size: 12px; flex-shrink: 0; width: 18px; font-family: monospace; }
    .lesson-icon { font-size: 13px; flex-shrink: 0; }
    .lesson-label-wrap {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      gap: 1px;
    }
    .lesson-title { font-size: 13px; color: var(--text); }
    .lesson-zh    { font-size: 11px; color: var(--text-dim); letter-spacing: 0.03em; }
    .free-badge {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--sage);
      border: 1px solid var(--sage-light);
      background: var(--sage-pale);
      padding: 2px 7px;
      border-radius: 999px;
      flex-shrink: 0;
    }
    .lesson-dur { font-size: 11px; color: var(--text-dim); flex-shrink: 0; }
    .check {
      font-size: 13px;
      color: var(--text-dim);
      flex-shrink: 0;
      width: 18px;
      text-align: center;
      &.checked { color: var(--sage); font-weight: 700; }
    }

    /* ── CTA ── */
    .panel-cta {
      padding: 20px 28px 28px;
      border-top: 1px solid var(--border-soft);
      text-align: center;
    }
    .enrol-btn {
      color: white;
      border: none;
      padding: 14px 36px;
      border-radius: 999px;
      font-size: 15px;
      font-weight: 500;
      font-family: var(--font-body);
      cursor: pointer;
      transition: all var(--transition);
      &:hover { filter: brightness(0.92); transform: translateY(-2px); }
    }
    .cta-note { font-size: 12px; color: var(--text-dim); margin-top: 10px; }

    @media (max-width: 860px) {
      .courses-layout { grid-template-columns: 1fr; }
      .sidebar { position: static; }
    }
  `]
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  activeCourseId = signal('');
  expandedSections = signal<Record<string, boolean>>({});

  constructor(private data: TutorDataService) {}

  ngOnInit() {
    this.courses = this.data.getCourses();
    if (this.courses.length) {
      this.activeCourseId.set(this.courses[0].id);
      const map: Record<string, boolean> = {};
      this.courses.forEach(c =>
        c.sections.forEach((s, i) => { map[`${c.id}__${s.id}`] = i === 0; })
      );
      this.expandedSections.set(map);
    }
  }

  activeCourse(): Course | undefined {
    return this.courses.find(c => c.id === this.activeCourseId());
  }

  selectCourse(id: string) { this.activeCourseId.set(id); }

  toggleSection(courseId: string, sectionId: string) {
    const key = `${courseId}__${sectionId}`;
    const cur = { ...this.expandedSections() };
    cur[key] = !cur[key];
    this.expandedSections.set(cur);
  }

  isSectionOpen(courseId: string, sectionId: string): boolean {
    return !!this.expandedSections()[`${courseId}__${sectionId}`];
  }

  toggleLesson(lesson: CourseLesson) { lesson.completed = !lesson.completed; }

  totalCount(course: Course): number {
    return course.sections.reduce((n, s) => n + s.lessons.length, 0);
  }

  completedCount(course: Course): number {
    return course.sections.reduce(
      (n, s) => n + s.lessons.filter(l => l.completed).length, 0
    );
  }

  progressPercent(course: Course): number {
    const total = this.totalCount(course);
    return total ? Math.round((this.completedCount(course) / total) * 100) : 0;
  }

  sectionPct(section: CourseSection): number {
    if (!section.lessons.length) return 0;
    return Math.round(
      (section.lessons.filter(l => l.completed).length / section.lessons.length) * 100
    );
  }

  typeIcon(type: string): string {
    const map: Record<string, string> = {
      video: '▶', practice: '🎙', quiz: '❓', worksheet: '📝'
    };
    return map[type] ?? '•';
  }
}
