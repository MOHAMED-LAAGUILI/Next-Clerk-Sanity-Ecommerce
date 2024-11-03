import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { categoryType } from './categoryType';

export const productType = defineType({
  name: 'products',
  title: 'Products',
  type: 'document',
  icon: TrolleyIcon,
  fields: [
    // Product Name
    defineField({
      name: "name",
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    // Slug
    defineField({
      name: "slug",
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name', // Auto-generate slug from the name
        maxLength: 96, // Max length of the slug
      },
      validation: (Rule) => Rule.required(),
    }),
    // Image
    defineField({
      name: "image",
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true, // Enable hotspot for cropping
      },
      validation: (Rule) => Rule.required(),
    }),
    // Description
    defineField({
      name: "description",
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    // Price
    defineField({
      name: "price",
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    // Category Reference
    defineField({
      name: "categories",
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }], // Reference to 'category'
      validation: (Rule) => Rule.required(),
    }),
    // Stock
    defineField({
      name: "stock",
      title: 'Stock',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      price: 'price',
    },
    prepare({ title, media, price }) {
      return {
        title,
        media,
        subtitle: price ? `$${price.toFixed(2)}` : 'No price',
      };
    },
  },
});
