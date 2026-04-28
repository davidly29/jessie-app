import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class.scrolled]="scrolled()">
      <div class="nav-inner">
        <a class="logo" href="#">
          <span class="logo-mark">J</span>
          <span class="logo-text">Jessy <em>English</em></span>
        </a>
        <ul class="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#videos">Videos</a></li>
          <li><a href="#courses">Courses</a></li>
          <li><a class="nav-cta" href="#contact">Book a Free Trial</a></li>
        </ul>
        <button class="mobile-menu" aria-label="Menu">☰</button>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 22px 36px;
      transition: all 280ms ease;
    }
    nav.scrolled {
      background: rgba(250, 247, 242, 0.92);
      backdrop-filter: blur(16px);
      padding: 14px 36px;
      border-bottom: 1px solid var(--border-soft);
      box-shadow: var(--shadow-sm);
    }
    .nav-inner {
      max-width: 1080px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text);
      &:hover { text-decoration: none; }
    }
    .logo-mark {
      width: 34px; height: 34px;
      background: linear-gradient(135deg, var(--sage), var(--blush));
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 600;
      color: white;
      flex-shrink: 0;
    }
    .logo-text {
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 500;
      color: var(--text);
      em { font-style: italic; color: var(--sage); }
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 36px;
      list-style: none;
      a {
        font-size: 14px;
        font-weight: 400;
        color: var(--text-mid);
        text-decoration: none;
        transition: color var(--transition);
        &:hover { color: var(--text); }
      }
      a.nav-cta {
        background: var(--sage);
        color: white;
        padding: 10px 22px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 500;
        transition: all var(--transition);
        &:hover {
          background: var(--text);
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }
      }
    }
    .mobile-menu {
      display: none;
      background: none;
      border: 1px solid var(--border);
      color: var(--text-mid);
      padding: 6px 10px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 16px;
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .mobile-menu { display: block; }
    }
  `]
})
export class NavbarComponent {
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }
}
