import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <!-- Decorative blobs -->
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>

      <div class="container">
        <div class="hero-inner">

          <!-- Left: Text -->
          <div class="hero-text">
            <div class="badge">
              <span class="badge-dot"></span>
              Now accepting new students · 现在接受新学生
            </div>

            <h1>
              Learn English<br>
              with <em>confidence</em><br>
              <span class="zh-sub">用英语自信表达自我</span>
            </h1>

            <p class="hero-desc">
              Hi, I'm <strong>Jessy</strong> — a professional English tutor specialising in
              helping Chinese speakers communicate naturally, pass their exams,
              and thrive in international environments.
            </p>

            <div class="hero-stats">
              <div class="stat">
                <span class="stat-num">500+</span>
                <span class="stat-label">Students taught</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-num">4.9 ★</span>
                <span class="stat-label">Average rating</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat">
                <span class="stat-num">8 yrs</span>
                <span class="stat-label">Experience</span>
              </div>
            </div>

            <div class="hero-actions">
              <a href="#contact" class="btn-primary">Book a Free Trial Lesson</a>
              <a href="#videos" class="btn-ghost">Watch Free Videos ↓</a>
            </div>
          </div>

          <!-- Right: Profile card -->
          <div class="hero-card-wrap">
            <div class="hero-card">
              <div class="card-avatar">
                <div class="avatar-circle">
                  <span class="avatar-emoji">👩‍🏫</span>
                </div>
                <div class="avatar-ring"></div>
              </div>

              <div class="card-body">
                <h3>Jessy Chen</h3>
                <p class="card-role">English Tutor · 英语导师</p>

                <div class="card-tags">
                  <span class="pill">Conversation</span>
                  <span class="pill blush">IELTS</span>
                  <span class="pill gold">Business English</span>
                </div>

                <div class="card-quote">
                  <span class="quote-mark">"</span>
                  Every student has a unique voice —
                  my job is to help you find yours in English.
                </div>
              </div>

              <div class="card-stripe"></div>
            </div>

            <!-- Floating badges -->
            <div class="float-badge badge-ielts">
              🎯 IELTS Band 7+
            </div>
            <div class="float-badge badge-students">
              🌸 HSK-friendly lessons
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 120px 0 80px;
      position: relative;
      overflow: hidden;
    }

    /* Decorative blobs */
    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.45;
      pointer-events: none;
    }
    .blob-1 {
      width: 500px; height: 500px;
      background: var(--sage-pale);
      top: -100px; right: -100px;
    }
    .blob-2 {
      width: 400px; height: 400px;
      background: var(--blush-pale);
      bottom: -80px; left: -80px;
    }
    .blob-3 {
      width: 280px; height: 280px;
      background: var(--gold-pale);
      top: 40%; left: 35%;
    }

    .hero-inner {
      display: grid;
      grid-template-columns: 1fr 420px;
      gap: 64px;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    /* ── Text side ── */
    .hero-text { animation: fadeInUp 0.7s ease both; }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 7px 16px;
      font-size: 12px;
      color: var(--text-mid);
      margin-bottom: 28px;
      box-shadow: var(--shadow-sm);
    }
    .badge-dot {
      width: 7px; height: 7px;
      background: var(--sage);
      border-radius: 50%;
      animation: pulse 2.5s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(0.85); }
    }

    h1 {
      font-size: clamp(42px, 5.5vw, 72px);
      font-weight: 300;
      color: var(--text);
      margin-bottom: 24px;
      letter-spacing: -0.02em;
      em {
        font-style: italic;
        color: var(--sage);
      }
    }
    .zh-sub {
      display: block;
      font-family: var(--font-body);
      font-size: clamp(14px, 1.8vw, 18px);
      font-weight: 300;
      color: var(--text-dim);
      letter-spacing: 0.05em;
      margin-top: 6px;
    }

    .hero-desc {
      font-size: 16px;
      color: var(--text-mid);
      line-height: 1.75;
      margin-bottom: 36px;
      max-width: 480px;
      strong { color: var(--text); font-weight: 500; }
    }

    .hero-stats {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 40px;
      padding: 20px 24px;
      background: var(--white);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius);
      box-shadow: var(--shadow-sm);
      width: fit-content;
    }
    .stat { text-align: center; }
    .stat-num {
      display: block;
      font-family: var(--font-display);
      font-size: 26px;
      font-weight: 500;
      color: var(--text);
      line-height: 1;
    }
    .stat-label {
      display: block;
      font-size: 11px;
      color: var(--text-dim);
      margin-top: 3px;
    }
    .stat-divider {
      width: 1px;
      height: 32px;
      background: var(--border);
    }

    .hero-actions {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    .btn-primary, .btn-ghost {
      padding: 14px 28px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      transition: all var(--transition);
      display: inline-block;
    }
    .btn-primary {
      background: var(--sage);
      color: white;
      box-shadow: 0 4px 16px rgba(138, 171, 146, 0.35);
      &:hover {
        background: #7a9b82;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(138, 171, 146, 0.4);
        color: white;
      }
    }
    .btn-ghost {
      background: transparent;
      color: var(--text-mid);
      border: 1px solid var(--border);
      &:hover {
        border-color: var(--text-mid);
        color: var(--text);
        background: var(--white);
      }
    }

    /* ── Card side ── */
    .hero-card-wrap {
      position: relative;
      animation: fadeInUp 0.7s 0.18s ease both;
      opacity: 0;
      animation-fill-mode: forwards;
    }

    .hero-card {
      background: var(--white);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      position: relative;
    }
    .card-stripe {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 5px;
      background: linear-gradient(90deg, var(--sage), var(--blush), var(--gold));
    }
    .card-avatar {
      padding: 40px 0 20px;
      display: flex;
      justify-content: center;
      position: relative;
    }
    .avatar-circle {
      width: 100px; height: 100px;
      background: linear-gradient(135deg, var(--sage-pale), var(--blush-pale));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 52px;
      position: relative;
      z-index: 1;
      animation: float 4s ease-in-out infinite;
    }
    .avatar-ring {
      position: absolute;
      width: 116px; height: 116px;
      border: 2px dashed var(--sage-light);
      border-radius: 50%;
      animation: float 4s ease-in-out infinite reverse;
    }
    .card-body {
      padding: 0 28px 32px;
      text-align: center;
    }
    .card-body h3 {
      font-size: 26px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 4px;
    }
    .card-role {
      font-size: 13px;
      color: var(--text-dim);
      margin-bottom: 18px;
    }
    .card-tags {
      display: flex;
      justify-content: center;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .card-quote {
      background: var(--cream);
      border-left: 3px solid var(--sage);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      padding: 14px 16px;
      font-size: 13px;
      font-style: italic;
      color: var(--text-mid);
      text-align: left;
      line-height: 1.6;
    }
    .quote-mark {
      font-family: var(--font-display);
      font-size: 32px;
      color: var(--sage-light);
      line-height: 0;
      vertical-align: -12px;
      margin-right: 4px;
    }

    /* Floating badges */
    .float-badge {
      position: absolute;
      background: var(--white);
      border: 1px solid var(--border-soft);
      border-radius: 999px;
      padding: 9px 16px;
      font-size: 12px;
      font-weight: 500;
      color: var(--text);
      box-shadow: var(--shadow);
      white-space: nowrap;
    }
    .badge-ielts {
      top: 24px;
      right: -20px;
      animation: float 3.5s ease-in-out infinite;
    }
    .badge-students {
      bottom: 60px;
      left: -24px;
      animation: float 4.2s 0.8s ease-in-out infinite;
    }

    @media (max-width: 900px) {
      .hero-inner { grid-template-columns: 1fr; }
      .hero-card-wrap { display: none; }
    }
  `]
})
export class HeroComponent {}
