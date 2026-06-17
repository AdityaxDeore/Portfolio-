import { Highlight } from "@/components/ui/highlight";

export function HighlightShowcase() {
  return (
    <section className="py-12 bg-transparent flex items-center justify-center w-full">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground font-heading">Achievements in Highlight</h2>
          <p className="text-sm text-muted-foreground mt-2 font-sans">
            Key takeaways from the software architectures and intelligence systems I've shipped.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border/40 p-8 shadow-sm">
          <article className="text-[15px] leading-[1.75] text-muted-foreground font-sans">
            <p className="mb-[1.1em]">
              <Highlight color="red">
                Three core projects shipped
              </Highlight>
              , each bridging full-stack execution with AI-powered capabilities—from real-time proctored compilers to MRI tumor diagnostics.
            </p>

            <p className="mb-[1.1em]">
              <Highlight color="purple">
                CodeCampus handles assessment integrity.
              </Highlight>
              {" "}
              It gives students a browser-based coding console with proctoring features, backed by Node.js and MongoDB.
            </p>

            <p>
              <Highlight color="green">
                Clarity runs machine learning predictions.
              </Highlight>
              {" "}
              Using neural networks, it performs sentiment analysis to map mood trends and personalize resources.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
