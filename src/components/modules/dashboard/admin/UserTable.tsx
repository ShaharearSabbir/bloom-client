"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2 } from "lucide-react";
import { User, UserStatus } from "@/types/admin.type";
import { Meta } from "@/types/action.type";
import { toast } from "sonner";
import { updateUserStatus } from "@/actions/admin.action";

export default function UserTable({
  initialData,
  meta,
  currentPage,
}: {
  initialData: User[];
  meta: Meta;
  currentPage: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<User[]>(initialData);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setUsers(initialData);
  }, [initialData]);

  console.log(users);

  // Debounce Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const currentUrlSearch = searchParams.get("search") || "";
      if (searchTerm !== currentUrlSearch) {
        const params = new URLSearchParams(searchParams);
        searchTerm ? params.set("search", searchTerm) : params.delete("search");
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  const handleStatusChange = async (userId: string, newStatus: string) => {
    const validatedStatus = newStatus as unknown as UserStatus;

    const toastId = toast.loading("Updating user status...");

    const res = await updateUserStatus(userId, validatedStatus);

    if (res.error) toast.error(res.error.message, { id: toastId });

    toast.success("User status updated successfully!", { id: toastId });
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
        <Input
          placeholder="Search name or email..."
          className="pl-10 rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isPending && (
          <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-zinc-400" />
        )}
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-zinc-100 dark:border-zinc-800"
              >
                <TableCell>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === UserStatus.ACTIVE
                        ? "default"
                        : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select
                    disabled={isPending}
                    defaultValue={user.status.toString()}
                    onValueChange={(val) => handleStatusChange(user.id, val)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"ACTIVE"}>Active</SelectItem>
                      <SelectItem value={"INACTIVE"}>Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {meta?.totalPages || 1}
        </p>
        <div className="flex gap-2">
          <Button
            disabled={currentPage <= 1 || isPending}
            variant="outline"
            onClick={() => router.push(`${pathname}?page=${currentPage - 1}`)}
          >
            Previous
          </Button>
          <Button
            disabled={currentPage >= (meta?.totalPages || 1) || isPending}
            variant="outline"
            onClick={() => router.push(`${pathname}?page=${currentPage + 1}`)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
