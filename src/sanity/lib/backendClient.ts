import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for read operations; set to false for server-side operations
//token: process.env.SANITY_API_TOKEN,
//token: process.env.SANITY_API_READ_TOKEN,
token: process.env.SANITY_API_EDITOR_TOKEN,

});
