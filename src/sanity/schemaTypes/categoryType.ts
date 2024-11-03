import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category', // Ensure this matches the reference in productType
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current', // Use the current slug for the subtitle
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : 'No slug',
      };
    },
  },
});
