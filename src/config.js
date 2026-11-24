// Build-time feature flags. Set in .env.<mode> or the host's build env.
// The public vote (/requests) runs on Cloudflare D1, so it only ships to staging for now.
export const SHOW_VOTE = import.meta.env.VITE_SHOW_VOTE === 'true';
