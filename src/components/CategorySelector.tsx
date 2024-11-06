"use client"
import React, { useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';  // Import the required icons
import { Category } from '../../sanity.types';
import { Button } from "@/components/ui/button";  // Assuming this is your custom Button component
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";  // Shadcn Popover components
import Link from 'next/link';  // Importing Link from Next.js

interface CategorySelectorProps {
  categories: Category[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [isClient, setIsClient] = useState(false);  // Add state to check if we are on the client

  // Set isClient to true when the component mounts (client-side rendering)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle category search and selection via Enter key
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const selectedCategory = categories.find((category) =>
        category.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      );
      if (selectedCategory?.slug?.current) {
        setValue(selectedCategory._id);  // Set the selected category ID
        setOpen(false);  // Close the Popover after selection
      }
    }
  };

  // Don't render anything until we know we are on the client side
  if (!isClient) {
    return null; // Or a loading state, depending on your needs
  }

  return (
    <div className="flex flex-col items-center">
      <section className="w-full mb-16 text-center">
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight">
          Categories
        </h1>

        {/* Category Selector Popover */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {value
                ? categories.find((category) => category._id === value)?.title
                : "Select category..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput
                placeholder="Search category..."
                className="h-9"
                onKeyDown={handleSearchKeyDown}  // Call the search handler on Enter key press
              />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <Link key={category._id} href={`/categories/${category?.slug?.current}`} passHref>
                      <CommandItem
                        value={category._id}
                        onSelect={() => {
                          setValue(category._id);
                          setOpen(false);  // Close the Popover after selection
                        }}
                      >
                        {category.title}
                        <Check
                          className={`ml-auto ${value === category._id ? "opacity-100" : "opacity-0"}`}
                        />
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
      </section>
    </div>
  );
}

export default CategorySelector;