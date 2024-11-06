import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons'; // Use DocumentIcon as an alternative

export const salesType = defineType({
  name: 'sales',
  title: 'Sales',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    // Sale Title
    defineField({
      name: 'saleTitle',
      title: 'Sale Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100), // Ensure sale title is required and limited in length
    }),

    // Sale Description
    defineField({
      name: 'saleDescription',
      title: 'Sale Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(500), // Limit description length
    }),

    // Discount Amount (percentage or flat value)
    defineField({
      name: 'discountAmount',
      title: 'Discount Amount',
      type: 'number',
      validation: (Rule) => Rule.required().min(0), // Make sure discount is a positive value
    }),

    // Coupon Code
    defineField({
      name: 'couponCode',
      title: 'Coupon Code',
      type: 'string',
      validation: (Rule) => Rule.required().max(50), // Ensure the coupon code is required and reasonably short
    }),

    // Valid From (Date when the sale starts)
    defineField({
      name: 'validFrom',
      title: 'Valid From',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm:ss',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Valid To (Date when the sale ends)
    defineField({
      name: 'validTo',
      title: 'Valid To',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm:ss',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Is Active (Boolean to toggle sale status)
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true, // Default to true, so the sale is active by default
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'saleTitle', // Show sale title in the preview
      subtitle: 'discountAmount', // Show discount amount in the subtitle
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Sale',
        subtitle: `${subtitle}% off` || 'No discount',
      };
    },
  },
});
