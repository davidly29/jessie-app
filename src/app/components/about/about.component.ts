import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorDataService } from '../../data/tutor.data';
import { Testimonial, Service } from '../../models/tutor.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section about-section">
      <div class="container">

        <!-- Services row -->
        <div class="section-eyebrow">What I offer</div>
        <h2 class="section-title">How I can help <em>you</em></h2>
        <p class="section-subtitle">
          Every lesson is tailored to your level, goals, and schedule.
          Whether you want casual conversation or exam success — I've got you covered.
        </p>

        <div class="services-grid">
          <div class="service-card" *ngFor="let s of services" [class.highlight]="s.highlight">
            <div class="service-icon">{{ s.icon }}</div>
            <h3 class="service-title">{{ s.title }}</h3>
            <p class="service-title-zh">{{ s.titleZh }}</p>
            <p class="service-desc">{{ s.description }}</p>
            <div class="service-price">{{ s.price }}</div>
            <a href="#contact" class="service-btn">Book Now</a>
          </div>
        </div>

        <!-- Testimonials -->
        <div class="testimonials-wrap">
          <div class="section-eyebrow" style="margin-top: 80px">Student stories</div>
          <h2 class="section-title">What students <em>say</em></h2>

          <div class="testimonials-grid">
            <div class="testimonial-card" *ngFor="let t of testimonials; let i = index"
              [style.animation-delay]="(i * 0.12) + 's'">
              <div class="stars">
                <span *ngFor="let s of starsArray(t.rating)">★</span>
              </div>
              <p class="t-text">"{{ t.text }}"</p>
              <div class="t-author">
                <div class="t-avatar">{{ t.avatar }}</div>
                <div class="t-info">
                  <span class="t-name">{{ t.name }}</span>
                  <span class="t-name-zh">{{ t.nameZh }}</span>
                  <span class="t-role">{{ t.role }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .about-section { background: var(--cream-2); }

    /* ── Services ── */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 0;
    }
    .service-card {
      background: var(--white);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-lg);
      padding: 32px 28px;
      transition: all var(--transition);
      position: relative;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--sage-light), transparent);
        opacity: 0;
        transition: opacity var(--transition);
      }
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow);
        &::before { opacity: 1; }
      }
      &.highlight {
        border-color: var(--sage-light);
        background: linear-gradient(145deg, var(--white), var(--sage-pale));
        &::before { opacity: 1; background: linear-gradient(90deg, var(--sage), var(--blush)); }
      }
    }
    .service-icon {
      font-size: 36px;
      margin-bottom: 16px;
      display: block;
    }
    .service-title {
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 2px;
    }
    .service-title-zh {
      font-size: 12px;
      color: var(--text-dim);
      margin-bottom: 12px;
      letter-spacing: 0.03em;
    }
    .service-desc {
      font-size: 14px;
      color: var(--text-mid);
      line-height: 1.65;
      margin-bottom: 20px;
    }
    .service-price {
      font-size: 13px;
      font-weight: 500;
      color: var(--sage);
      margin-bottom: 16px;
    }
    .service-btn {
      display: inline-block;
      background: var(--cream-2);
      border: 1px solid var(--border);
      color: var(--text-mid);
      font-size: 13px;
      padding: 8px 20px;
      border-radius: 999px;
      text-decoration: none;
      transition: all var(--transition);
      &:hover {
        background: var(--sage);
        border-color: var(--sage);
        color: white;
      }
    }
    .service-card.highlight .service-btn {
      background: var(--sage);
      border-color: var(--sage);
      color: white;
      &:hover { background: #7a9b82; }
    }

    /* ── Testimonials ── */
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .testimonial-card {
      background: var(--white);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-lg);
      padding: 28px;
      animation: fadeInUp 0.5s ease both;
      transition: box-shadow var(--transition);
      &:hover { box-shadow: var(--shadow); }
    }
    .stars {
      color: var(--gold);
      font-size: 14px;
      letter-spacing: 2px;
      margin-bottom: 14px;
    }
    .t-text {
      font-size: 14px;
      font-style: italic;
      color: var(--text-mid);
      line-height: 1.7;
      margin-bottom: 20px;
    }
    .t-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .t-avatar {
      width: 42px; height: 42px;
      background: var(--cream-2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      flex-shrink: 0;
      border: 1px solid var(--border-soft);
    }
    .t-info {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .t-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--text);
    }
    .t-name-zh {
      font-size: 11px;
      color: var(--text-dim);
      letter-spacing: 0.05em;
    }
    .t-role {
      font-size: 12px;
      color: var(--text-dim);
    }
  `]
})
export class AboutComponent implements OnInit {
  services: Service[] = [];
  testimonials: Testimonial[] = [];

  constructor(private data: TutorDataService) {}

  ngOnInit() {
    this.services = this.data.getServices();
    this.testimonials = this.data.getTestimonials();
  }

  starsArray(n: number): number[] {
    return Array(n).fill(0);
  }
}
