
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";

export function renderHTML(dirt) {
  const clean = DOMPurify.sanitize(dirt, { ALLOWED_TAGS: ['b', 'strong', 'br'] });
  return parse(clean);
}
