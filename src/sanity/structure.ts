import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Eshopr.eco')
    .items([
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('products').title('Products'),
      S.documentTypeListItem('sales').title('Sales'),
      S.documentTypeListItem('order').title('Order'),
  
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['category', 'products', 'sales', 'order'].includes(item.getId()!)
      ),
    ]);
