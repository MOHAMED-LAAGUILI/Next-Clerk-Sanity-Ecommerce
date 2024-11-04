// lib/imageBuilder.ts
import imageUrlBuilder from '@sanity/image-url';
import { client } from "@/sanity/lib/client"; // Adjust the path according to your project structure
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

export const imageUrl = (source: SanityImageSource) => {
    return builder.image(source);
};
