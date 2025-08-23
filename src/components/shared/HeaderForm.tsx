export function HeaderForm({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-md text-gray-500">{description}</p>
    </div>
  );
}
