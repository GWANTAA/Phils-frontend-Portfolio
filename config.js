// Portfolio Configuration - Load from environment variables
// Set in Vercel/Render as:
// - PORTFOLIO_API_BASE_URL
// - PORTFOLIO_ADMIN_USER
// - PORTFOLIO_ADMIN_PASS
// - PORTFOLIO_CONTACT_EMAIL

window.PORTFOLIO_API_BASE_URL = window.ENV?.PORTFOLIO_API_BASE_URL || "https://phils-backend-portfolio.onrender.com";
window.PORTFOLIO_ADMIN_USER = window.ENV?.PORTFOLIO_ADMIN_USER || 'phil';
window.PORTFOLIO_ADMIN_PASS = window.ENV?.PORTFOLIO_ADMIN_PASS || 'phil2026';
window.PORTFOLIO_CONTACT_EMAIL = window.ENV?.PORTFOLIO_CONTACT_EMAIL || 'philandrewjackson618@gmail.com';

console.log('Portfolio Config Loaded');