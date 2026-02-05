export default function ProfileHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold tracking-tight">Public Profile</h1>
      <p className="text-muted-foreground">
        This information is displayed to students on the Bloom marketplace.
      </p>
    </div>
  );
}
