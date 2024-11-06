import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Eshopr.eco')
    .items([
      S.documentTypeListItem('category').title('Categories'),
      
      // Ensure 'products' is only added once
      S.documentTypeListItem('products').title('Products'),
      S.documentTypeListItem('sales').title('Sales'),

      // Filter out 'category' and 'products' from the list of document types
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['category', 'products', 'sales'].includes(item.getId()!)
      ),
    ]);
