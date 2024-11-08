import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const orderType = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    // Order number
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
    // Stripe Payment ID
    defineField({
      name: 'stripePaymentId',
      title: 'Stripe Payment ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Stripe Customer ID
    defineField({
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Products (including an image field)
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'products' }], // Reference to the products type
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
            // Product image (new field added)
            defineField({
              name: 'productImage',
              title: 'Product Image',
              type: 'image',
              options: {
                hotspot: true, // Allows cropping and focusing on the image
              },
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    // Total Price
    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    // Currency
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'USD', value: 'usd' },
          { title: 'EUR', value: 'eur' },
          { title: 'GBP', value: 'gbp' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    // Discount
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    // Order Status
    defineField({
      name: 'orderStatus',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    // Order Date
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm:ss',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'orderStatus',
       // Reference the image field correctly
    },
    prepare({ title, subtitle }) {
    
      return {
        title,
        subtitle: subtitle || 'No status',
       
      };
    },
  },
  
});

