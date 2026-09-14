export const DEFAULT_LAUNCH_IMAGE =
  'https://blogger.googleusercontent.com/img/a/AVvXsEibljyI450jqchSClNve_fRTniIFKjeSHzZex62DwTWxMUUH7dPv2qT_ehaBQan1fc8BXvWx_JAzX47HqB9RzkKjvz5TCKS2THEndhv4eskxwnqYuoJY6Rdp_njo9H0Qk7fdIL2I5fZWdxBNgrbVjPbhAMgL8WcVDmd2el0bV5Q3rVQTnJMo4DiadJiSqc=s1600';

/**
 * Extracts a Google Drive file ID from various link formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 */
export function getGoogleDriveId(url: string | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/drive\.google\.com\/(?:file\/d\/([a-zA-Z0-9_-]+)|open\?id=([a-zA-Z0-9_-]+)|uc\?(?:export=[^&]+&)?id=([a-zA-Z0-9_-]+))/i);
  if (match) {
    return match[1] || match[2] || match[3] || null;
  }
  return null;
}

/**
 * Normalizes any image URL to ensure it loads directly in standard <img> tags:
 * - Handles Google Drive sharing links -> converts to high-speed CDN direct image URL
 * - Handles Dropbox sharing links -> converts dl=0 to raw=1
 * - Handles GitHub blob links -> converts to raw.githubusercontent.com
 * - Handles Imgur gallery/direct links
 * - Upgrades http:// to https:// to prevent Mixed Content security blocking
 * - Trims whitespace and accidental quotes
 */
export function normalizeImageUrl(url: string | undefined): string {
  if (!url || typeof url !== 'string') return DEFAULT_LAUNCH_IMAGE;
  let trimmed = url.trim();
  if (!trimmed) return DEFAULT_LAUNCH_IMAGE;

  // Remove surrounding quotes if accidentally pasted
  trimmed = trimmed.replace(/^["'`]|["'`]$/g, '').trim();

  // If it's already a base64 data URI, return as-is
  if (trimmed.startsWith('data:image/')) {
    return trimmed;
  }

  // Handle protocol-relative URL
  if (trimmed.startsWith('//')) {
    trimmed = 'https:' + trimmed;
  }

  // Prepend https:// if no protocol was supplied (e.g. "blogger.googleusercontent.com/...")
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = 'https://' + trimmed;
  }

  // Upgrade http:// to https:// to avoid browser Mixed Content blocking on HTTPS sites
  if (trimmed.startsWith('http://')) {
    trimmed = 'https://' + trimmed.slice(7);
  }

  // Google Drive conversion:
  const gDriveId = getGoogleDriveId(trimmed);
  if (gDriveId) {
    // lh3.googleusercontent.com is Google's direct CDN for Drive images, fast and reliable
    return `https://lh3.googleusercontent.com/d/${gDriveId}`;
  }

  // Dropbox conversion:
  if (trimmed.includes('dropbox.com')) {
    if (trimmed.includes('?dl=0') || trimmed.includes('&dl=0')) {
      trimmed = trimmed.replace(/[?&]dl=0/, '?raw=1');
    } else if (!trimmed.includes('raw=1')) {
      trimmed += trimmed.includes('?') ? '&raw=1' : '?raw=1';
    }
    return trimmed;
  }

  // GitHub file to raw:
  if (trimmed.includes('github.com') && trimmed.includes('/blob/')) {
    trimmed = trimmed.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    return trimmed;
  }

  // Imgur page to direct image:
  const imgurMatch = trimmed.match(/^https?:\/\/(?:www\.)?imgur\.com\/([a-zA-Z0-9]+)$/i);
  if (imgurMatch && !['a', 'gallery'].includes(imgurMatch[1].toLowerCase())) {
    return `https://i.imgur.com/${imgurMatch[1]}.png`;
  }

  return trimmed;
}
