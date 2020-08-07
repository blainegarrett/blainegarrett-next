// Legacy V1 Runtime Shortcode parsers

type ParserRule = { match: string | RegExp; template: string };
let scheme: ParserRule[] = [
  { match: /<pre>/gi, template: '<pre class="language-javascript">' }, // Prism hack...
  {
    // Youtube
    match: /(\[youtube:https?:\/\/www\.youtube\.com\/watch\?v=)([^\]]+)(])/gi,
    template:
      '<div class="videoWrapper"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/$2" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>',
  },
];

const parser = (content: string): string => {
  if (!content) {
    return '';
  }

  // Do Replacements based on scheme rules
  let rule: ParserRule;
  for (let i = 0; i < scheme.length; i++) {
    rule = scheme[i];
    content = content.replace(rule.match, rule.template);
  }

  return content;
};

export default parser;
