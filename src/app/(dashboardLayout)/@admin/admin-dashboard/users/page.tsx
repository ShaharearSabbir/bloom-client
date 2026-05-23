// app/admin/users/page.tsx
import { getAllUsers } from "@/actions/admin.action";
import UserTable from "@/components/modules/dashboard/admin/UserTable";
import { Meta } from "@/types/action.type";
import { User } from "@/types/admin.type";

export default async function AdminUserPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;

  const page = isNaN(Number(params.page)) ? Number(params.page) : 1;
  const search = params.search || "";

  const data = await getAllUsers({ page, limit: 10, search });

  if (!data) return null;

  console.log("AdminUserPage data", data.data);
  console.log("AdminUserPage meta", data.meta);

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-black">User Management</h1>
      {/* data.data and data.meta are now fully typed */}
      <UserTable
        initialData={data.data as unknown as User[]}
        meta={data.meta as Meta}
        currentPage={page}
      />
    </div>
  );
}
