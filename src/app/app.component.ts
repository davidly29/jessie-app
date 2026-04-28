import { Component } from '@angular/core';
import { NavbarComponent }  from './components/navbar/navbar.component';
import { HeroComponent }    from './components/hero/hero.component';
import { AboutComponent }   from './components/about/about.component';
import { VideosComponent }  from './components/videos/videos.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, AboutComponent, VideosComponent, CoursesComponent, ContactComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-videos></app-videos>
      <app-courses></app-courses>
      <app-contact></app-contact>
    </main>
    <footer class="site-footer">
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="brand-name">Jessy English</span>
            <span class="brand-sub">Helping Chinese speakers find their voice 🌸</span>
          </div>
          <div class="footer-links">
            <a href="#about">About</a>
            <a href="#videos">Videos</a>
            <a href="#courses">Courses</a>
            <a href="#contact">Contact</a>
          </div>
          <p class="footer-copy">© {{ year }} Jessy English. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: var(--cream-2);
      border-top: 1px solid var(--border);
      padding: 48px 0 32px;
    }
    .footer-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      text-align: center;
    }
    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .brand-name {
      font-family: var(--font-display);
      font-size: 22px;
      color: var(--text);
      font-weight: 500;
    }
    .brand-sub {
      font-size: 13px;
      color: var(--text-dim);
    }
    .footer-links {
      display: flex;
      gap: 28px;
      a {
        font-size: 13px;
        color: var(--text-mid);
        &:hover { color: var(--sage); }
      }
    }
    .footer-copy {
      font-size: 12px;
      color: var(--text-dim);
    }
  `]
})
export class AppComponent {
  year = new Date().getFullYear();
}
