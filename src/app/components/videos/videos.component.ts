import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorDataService } from '../../data/tutor.data';
import { Video } from '../../models/tutor.model';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="videos" class="section videos-section">
      <div class="container">

        <div class="section-eyebrow">Free resources</div>
        <div class="videos-header">
          <div>
            <h2 class="section-title">Watch & <em>learn</em></h2>
            <p class="section-subtitle">
              Free English lessons designed specifically for Chinese speakers.
              New videos every week — 每周更新新视频.
            </p>
          </div>
          <div class="filter-group">
            <button
              *ngFor="let cat of allCategories()"
              class="filter-pill"
              [class.active]="activeFilter() === cat"
              (click)="setFilter(cat)">
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Featured strip (top 3) -->
        <div class="featured-strip" *ngIf="activeFilter() === 'All'">
          <div class="featured-card" *ngFor="let v of featuredVideos(); let i = index"
            [style.animation-delay]="(i * 0.1) + 's'">
            <div class="featured-thumb" [ngClass]="thumbClass(v.category)">
              <div class="thumb-overlay"></div>
              <span class="thumb-emoji">{{ categoryEmoji(v.category) }}</span>
              <div class="thumb-level" [ngClass]="levelClass(v.level)">{{ v.level }}</div>
              <div class="thumb-duration">▶ {{ v.duration }}</div>
            </div>
            <div class="featured-body">
              <span class="video-cat">{{ v.category }}</span>
              <h3 class="video-title">{{ v.title }}</h3>
              <p class="video-title-zh">{{ v.titleZh }}</p>
              <p class="video-desc">{{ v.description }}</p>
              <div class="video-tags">
                <span class="pill" *ngFor="let t of v.tags.slice(0,2)">{{ t }}</span>
              </div>
              <button class="watch-btn featured-watch">
                <span class="play-icon">▶</span> Watch Free
              </button>
            </div>
          </div>
        </div>

        <!-- Regular grid -->
        <div class="video-grid">
          <div class="video-card" *ngFor="let v of regularVideos(); let i = index"
            [style.animation-delay]="(i * 0.08) + 's'">
            <div class="video-thumb" [ngClass]="thumbClass(v.category)">
              <span class="thumb-emoji small">{{ categoryEmoji(v.category) }}</span>
              <div class="thumb-duration small">▶ {{ v.duration }}</div>
              <div class="thumb-level small" [ngClass]="levelClass(v.level)">{{ v.level }}</div>
            </div>
            <div class="video-body">
              <span class="video-cat">{{ v.category }}</span>
              <h3 class="video-title">{{ v.title }}</h3>
              <p class="video-title-zh">{{ v.titleZh }}</p>
              <p class="video-desc short">{{ v.description }}</p>
              <button class="watch-btn">▶ Watch now</button>
            </div>
          </div>
        </div>

        <div class="videos-footer">
          <p>More videos available on YouTube · 更多视频请关注 YouTube</p>
          <a href="#" class="btn-outline">View All Videos →</a>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .videos-section { background: var(--cream); }

    .videos-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 24px;
      margin-bottom: 40px;
    }

    /* ── Filters ── */
    .filter-group {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .filter-pill {
      background: var(--white);
      border: 1px solid var(--border);
      color: var(--text-mid);
      padding: 7px 16px;
      border-radius: 999px;
      font-size: 13px;
      cursor: pointer;
      transition: all var(--transition);
      font-family: var(--font-body);
      &:hover { border-color: var(--sage-light); color: var(--sage); }
      &.active {
        background: var(--sage);
        border-color: var(--sage);
        color: white;
      }
    }

    /* ── Featured strip ── */
    .featured-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 28px;
    }
    .featured-card {
      background: var(--white);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all var(--transition);
      animation: fadeInUp 0.5s ease both;
      &:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow);
      }
    }
    .featured-thumb {
      height: 160px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .thumb-overlay {
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.15);
    }
    .thumb-emoji {
      font-size: 52px;
      position: relative;
      z-index: 1;
    }
    .thumb-emoji.small { font-size: 36px; }

    .thumb-duration {
      position: absolute;
      bottom: 10px; right: 12px;
      background: rgba(255,255,255,0.88);
      backdrop-filter: blur(4px);
      color: var(--text);
      font-size: 11px;
      font-weight: 500;
      padding: 3px 9px;
      border-radius: 999px;
      z-index: 2;
      &.small { font-size: 10px; bottom: 8px; right: 8px; }
    }
    .thumb-level {
      position: absolute;
      top: 10px; left: 12px;
      font-size: 10px;
      font-weight: 600;
      padding: 3px 9px;
      border-radius: 999px;
      z-index: 2;
      &.level-beginner     { background: var(--sage-pale); color: var(--sage); }
      &.level-intermediate { background: var(--gold-pale); color: var(--gold); }
      &.level-advanced     { background: var(--blush-pale); color: #c0766a; }
      &.small { font-size: 9px; top: 8px; left: 8px; }
    }

    /* Thumb colour themes */
    .thumb-conversation { background: linear-gradient(135deg, #eaf2ec, #c5d9c9); }
    .thumb-business     { background: linear-gradient(135deg, #f5edd8, #e8d0a8); }
    .thumb-ielts        { background: linear-gradient(135deg, #fdf1ed, #f5e4de); }
    .thumb-grammar      { background: linear-gradient(135deg, #f0eaf8, #ddd0f0); }
    .thumb-vocabulary   { background: linear-gradient(135deg, #e8f4f8, #c8e4f0); }
    .thumb-default      { background: linear-gradient(135deg, var(--cream-2), var(--cream-3)); }

    .featured-body { padding: 20px 22px 24px; }
    .video-cat {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--sage);
      display: block;
      margin-bottom: 6px;
    }
    .video-title {
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 500;
      color: var(--text);
      line-height: 1.3;
      margin-bottom: 2px;
    }
    .video-title-zh {
      font-size: 12px;
      color: var(--text-dim);
      margin-bottom: 8px;
      letter-spacing: 0.03em;
    }
    .video-desc {
      font-size: 13px;
      color: var(--text-mid);
      line-height: 1.6;
      margin-bottom: 14px;
      &.short {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    .video-tags {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .watch-btn {
      background: var(--cream-2);
      border: 1px solid var(--border);
      color: var(--text-mid);
      font-size: 13px;
      font-weight: 500;
      padding: 9px 18px;
      border-radius: 999px;
      cursor: pointer;
      transition: all var(--transition);
      font-family: var(--font-body);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      &:hover {
        background: var(--sage);
        border-color: var(--sage);
        color: white;
      }
      &.featured-watch { width: 100%; justify-content: center; }
    }
    .play-icon { font-size: 10px; }

    /* ── Regular grid ── */
    .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 16px;
      margin-bottom: 48px;
    }
    .video-card {
      background: var(--white);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius);
      overflow: hidden;
      animation: fadeInUp 0.5s ease both;
      transition: all var(--transition);
      &:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-sm);
      }
    }
    .video-thumb {
      height: 100px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .video-body { padding: 16px 18px 20px; }

    /* ── Footer ── */
    .videos-footer {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      p { font-size: 13px; color: var(--text-dim); }
    }
    .btn-outline {
      display: inline-block;
      border: 1px solid var(--border);
      color: var(--text-mid);
      padding: 11px 28px;
      border-radius: 999px;
      font-size: 13px;
      text-decoration: none;
      transition: all var(--transition);
      &:hover { border-color: var(--sage); color: var(--sage); }
    }

    @media (max-width: 768px) {
      .featured-strip { grid-template-columns: 1fr; }
      .videos-header { flex-direction: column; align-items: flex-start; }
    }
  `]
})
export class VideosComponent implements OnInit {
  private allVideos: Video[] = [];
  activeFilter = signal('All');

  constructor(private data: TutorDataService) {}

  ngOnInit() { this.allVideos = this.data.getVideos(); }

  allCategories = computed(() => {
    const cats = [...new Set(this.allVideos.map(v => v.category))];
    return ['All', ...cats];
  });

  private filtered = computed(() =>
    this.activeFilter() === 'All'
      ? this.allVideos
      : this.allVideos.filter(v => v.category === this.activeFilter())
  );

  featuredVideos = computed(() =>
    this.activeFilter() === 'All' ? this.allVideos.filter(v => v.featured) : []
  );

  regularVideos = computed(() =>
    this.activeFilter() === 'All'
      ? this.allVideos.filter(v => !v.featured)
      : this.filtered()
  );

  setFilter(cat: string) { this.activeFilter.set(cat); }

  thumbClass(category: string): string {
    const map: Record<string, string> = {
      'Conversation':    'thumb-conversation',
      'Business English':'thumb-business',
      'IELTS Prep':      'thumb-ielts',
      'Grammar':         'thumb-grammar',
      'Vocabulary':      'thumb-vocabulary',
    };
    return map[category] ?? 'thumb-default';
  }

  levelClass(level: string): string {
    return `level-${level.toLowerCase()}`;
  }

  categoryEmoji(category: string): string {
    const map: Record<string, string> = {
      'Conversation':    '💬',
      'Business English':'💼',
      'IELTS Prep':      '🎯',
      'Grammar':         '📖',
      'Vocabulary':      '✨',
    };
    return map[category] ?? '🎓';
  }
}
