export default function Inventario() {
  function Card({title, icon}:{title:string, icon:string}) {
    return (
      <div className="shadow-2 p-3 border border-surface-border rounded-xl">
        <div className="flex justify-between mb-3">
          <div>
            <span className="block text-2xl font-medium mb-3">{title}</span>
            <div className="text-900 font-medium text-xl">152</div>
          </div>
          <div className="flex items-center justify-center bg-blue-100 rounded-xl" style={{ width: "2.5rem", height: "2.5rem" }}>
            <i className={`${icon} text-blue-500 text-2xl`}></i>
          </div>
        </div>
        <span className="text-green-500 font-medium">24 new </span>
        <span className="text-500">since last visit</span>
      </div>
    );
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <Card title="Productos" icon="pi pi-box" />
        <Card title="Marcas" icon="pi pi-tag" />
        <Card title="Proveedores" icon="pi pi-truck" />
        <Card title="Pedidos Pendientes" icon="pi pi-file" />
      </div>
    </div>
  );
}
