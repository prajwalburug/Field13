/*
 * The four Field13 systems, positioned around one buyer: brands running paid social,
 * and the agencies that run it for them. The core pain is that fresh ad creative
 * takes more time and hands than any team has. The engine works WITH the client's
 * creators and editors (never "no creators / no editors"): it multiplies their work.
 * Every system feeds the same creative engine, so the pages read as one loop.
 *
 * Copy rules: no prices at all (pricing is internal only, see internal/pricing.md), no delivery
 * durations or go-live dates, every claim checkable in the client's own accounts.
 */

export const systems = [
  {
    slug: 'ads-ugc',
    n: '01',
    name: 'Ads and UGC',
    short: 'Ads and UGC',
    role: 'Scales the winners',
    start: true,
    ships: 'New hooks and UGC-style video ads every week, edited, captioned and sized for every placement.',
    check: 'Spend and cost per result for every variant, in your own ad account. Losers get turned off.',
    hero: {
      eyebrow: 'The creative engine. Where most teams start.',
      title: <>New ads every week. <em>More out of every creator and editor.</em></>,
      lede: 'Ads wear out fast once people have seen them. We build an AI creative engine in your own accounts that writes hooks, makes UGC-style variants, captions and resizes them, and launches them for testing every week. Your creators and editors plug straight in, so their best work turns into more tested ads.'
    },
    problem: {
      title: <>Fresh creative is the bottleneck. <em>Not budget, not talent.</em></>,
      lede: 'Your creators and editors are good. There is just more work than hours: every new hook means another brief, another cut, another set of sizes and another upload. So most teams test far fewer ads than they should.',
      rows: [
        { topic: 'Ads per video', before: 'One creator video, one ad', after: 'One video turned into four or more hooks to test' },
        { topic: 'A new variant', before: 'Another shoot or another edit', after: 'Made by the pipeline from footage you already have' },
        { topic: 'Your editor’s time', before: 'Spent on resizing, captions and re-exports', after: 'Spent on the cuts that need a human eye' },
        { topic: 'Using AI tools', before: 'Prompting, regenerating and editing yourself, clip by clip', after: 'Prompts, presenters and edits locked into a pipeline we run' },
        { topic: 'Testing volume', before: 'One or two new videos when someone has time', after: 'Four or more hook variants every run' }
      ]
    },
    deliverables: [
      { name: 'Hooks and scripts', body: 'Pulled from what is winning in your niche right now, written in your brand voice.' },
      { name: 'UGC-style videos', body: 'From your creators’ footage, an AI presenter or a licensed real person, with your product demo and voice-over.' },
      { name: 'Finished edits', body: 'Cuts, captions, b-roll and music, sized for every placement. Your editor can take any of them further.' },
      { name: 'Launched tests', body: 'Uploaded to Meta and TikTok as variants, so every hook gets a fair test.' },
      { name: 'Winners scaled', body: 'Losers turned off. Winners get new hooks on top, so they last longer.' }
    ],
    showUgc: true,
    checks: [
      'Every clip sits in your ad account with its spend and cost per result.',
      'Nothing goes live until you approve it.',
      'Every ad carries the AI-content label Meta and TikTok require.',
      'Presenters are AI or a licensed real person. No invented customer testimonials.'
    ],
    faq: [
      { q: 'Does this replace our creators or editors?', a: 'No. It gives them more reach. Creator footage turns into more hooks to test, and editors get the winning variants to polish instead of resizing and re-exporting. If you have no creators yet, Creator outbound can find them, and the engine can start with an AI presenter meanwhile.' },
      { q: 'Will AI ads look fake?', a: 'We test them against your current ads in your own account. If they lose, they get turned off like any other ad. You judge them on the numbers, not on our opinion.' },
      { q: 'What do we need to give you?', a: 'Brand assets, any creator footage you already have, a short product demo and access to your ad accounts. The engine handles hooks, variants, captions, sizes and uploads.' },
      { q: 'Who owns the presenters, prompts and videos?', a: 'You do. Everything lives in your accounts and your storage, and stays there if you leave.' },
      { q: 'Is this allowed on Meta and TikTok?', a: 'Yes. Both platforms require AI-generated content to be labelled, and we label every ad.' },
      { q: 'We are an agency. Can we run this for clients?', a: 'Yes, under your own brand. The agencies page explains how the partnership works.', link: { to: '/agencies', label: 'How the partnership works' } }
    ]
  },
  {
    slug: 'content',
    n: '02',
    name: 'Content',
    short: 'Content',
    role: 'Tests hooks before you boost',
    ships: 'Short videos and posts for TikTok, Reels, Shorts and LinkedIn, made by the same engine. Hooks that win organically move into paid.',
    check: 'Nothing posts until you approve it. Views, watch time and saves per post, in your own accounts.',
    hero: {
      eyebrow: 'Organic short video and posts',
      title: <>A steady feed of short video. <em>Even in the weeks your team is busy.</em></>,
      lede: 'The same engine that makes your ads makes organic videos and posts for TikTok, Reels, Shorts and LinkedIn. Hooks that win for free get moved into paid. You approve everything before it posts.'
    },
    problem: {
      title: <>Posting stops when the team gets busy. <em>The engine does not.</em></>,
      lede: 'Organic content needs ideas, filming and editing every week. When the team gets busy, posting comes in bursts and then goes quiet.',
      rows: [
        { topic: 'Filming', before: 'A new shoot for every post', after: 'Your footage reused, or an AI presenter when nobody can film' },
        { topic: 'Editing', before: 'Every caption and resize done by hand', after: 'Done by the pipeline, so your editor works on what matters' },
        { topic: 'Ideas', before: 'A blank calendar and a brainstorm', after: 'Pulled from top videos in your niche, your calls and product notes' },
        { topic: 'Consistency', before: 'Bursts, then silence', after: 'A queue that keeps filling every week' },
        { topic: 'Organic and paid', before: 'Run by different people, never compared', after: 'Winning organic hooks become ads' }
      ]
    },
    deliverables: [
      { name: 'Short videos', body: 'Vertical videos for TikTok, Reels and Shorts, edited and captioned.' },
      { name: 'Posts and carousels', body: 'For LinkedIn and Instagram, written from your own calls, docs and product notes.' },
      { name: 'A working content calendar', body: 'Every post planned, approved and published on schedule from one calendar.' },
      { name: 'Hook notes', body: 'Which openings held attention, and which ones we move into paid.' }
    ],
    steps: [
      { name: 'Pull', body: 'Top videos in your niche, plus your calls, docs and product updates.' },
      { name: 'Write', body: 'Hooks and scripts in your brand voice, each linked to its source.' },
      { name: 'Make', body: 'Videos generated, edited and captioned. Posts and carousels designed.' },
      { name: 'Approve', body: 'Everything waits in one queue. Nothing posts until you say yes.' },
      { name: 'Post and learn', body: 'Published from your own accounts. Winning hooks go to the ads engine.' }
    ],
    checks: [
      'Every draft links to the video, call or doc it came from.',
      'Nothing posts until you approve it.',
      'Views, watch time and saves per post, in your own accounts.'
    ],
    faq: [
      { q: 'Will it sound like us?', a: 'It writes from your own calls, docs and past posts, and you approve every piece. The edits you make go back into your voice guide.' },
      { q: 'Which platforms?', a: 'TikTok, Instagram Reels, YouTube Shorts and LinkedIn to start, plus Facebook, X, Threads, Pinterest, Bluesky, Snapchat, Reddit, Google Business Profile and more. Everything posts from your own accounts.' },
      { q: 'Is there a real content calendar?', a: 'Yes, and it runs. Every post sits on one calendar with its platform, date and status. Approve a post and it publishes on schedule from your own accounts. Move it and the schedule moves with it. No spreadsheet someone has to remember to update.' },
      { q: 'Do we have to be on camera?', a: 'Only if you want to. Use your own or your creators’ footage, an AI presenter, or license your likeness once and we make videos from it.' },
      { q: 'How is this different from an AI video tool?', a: 'A tool gives you a prompt box and leaves the rest to you. This is the whole pipeline, run for you and your team: ideas, scripts, video, captions and posting.' }
    ]
  },
  {
    slug: 'reports',
    n: '03',
    name: 'Reports',
    short: 'Reports',
    role: 'Says what to make next',
    ships: 'A live creative scoreboard: which hook, presenter and format wins, which ads are tiring, and what to make next.',
    check: 'Every number comes from your own ad accounts. Click it to see the source.',
    hero: {
      eyebrow: 'Creative scoreboard and dashboards',
      title: <>Know which ad is winning, and why. <em>Without exporting a spreadsheet.</em></>,
      lede: 'A live scoreboard of every creative across Meta and TikTok: which hook, presenter and format wins, which ads are tiring, and what the engine should make next. Plus a written report every month on the numbers you care about.'
    },
    problem: {
      title: <>The numbers exist. <em>Nobody has time to read them.</em></>,
      lede: 'Results sit in Ads Manager, TikTok and a spreadsheet someone updates when they can. So winners get noticed late, tired ads keep spending, and the next batch of creative is a guess.',
      rows: [
        { topic: 'Where numbers live', before: 'Ads Manager, TikTok and a spreadsheet', after: 'One dashboard, pulled from your accounts automatically' },
        { topic: 'Why an ad won', before: 'Guessing from ad names', after: 'Every ad tagged by hook, presenter, format and offer' },
        { topic: 'Tired ads', before: 'Noticed after cost per result has climbed', after: 'Flagged as soon as performance starts to slip' },
        { topic: 'What to make next', before: 'A meeting and a hunch', after: 'A brief written from the winners, sent to the engine' },
        { topic: 'Monthly reporting', before: 'Hours of screenshots for a client or a boss', after: 'A written report, ready every month' }
      ]
    },
    deliverables: [
      { name: 'Creative scoreboard', body: 'Every ad ranked by cost per result, tagged by hook, presenter and format.' },
      { name: 'Fatigue alerts', body: 'A heads-up when a winner starts to slip, with replacements already in the queue.' },
      { name: 'Next-batch brief', body: 'What to make next, written from what won and sent to the engine and your creators.' },
      { name: 'Monthly report', body: 'A plain-English summary of the numbers you agreed, ready to forward.' },
      { name: 'Spend to revenue', body: 'Ad spend traced through to leads and sales, if your store or CRM is connected.' }
    ],
    steps: [
      { name: 'Connect', body: 'Read-only access to Meta, TikTok and your store, analytics or CRM.' },
      { name: 'Tag', body: 'Every ad labelled by hook, presenter, format and offer.' },
      { name: 'Score', body: 'Results pulled and ranked automatically, every day.' },
      { name: 'Brief', body: 'Winners and losers turned into the next creative brief.' },
      { name: 'Report', body: 'A written report on the numbers you agreed, every month.' }
    ],
    checks: [
      'Every number comes from your own accounts. Click it to see the source.',
      'Definitions agreed with you up front, and written down.',
      'The dashboard lives in your accounts and stays if you leave.'
    ],
    faq: [
      { q: 'Do you need write access to our ad accounts?', a: 'Not for reports. Read-only access is enough. The ads engine needs upload access to launch tests.' },
      { q: 'Can agencies send this to clients?', a: 'Yes. The monthly report can go out under your brand.' },
      { q: 'Which tools does it run on?', a: 'What you already use, wherever possible. We map it with you on the call.' },
      { q: 'Can we get reports without the ads engine?', a: 'Yes, but it is most useful with it, because the scoreboard is what tells the engine what to make next.' }
    ]
  },
  {
    slug: 'outbound',
    n: '04',
    name: 'Creator outbound',
    short: 'Creator outbound',
    role: 'Brings in the right creators',
    ships: 'Creators and influencers who fit your brand, found, vetted, contacted and briefed. Their footage feeds the engine.',
    check: 'Every creator, message, rate and reply logged in a place you own. A person approves every send.',
    hero: {
      eyebrow: 'Creator and influencer outreach',
      title: <>The right creators for your brand. <em>Found, briefed and working with you.</em></>,
      lede: 'Good creators are hard to find and slow to sign. The engine searches for creators whose audience and style fit your brand, checks their content and engagement, drafts a personal pitch and a brief, and tracks every conversation. A person approves every message. Their footage then feeds the creative engine, so every video goes further.'
    },
    problem: {
      title: <>Finding creators is a full-time job. <em>Nobody has the time.</em></>,
      lede: 'Most brands find creators by scrolling, messaging and hoping. It eats hours, the fit is a guess, and once someone delivers, their footage gets used in one ad and then forgotten.',
      rows: [
        { topic: 'Finding creators', before: 'Scrolling TikTok and Instagram by hand', after: 'Searched by niche, audience and style, then shortlisted' },
        { topic: 'Checking fit', before: 'Follower count and a gut feeling', after: 'Content, engagement and audience checked before anyone gets a message' },
        { topic: 'Outreach', before: 'Copy-pasted DMs, lost in inboxes', after: 'A personal pitch for each creator, approved by a person' },
        { topic: 'Briefing', before: 'A new brief from scratch every time', after: 'Briefs written from the hooks already winning in your ads' },
        { topic: 'Their footage', before: 'Used once, in one ad', after: 'Fed to the engine and turned into more hooks to test' }
      ]
    },
    deliverables: [
      { name: 'A creator shortlist', body: 'Creators and influencers who fit your niche, audience and look, with the reason each one fits.' },
      { name: 'Personal outreach', body: 'First messages and follow-ups for each creator, approved by a person before they send.' },
      { name: 'Briefs from what wins', body: 'Each brief built from the hooks and formats winning in your ads right now.' },
      { name: 'A creator pipeline', body: 'Every creator, conversation, rate and delivery tracked in one place you own.' },
      { name: 'Footage put to work', body: 'Delivered videos go straight into the engine as raw material for more ads and posts.' }
    ],
    steps: [
      { name: 'Find', body: 'Creators searched by niche, audience, style and the ads already working in your market.' },
      { name: 'Vet', body: 'Content, engagement and audience checked, with a reason for every pick.' },
      { name: 'Reach out', body: 'A personal message and follow-ups drafted. A person approves every send.' },
      { name: 'Brief', body: 'A brief built from your winning hooks, sent once terms are agreed.' },
      { name: 'Multiply', body: 'Their footage goes into the engine and comes back as more ads to test.' }
    ],
    checks: [
      'Every creator, message, rate and reply logged in a place you own.',
      'No message goes out without a person approving it.',
      'Usage rights and any AI editing agreed with each creator in writing, before footage is reused.'
    ],
    faq: [
      { q: 'Does this replace our talent manager or creator agency?', a: 'No. If you have one, the system hands them a better shortlist and keeps the pipeline tidy. If you do not, it does the searching and tracking for you.' },
      { q: 'Who pays the creators?', a: 'You do, at rates you agree with each creator. The system keeps track of every deal and delivery.' },
      { q: 'Can you reuse creator footage with AI?', a: 'Only with the creator’s written permission. Usage rights and AI editing are agreed up front, and every AI-edited ad carries the platform label.' },
      { q: 'Which platforms?', a: 'Creators on TikTok, Instagram and YouTube. We map the right mix for your brand with you on the call.' },
      { q: 'We are an agency. Can it find clients too?', a: 'Yes. The same engine can find brands worth pitching and open each pitch with a sample ad made for their product.' }
    ]
  }
];

/* The flywheel order: creators bring footage, content tests hooks for free,
   ads scale the winners, reports brief the next turn. */
export const loop = ['outbound', 'content', 'ads-ugc', 'reports'];

export const getSystem = (slug) => systems.find((s) => s.slug === slug);
