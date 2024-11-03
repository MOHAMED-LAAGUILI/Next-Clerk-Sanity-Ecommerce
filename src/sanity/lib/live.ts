import 'server-only';
import { defineLive } from 'next-sanity';
import { client } from './client';
import { error } from 'console';

 // set your viewer token 
 const token = process.env.SANITY_API_READ_TOKEN;

 if (!token) {
    throw new Error("Missing SANITY_API_READ_TOKEN")
 }

 export const {sanityFetch, SanityLive} = defineLive({
    client,
    serverToken: token,
    browserToken: token,
fetchOptions:{
    revalidate:0,
}
 });