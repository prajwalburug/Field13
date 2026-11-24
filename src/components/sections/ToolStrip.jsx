const tools = ['Claude', 'LangGraph', 'LangChain', 'OpenAI', 'Gemini', 'treg', 'Zernio', 'HubSpot', 'Clay', 'Seedance', 'Langfuse', 'Nebius'];

const ToolStrip = () => {
  return (
    <section className="tool-strip" aria-label="Frameworks and platforms we build on">
      <div className="container tool-strip-inner">
        <span className="tool-strip-label">Built on</span>
        <ul className="tool-strip-list">
          {tools.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
    </section>
  );
};

export default ToolStrip;
