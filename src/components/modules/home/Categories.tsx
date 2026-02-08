export default function Categories() {
  const subjects = [
    "Mathematics",
    "Physics",
    "Computer Science",
    "Linguistics",
    "Economics",
    "Music",
  ];

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container px-4 mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center sm:text-left">
          Popular Subjects
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {subjects.map((s) => (
            <div
              key={s}
              className="p-6 bg-white dark:bg-zinc-800 rounded-2xl border hover:border-emerald-500 transition-colors cursor-pointer text-center"
            >
              <span className="font-medium text-sm">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
