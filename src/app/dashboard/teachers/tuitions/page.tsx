import MyTuitionsList, {
  TuitionItem,
} from "@/components/SheareDashboard/SheareTeacher/My-Tuition";

export default async function TeacherTuitionsPage() {
  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  let tuitions: TuitionItem[] = [];

  try {
    const res = await fetch(`${backendUrl}/Tuitions`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      tuitions = Array.isArray(data) ? data : data?.tuitions || [];
    }
  } catch (error) {
    console.error("Failed to fetch tuitions:", error);
  }

  return (
    <div className="py-2">
      <MyTuitionsList initialTuitions={tuitions} />
    </div>
  );
}