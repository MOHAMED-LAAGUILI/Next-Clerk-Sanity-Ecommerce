// this is a server component thats why we didnt add use client
export default function SearchPage({ searchParams }: 
  { searchParams: { query: string; } }) {

  const { query } = searchParams;

  return (
    <>
      Search: {query}
    </>
  );
}
