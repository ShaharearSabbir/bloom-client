import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/modules/dashboard/admin/CategoryForm";

export default function CreateCategoryPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/categories">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Category</h1>
          <p className="text-muted-foreground">
            Add a new subject category for Bloom tutors.
          </p>
        </div>
      </div>

      {/* Interactive Form Component */}
      <CategoryForm />
    </div>
  );
}
