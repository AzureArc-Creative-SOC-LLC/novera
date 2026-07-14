// Renders schema.org structured data. Server component — the JSON is emitted in
// the initial HTML so crawlers see it without executing any JavaScript.

export default function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Payload is built from our own typed constants, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
