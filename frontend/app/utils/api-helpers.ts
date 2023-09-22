// TODO: HOW TO GET STRAPI URL FROM ENV
export function getStrapiURL(path = '') {
  return `http://localhost:1337${path}`;
}

// export function getStrapiURL(path = '') {
//   return `${global.ENV.STRAPI_API_URL || 'http://localhost:1337'}${path}`;
// }

export function getStrapiMedia(url: string | null) {
  if (url == null) {
      return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith('http') || url.startsWith('//')) {
      return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time: number) => new Promise((resolve) => setTimeout(() => resolve(1), time));