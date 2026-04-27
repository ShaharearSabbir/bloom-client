// src/app/student/profile/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/actions/student.action";
import ProfileForm from "@/components/modules/dashboard/student/ProfileForm";
import { Student } from "@/types/student.type";

export default async function StudentProfilePage() {
  // Fetch data on the server
  const studentData = await getProfile();

  if (studentData.error) {
    console.log(studentData.error);
  }
  const student = studentData.data || {};

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card className="border-2 border-zinc-100 dark:border-zinc-800 shadow-xl rounded-[2rem] overflow-hidden">
        <CardContent className="p-8">
          <ProfileForm initialStudent={student as Student} />
        </CardContent>
      </Card>
    </div>
  );
}
