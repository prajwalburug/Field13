import { useState } from 'react';

const categories = ['GTM / Sales', 'RevOps / Operations', 'Developer tools', 'AI / Automation', 'Productivity / Workflow', 'Marketing / Growth', 'Other'];
const audienceSizes = ['Under 1,000', '1K–5K', '5K–20K', '20K–50K', '50K+'];

const OperatorsApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: 'Prajwal',
    email: '',
    platformHandle: '',
    category: '',
    audienceSize: '',
    tools: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="application-form-section" id="application-form">
      <div className="container">
        <div className="how-eyebrow" style={{ textAlign: 'center' }}>Apply to join</div>
        <h2 className="cta-headline" style={{ textAlign: 'center' }}>Tell us about yourself.</h2>
        <p className="cta-sub" style={{ textAlign: 'center' }}>
          We read every application. If there's a potential fit, we'll reach out within 5 business days to schedule a conversation.
        </p>
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
                disabled={isSubmitting}
                placeholder="you@domain.com"
              />
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-group full-width">
              <label htmlFor="platformHandle" className="form-label">Primary platform + handle (e.g. LinkedIn — linkedin.com/in/yourname)</label>
              <input
                type="text"
                id="platformHandle"
                name="platformHandle"
                value={formData.platformHandle}
                onChange={handleChange}
                className="input"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="category" className="form-label">Your category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
                required
                disabled={isSubmitting}
              >
                <option value="">Select one</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="audienceSize" className="form-label">Approximate audience size</label>
              <select
                id="audienceSize"
                name="audienceSize"
                value={formData.audienceSize}
                onChange={handleChange}
                className="input"
                required
                disabled={isSubmitting}
              >
                <option value="">Select one</option>
                {audienceSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-group full-width">
              <label htmlFor="tools" className="form-label">Tools you currently use and have strong opinions about</label>
              <input
                type="text"
                id="tools"
                name="tools"
                value={formData.tools}
                onChange={handleChange}
                className="input"
                required
                disabled={isSubmitting}
                placeholder="e.g. Clay, Apollo, Notion, Linear, Cursor..."
              />
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-group full-width">
              <label htmlFor="motivation" className="form-label">Why do you want to work with field13?</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                className="input"
                rows="4"
                required
                disabled={isSubmitting}
                placeholder="What appeals to you about this kind of advocacy work? What do you want to get out of it?"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className={`btn-primary btn-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit application →'}
          </button>
          <p className="form-fine">
            We review every application personally. No automated rejections. If you don't hear from us within 7 days, feel free to follow up — sometimes things slip through.
          </p>
          {submitStatus === 'success' && (
            <p className="form-success">Thank you for your application! We'll review it and get back to you soon.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default OperatorsApplicationForm;
