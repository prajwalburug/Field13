const content = [
  {
    slug: 'the-end-of-brand-marketing',
    title: 'The End of Brand Marketing',
    tags: ['Team Adoption', 'Strategy'],
    summary: 'How trust became the new acquisition channel. Why teams abandon CRMs and how to reverse it.',
    readTime: '7 min read'
  },
  {
    slug: 'why-communities-beat-campaigns',
    title: 'Why Communities Beat Campaigns',
    tags: ['Pipeline Visibility', 'GTM Strategy'],
    summary: 'The most effective GTM happens in places you cannot track. Pipeline visibility starts before the CRM.',
    readTime: '6 min read'
  },
  {
    slug: 'founder-media-is-the-new-abm',
    title: 'Founder Media Is the New ABM',
    tags: ['Data Quality', 'Lead Response'],
    summary: 'One founder post can generate more pipeline than an entire quarter of ABM. Lead response determines whether you catch it.',
    readTime: '5 min read'
  },
  {
    slug: 'signal-in-a-noisy-market',
    title: 'Signal in a Noisy Market',
    tags: ['Workflow Health', 'Lead Response'],
    summary: 'In a market where everyone shouts, the winning strategy is to become the signal. What to automate first.',
    readTime: '6 min read'
  },
  {
    slug: 'category-intelligence-brief',
    title: 'How to Map Your Competitive Narrative',
    tags: ['Pipeline Visibility', 'Strategy'],
    summary: 'A framework for understanding what narratives your competitors own and where whitespace exists for your revenue system.',
    readTime: '8 min read'
  },
  {
    slug: 'narrative-architecture-framework',
    title: 'The System Behind Repeatable Ideas',
    tags: ['Team Adoption', 'Workflow Health'],
    summary: 'How to build 3-5 core opinions that your market begins to associate with your company. Same structure applies to CRM adoption.',
    readTime: '7 min read'
  },
  {
    slug: 'distribution-map-template',
    title: 'Where Your Ideas Belong',
    tags: ['Data Quality', 'Lead Response'],
    summary: 'A structured approach to placing content where buying decisions happen. Lead response is the closest cousin to distribution velocity.',
    readTime: '6 min read'
  },
];

export const allContent = content;

export const allTags = [...new Set(content.flatMap((c) => c.tags))].sort();

export const scorecardContent = {
  title: 'Get the 5-dimension scorecard',
  summary: 'The same scorecard we use on every client, as a free self-assessment you can run today.',
  cta: 'Book your free Process Check →'
};

export const getContentBySlug = (slug) => content.find((c) => c.slug === slug);

export const getContentByType = (type) => content.filter((c) => c.type === type);

export const getLatest = (count = 4) => content.slice(0, count);

export default content;
