// src/components/modules/tutors/TutorFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/category.type";
import { use, useState, useEffect } from "react";
import { FilterData } from "@/types/tutor.type";
import { useDebouncedCallback } from "use-debounce";

function TutorFilters({
  filterDataPromise,
}: {
  filterDataPromise: Promise<{ data: FilterData | null; error: any }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterData = use(filterDataPromise);

  const categories = filterData.data?.categories || [];
  const limitMin = filterData.data?.priceRange.min ?? 0;
  const limitMax = filterData.data?.priceRange.max ?? 100;

  const [localRange, setLocalRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice")) || limitMin,
    Number(searchParams.get("maxPrice")) || limitMax,
  ]);

  useEffect(() => {
    setLocalRange([
      Number(searchParams.get("minPrice")) || limitMin,
      Number(searchParams.get("maxPrice")) || limitMax,
    ]);
  }, [searchParams, limitMin, limitMax]);

  const debouncedUpdateUrl = useDebouncedCallback(
    (min: number, max: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      params.set("minPrice", min.toString());
      params.set("maxPrice", max.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    400,
  );

  const handleSliderChange = (values: number[]) => {
    const [min, max] = values as [number, number];
    setLocalRange([min, max]);
    debouncedUpdateUrl(min, max);
  };

  const updateGeneralFilter = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (val) params.set(key, val);
    else params.delete(key);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-8 bg-white dark:bg-zinc-900 p-6 rounded-2xl border shadow-sm">
      {/* Sorting Section */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
          Sort By
        </h3>
        <RadioGroup
          value={searchParams.get("sortBy") || "newest"}
          onValueChange={(val) => updateGeneralFilter("sortBy", val)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="newest" id="newest" />
            <Label
              htmlFor="newest"
              className="text-sm font-medium cursor-pointer"
            >
              Newest
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price_asc" id="price_asc" />
            <Label
              htmlFor="price_asc"
              className="text-sm font-medium cursor-pointer"
            >
              Price: Low to High
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price_desc" id="price_desc" />
            <Label
              htmlFor="price_desc"
              className="text-sm font-medium cursor-pointer"
            >
              Price: High to Low
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Categories Section */}
      <div className="space-y-4 pt-6 border-t">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
            Categories
          </h3>
          {searchParams.get("category") && (
            <button
              onClick={() => updateGeneralFilter("category", "")}
              className="text-xs text-emerald-600 hover:underline font-medium"
            >
              Clear
            </button>
          )}
        </div>

        <RadioGroup
          value={searchParams.get("category") || ""}
          onValueChange={(val) => updateGeneralFilter("category", val)}
          className="space-y-3"
        >
          {categories.map((category: Category) => (
            <div
              key={category.categoryId}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem value={category.name} id={category.categoryId} />
              <Label
                htmlFor={category.categoryId}
                className="text-sm font-medium cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Price Range Section */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
          Price Range
        </h3>

        <div className="flex items-center gap-3">
          <div className="flex-1 space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground">
              Min
            </Label>
            <Input
              type="number"
              value={localRange[0]}
              onChange={(e) =>
                handleSliderChange([Number(e.target.value), localRange[1]])
              }
              className="h-8 px-2"
            />
          </div>
          <div className="mt-4 text-muted-foreground">-</div>
          <div className="flex-1 space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground">
              Max
            </Label>
            <Input
              type="number"
              value={localRange[1]}
              onChange={(e) =>
                handleSliderChange([localRange[0], Number(e.target.value)])
              }
              className="h-8 px-2"
            />
          </div>
        </div>

        <Slider
          key={`${limitMin}-${limitMax}`}
          value={localRange}
          min={limitMin}
          max={limitMax}
          step={1}
          onValueChange={handleSliderChange}
          className="py-4"
        />

        <div className="flex justify-between text-xs text-emerald-600 font-semibold">
          <span>${localRange[0]}</span>
          <span>${localRange[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default TutorFilters;
