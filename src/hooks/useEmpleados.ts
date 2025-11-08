import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EmpleadoRepositoryImpl } from "@/infra/repositories/EmpleadoRepositoryImpl";
import { EmpleadosUseCases } from "@/domain/usecases/EmpleadosUseCases";
import { EmpleadoSave, EmpleadoUpdate } from "@/domain/entities/Empleado";

const empleadosUseCases = new EmpleadosUseCases(new EmpleadoRepositoryImpl());

export function useGetEmpleadosQuery() {
  const empleados = useQuery({
    queryKey: ["empleados"],
    queryFn: () => empleadosUseCases.getEmpleados(),
  });

  return { ...empleados, empleados: empleados.data, isLoadingEmpleados: empleados.isLoading };
}

export function useGuardarEmpleadoMutation() {
  const queryClient = useQueryClient();
  const mutacion = useMutation({
    mutationFn: (empleado: EmpleadoSave) => empleadosUseCases.guardar(empleado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empleados"] });
    },
  });

  return { ...mutacion };
}

export function useEditarEmpleadoMutation() {
  const queryClient = useQueryClient();
  const mutacion = useMutation({
    mutationFn: (empleado: EmpleadoUpdate) => empleadosUseCases.editar(empleado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empleados"] });
    },
  });

  return { ...mutacion };
}
