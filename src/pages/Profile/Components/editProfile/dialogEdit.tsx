import { AuthContext } from '@/contexts/AuthContext';
import * as Dialog from '@radix-ui/react-dialog'
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface DialogEditProps {
    onClose?: () => void;
}

const DialogEdit = ({ onClose }: DialogEditProps) => {
    const { updateInfo } = useContext(AuthContext)
    const createEditSchema = z.object({
        name: z.string().optional().refine((val) => !val || val.trim() !== "", {
          message: "Nome inválido.",
        }),
        birthDate: z
          .string()
          .optional()
          .refine((dateStr) => {
            if (!dateStr) return true; // Optional, so skip if not provided
            const birth = new Date(dateStr);
            const today = new Date();
            const age = today.getFullYear() - birth.getFullYear();
            const isBirthdayPassed = today.getMonth() > birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
            return age > 18 || (age === 18 && isBirthdayPassed);
          }, {
            message: "Você precisa ter mais de 18 anos.",
          })
      });
      

    type editProfileData = z.infer<typeof createEditSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<editProfileData>({
        resolver: async (data) => {
            try {
                createEditSchema.parse(data);
                return { values: data, errors: {} };
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const fieldErrors = error.flatten().fieldErrors;
                    return { values: {}, errors: fieldErrors };
                }
                return { values: {}, errors: {} };
            }
        },
    });

    const onSubmit = async (data: editProfileData) => {
    if (data.name && data.name.trim().length < 3) {
        toast.error('O nome deve ter pelo menos 3 caracteres.');
        return;
    }
    if (!data.name && !data.birthDate) {
            toast.error('Preencha pelo menos um campo para atualizar o perfil.');
            return;
        }
        toast.promise(
            async () => {
                try {
                    await updateInfo(data);                    
                } catch (error) {
                    console.error(error);
                    throw new Error('Erro ao atualizar perfil');
                }
            },
            {
                loading: 'Salvando...',
                success: () => {
                    onClose?.();
                    return 'Perfil atualizado com sucesso!';
                },
                error: (error) => {
                    console.error(error);
                    return 'Erro ao atualizar perfil. Tente novamente.';
                }
            }
        )
    }

    return (
        <Dialog.Root open>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                <Dialog.Content 
                    className="fixed inset-0 flex items-center justify-center z-50"
                    onPointerDownOutside={(e) => e.preventDefault()}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 relative">
                        <header className="mb-4">
                            <Dialog.Title className="text-xl font-bold font-montserrat text-[--cor-primaria]">
                                Editar Perfil
                            </Dialog.Title>
                        </header>
                        <div className="py-4 font-lato">
                            <form 
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit(onSubmit)(e);
                                }} 
                                className="space-y-4"
                            >
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="name">
                                        Nome
                                    </label>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        id="name"
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholder="Digite seu nome"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>
                                <div className="mb-6 relative">
                                    <label className="block text-sm font-medium mb-2" htmlFor="birthDate">
                                        Data de Nascimento
                                    </label>
                                    <input
                                    {...register('birthDate')} // tira o valueAsDate
                                    type="date"
                                    id="birthDate"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    />
                                    {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>}
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    
                                        <button
                                            type="button"
                                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                                            onClick={onClose}
                                        >
                                            Cancelar
                                        </button>
                                    
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded relative z-10"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default DialogEdit