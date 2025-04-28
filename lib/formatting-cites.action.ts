import { citationContent } from "@/types/citation";

// APA6 and APA7 (both usually same format for web sources)
export function formatAPA(data: citationContent): string {
  return `${data.author}. (${data.date}). *${data.title}*. ${data.source}. ${data.url}`;
}

// MLA
export function formatMLA(data: citationContent): string {
  return `${data.author}. "${data.title}." *${data.source}*, ${data.date}, ${data.url}`;
}

// NLM
export function formatNLM(data: citationContent): string {
  return `${data.author}. ${data.title}. ${data.source}. ${data.date}. Available from: ${data.url}`;
}

// IEEE
export function formatIEEE(data: citationContent): string {
  return `${data.author}, "${data.title}," ${data.source}, ${data.date}. [Online]. Available: ${data.url}`;
}

// Chicago
export function formatChicago(data: citationContent): string {
  return `${data.author}. "${data.title}." *${data.source}*. ${data.date}. ${data.url}`;
}

// Harvard (UK)
export function formatHarvard(data: citationContent): string {
  return `${data.author} (${data.date}) '${data.title}', *${data.source}*. ${data.url}`;
}

// Harvard-Australia
export function formatHarvardAustralia(data: citationContent): string {
  return `${data.author} ${data.date}, '${data.title}', *${data.source}*, viewed ${new Date().toLocaleDateString()}, <${data.url}>.`;
}

// Vancouver
export function formatVancouver(data: citationContent): string {
  return `${data.author}. ${data.title} [Internet]. ${data.source}; ${data.date} [cited ${new Date().toLocaleDateString()}]. Available from: ${data.url}`;
}
