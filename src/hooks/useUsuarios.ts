import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UsuariosRepositoryImpl } from "../infra/repositories/UsuariosRepositoryImpl";
import { UsuariosUseCases } from "@/domain/usecases/UsuariosUseCases";
import { UsuarioSave, UsuarioUpdate } from "@/domain/entities/Usuario";

const usuariosRepository = new UsuariosRepositoryImpl();
const usuariosUseCases = new UsuariosUseCases(usuariosRepository);

export function useGetUsuariosQuery() {
  const usuarios = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => usuariosUseCases.getAll(),
  });

  return { ...usuarios, usuarios: usuarios.data };
}

export function useGuardarUsuarioMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (usuario: UsuarioSave) => usuariosUseCases.save(usuario),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return { ...mutation };
}

export function useActualizarUsuarioMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (usuario: UsuarioUpdate) => usuariosUseCases.update(usuario),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return { ...mutation };
}

export function useEliminarUsuarioMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => usuariosUseCases.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return { ...mutation };
}