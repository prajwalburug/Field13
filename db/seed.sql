-- Starter ballot so the board isn't empty on day one. Every system starts at 0 votes;
-- all counts shown on the site are real votes from visitors.
INSERT INTO requests (title, details, audience, email, status, stage) VALUES
  ('In-house AI video production', 'Open video and image models deployed in our own accounts, with our team trained to make brand videos, UGC and product content without paying per credit.', 'Agency', 'seed@field13.com', 'approved', 'building'),
  ('Weekly competitor ad tracker', 'Every Monday, pull the new ads our top competitors launched on Meta and LinkedIn and summarise the angles they are testing.', 'Brand', 'seed@field13.com', 'approved', NULL),
  ('Client reporting on autopilot', 'A branded monthly report for every client, pulled from ad accounts, GA4 and the CRM, written up in plain English and sent for approval.', 'Agency', 'seed@field13.com', 'approved', NULL),
  ('Inbound lead responder', 'Reply to every new demo request within five minutes, qualify it, and book the call or route it to the right rep in HubSpot.', 'SaaS team', 'seed@field13.com', 'approved', NULL),
  ('Podcast to 20 posts', 'Turn one podcast or webinar into clips, LinkedIn posts, a newsletter and a blog post in our voice, ready to review.', 'Brand', 'seed@field13.com', 'approved', NULL),
  ('AI search visibility tracker', 'Track how often ChatGPT, Perplexity and Google AI answers mention us against competitors, every week, for the prompts our buyers use.', 'SaaS team', 'seed@field13.com', 'approved', NULL);
