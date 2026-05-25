/**
 * video-hero block
 * Cinematic full-bleed background video hero.
 * Follows the 0.3.0 contract from `da block inspect video-hero`.
 *
 * Expected authoring (inside a section wrapper for class preservation):
 * <div class="video-hero">
 *   <div>
 *     <div><a href="/media/hero.mp4">Descriptive title</a></div>
 *   </div>
 *   <div>
 *     <div>
 *       <h1>Headline</h1>
 *       <p>Supporting copy</p>
 *       <p><strong><a href="...">Primary CTA</a></strong> <em><a href="...">Secondary</a></em></p>
 *     </div>
 *   </div>
 * </div>
 */

export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length < 2) {
    // eslint-disable-next-line no-console
    console.warn('[video-hero] Block requires 2 rows: [video link] + [overlay content]');
    return;
  }

  // Row 1: video source
  const videoLink = rows[0].querySelector('a');
  const videoSrc = videoLink ? videoLink.href : null;

  // Row 2: overlay content (headline, body, CTAs)
  const content = rows[1].querySelector('div') || rows[1];

  // Clear authored table structure
  block.innerHTML = '';

  // Create video element (hero-appropriate attributes)
  if (videoSrc) {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('aria-hidden', 'true');

    // Basic error handling for missing media
    video.addEventListener('error', () => {
      // eslint-disable-next-line no-console
      console.warn(`[video-hero] Failed to load video: ${videoSrc}`);
      block.classList.add('video-failed');
    });

    block.appendChild(video);
  }

  // Overlay content container (styled via CSS)
  const overlay = document.createElement('div');
  overlay.className = 'video-hero-content';
  overlay.appendChild(content.cloneNode(true));

  block.appendChild(overlay);

  // Mark as decorated for any future CSS/JS targeting
  block.dataset.videoHero = 'true';
}