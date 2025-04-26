export interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  cuentaBancaria: string;
  vendedor: string;
  telefonoVendedor: string;
}

export interface ProveedorSave {
  nombre: string;
  telefono: string;
  cuentaBancaria: string;
  vendedor: string;
  telefonoVendedor: string;
}

export interface ProveedorUpdate extends ProveedorSave {
  id: number;
}
