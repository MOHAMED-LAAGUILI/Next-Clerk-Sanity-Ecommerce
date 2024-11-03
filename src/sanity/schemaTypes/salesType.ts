import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons'; // Use DocumentIcon as an alternative

export const salesType = defineType({
  name: 'sales',
  title: 'Sales',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    // Customer Name
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Customer Email
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    // Sale Date
    defineField({
      name: 'saleDate',
      title: 'Sale Date',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm:ss',
      },
      validation: (Rule) => Rule.required(),
    }),
    // Total Sale Amount
    defineField({
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    // Payment Status
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Paid', value: 'paid' },
          { title: 'Pending', value: 'pending' },
          { title: 'Failed', value: 'failed' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    // Products Sold
    defineField({
      name: 'products',
      title: 'Products Sold',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'products' }], // Reference to products type
            }),
            defineField({
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'totalAmount',
      media: 'products[0].product.image', // Adjust based on product structure
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `$${subtitle.toFixed(2)}` || 'No amount',
        media,
      };
    },
  },
});
