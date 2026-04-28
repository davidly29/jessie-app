import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="section contact-section">
      <div class="container">

        <div class="contact-inner">

          <!-- Left: info -->
          <div class="contact-info">
            <div class="section-eyebrow">Get in touch</div>
            <h2 class="section-title">Book your<br><em>free trial</em></h2>
            <div class="divider"></div>
            <p class="info-text">
              Your first lesson is completely free — no commitment, no pressure.
              Just a friendly 45-minute chat to understand your goals and see if we're a good fit.
            </p>
            <p class="info-text-zh">
              第一节课完全免费 — 无需承诺，无压力。轻松地聊45分钟，了解您的目标。
            </p>

            <div class="contact-details">
              <div class="contact-row">
                <span class="contact-icon">📧</span>
                <a href="mailto:jessy@jessyenglish.com">jessy&#64;jessyenglish.com</a>
              </div>
              <div class="contact-row">
                <span class="contact-icon">💬</span>
                <span>WeChat: JessyEnglishTutor</span>
              </div>
              <div class="contact-row">
                <span class="contact-icon">🕐</span>
                <span>Mon–Sat, 9am–8pm CST</span>
              </div>
            </div>

            <div class="social-row">
              <a class="social-btn" href="#">📺 YouTube</a>
              <a class="social-btn" href="#">📘 Facebook</a>
              <a class="social-btn" href="#">📸 Instagram</a>
            </div>
          </div>

          <!-- Right: form -->
          <div class="contact-form-wrap">
            <div class="form-card" *ngIf="!submitted()">
              <h3 class="form-title">Book a Free Trial Lesson</h3>
              <p class="form-sub">预约免费试课</p>

              <div class="form-fields">
                <div class="field-group">
                  <label>Your Name · 姓名</label>
                  <input type="text" [(ngModel)]="form.name"
                    placeholder="e.g. Wei Chen · 陈薇">
                </div>
                <div class="field-group">
                  <label>Email Address · 邮箱</label>
                  <input type="email" [(ngModel)]="form.email"
                    placeholder="your@email.com">
                </div>
                <div class="field-group">
                  <label>WeChat ID · 微信号 <span class="optional">(optional)</span></label>
                  <input type="text" [(ngModel)]="form.wechat"
                    placeholder="Your WeChat ID">
                </div>
                <div class="field-group">
                  <label>I'm interested in · 我感兴趣的</label>
                  <div class="checkbox-group">
                    <label class="check-label" *ngFor="let opt of interestOptions">
                      <input type="checkbox"
                        [checked]="isSelected(opt)"
                        (change)="toggleInterest(opt)">
                      <span>{{ opt }}</span>
                    </label>
                  </div>
                </div>
                <div class="field-group">
                  <label>Your current level · 目前英语水平</label>
                  <select [(ngModel)]="form.level">
                    <option value="">Please select...</option>
                    <option>Beginner (初级)</option>
                    <option>Elementary (基础)</option>
                    <option>Intermediate (中级)</option>
                    <option>Upper-Intermediate (中高级)</option>
                    <option>Advanced (高级)</option>
                  </select>
                </div>
                <div class="field-group">
                  <label>Message · 留言 <span class="optional">(optional)</span></label>
                  <textarea [(ngModel)]="form.message" rows="3"
                    placeholder="Tell me a bit about your English goals..."></textarea>
                </div>
              </div>

              <button class="submit-btn" (click)="submit()">
                Send My Request 🌸
              </button>
              <p class="form-note">I'll reply within 24 hours · 24小时内回复</p>
            </div>

            <!-- Success state -->
            <div class="success-card" *ngIf="submitted()">
              <div class="success-icon">🌸</div>
              <h3>Thank you, {{ form.name || 'there' }}!</h3>
              <p>Your request has been sent. I'll be in touch within 24 hours to schedule your free trial lesson.</p>
              <p class="success-zh">您的请求已发送。我将在24小时内联系您安排免费试课。</p>
              <button class="reset-btn" (click)="reset()">Send another message</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      background: linear-gradient(160deg, var(--cream) 0%, var(--blush-pale) 100%);
    }

    .contact-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: start;
    }

    /* ── Info side ── */
    .info-text {
      font-size: 15px;
      color: var(--text-mid);
      line-height: 1.75;
      margin-bottom: 10px;
    }
    .info-text-zh {
      font-size: 13px;
      color: var(--text-dim);
      line-height: 1.7;
      margin-bottom: 32px;
      letter-spacing: 0.02em;
    }
    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 28px;
    }
    .contact-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      color: var(--text-mid);
      a { color: var(--sage); &:hover { color: var(--text); } }
    }
    .contact-icon { font-size: 18px; }
    .social-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .social-btn {
      background: var(--white);
      border: 1px solid var(--border);
      color: var(--text-mid);
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 500;
      text-decoration: none;
      transition: all var(--transition);
      &:hover { border-color: var(--sage-light); color: var(--sage); background: var(--sage-pale); }
    }

    /* ── Form card ── */
    .form-card, .success-card {
      background: var(--white);
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-xl);
      padding: 36px;
      box-shadow: var(--shadow);
    }
    .form-title {
      font-family: var(--font-display);
      font-size: 22px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 2px;
    }
    .form-sub {
      font-size: 13px;
      color: var(--text-dim);
      margin-bottom: 24px;
      letter-spacing: 0.04em;
    }
    .form-fields { display: flex; flex-direction: column; gap: 18px; margin-bottom: 24px; }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      label {
        font-size: 12px;
        font-weight: 500;
        color: var(--text-mid);
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .optional { font-weight: 400; text-transform: none; letter-spacing: 0; color: var(--text-dim); }
    }
    input, select, textarea {
      background: var(--cream);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 11px 14px;
      font-size: 14px;
      font-family: var(--font-body);
      color: var(--text);
      transition: border-color var(--transition);
      width: 100%;
      resize: none;
      &::placeholder { color: var(--text-dim); }
      &:focus {
        outline: none;
        border-color: var(--sage-light);
        background: var(--white);
      }
    }
    select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b5a89e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }

    .checkbox-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .check-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-mid);
      font-weight: 400;
      text-transform: none;
      letter-spacing: 0;
      cursor: pointer;
      input[type="checkbox"] {
        width: 16px; height: 16px;
        accent-color: var(--sage);
        cursor: pointer;
        padding: 0;
        border: none;
      }
    }

    .submit-btn {
      width: 100%;
      background: linear-gradient(135deg, var(--sage), #7a9b82);
      color: white;
      border: none;
      padding: 14px;
      border-radius: 999px;
      font-size: 15px;
      font-weight: 500;
      font-family: var(--font-body);
      cursor: pointer;
      transition: all var(--transition);
      box-shadow: 0 6px 20px rgba(138, 171, 146, 0.3);
      &:hover { filter: brightness(0.94); transform: translateY(-2px); }
    }
    .form-note { font-size: 12px; color: var(--text-dim); text-align: center; margin-top: 10px; }

    /* ── Success ── */
    .success-card { text-align: center; }
    .success-icon { font-size: 56px; margin-bottom: 16px; }
    .success-card h3 {
      font-family: var(--font-display);
      font-size: 26px;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 12px;
    }
    .success-card p { font-size: 14px; color: var(--text-mid); margin-bottom: 8px; line-height: 1.65; }
    .success-zh { font-size: 13px; color: var(--text-dim); letter-spacing: 0.03em; margin-bottom: 24px !important; }
    .reset-btn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-mid);
      padding: 10px 24px;
      border-radius: 999px;
      cursor: pointer;
      font-size: 13px;
      font-family: var(--font-body);
      transition: all var(--transition);
      &:hover { border-color: var(--sage-light); color: var(--sage); }
    }

    @media (max-width: 768px) {
      .contact-inner { grid-template-columns: 1fr; }
      .checkbox-group { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactComponent {
  submitted = signal(false);

  form = {
    name: '', email: '', wechat: '',
    level: '', message: '',
    interests: [] as string[]
  };

  interestOptions = [
    'Conversation', 'Business English',
    'IELTS / TOEFL', 'Grammar',
    'Pronunciation', 'Writing'
  ];

  isSelected(opt: string): boolean {
    return this.form.interests.includes(opt);
  }

  toggleInterest(opt: string) {
    const idx = this.form.interests.indexOf(opt);
    if (idx > -1) this.form.interests.splice(idx, 1);
    else this.form.interests.push(opt);
  }

  submit() {
    if (this.form.email) this.submitted.set(true);
  }

  reset() {
    this.form = { name: '', email: '', wechat: '', level: '', message: '', interests: [] };
    this.submitted.set(false);
  }
}
