// The host condition in netlify.toml limits this function to *.netlify.app.
export default async function noindexNetlify(_request, context) {
  const response = await context.next({ sendConditionalRequest: true });
  const result = new Response(response.body, response);
  // Preserve any existing directives, including page-specific restrictions.
  result.headers.append('X-Robots-Tag', 'noindex');
  return result;
}
