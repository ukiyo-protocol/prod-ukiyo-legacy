import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: '9ixazqk6', // Find this in your Sanity dashboard
  dataset: 'production', // Use the correct dataset name
  useCdn: true, // Use the CDN for faster queries
});
