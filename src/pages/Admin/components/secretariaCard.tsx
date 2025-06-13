import Rating from "@mui/material/Rating";

interface SecretariaCardProps {
    title: string;
    description: string;
    funcionariosCount: number;
    chamadosData: {
        PENDENTE: number;
        EM_ANDAMENTO: number;
        CONCLUIDO: number;
        TOTAL: number;
    };
    media: number | null;
}

const SecretariaCard: React.FC<SecretariaCardProps> = ({ 
    title, 
    description, 
    funcionariosCount, 
    chamadosData,
    media
}) => {

    return (
        <div className="rounded-lg border bg-white shadow">
            <div className="p-4 pb-2 flex flex-row items-center border-b">
                <h3 className="text-lg font-medium">{title}</h3>
                {media !== null && (
                    <div className="flex items-center ml-2">
                        <Rating
                            name="media-rating"
                            value={media}
                            precision={0.1}
                            readOnly
                            size="small"
                        />
                        <span className="ml-1 text-sm text-gray-500">
                            ({media.toFixed(1)})
                        </span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="text-sm text-gray-500 mb-2">
                    {description}
                </div>
                <div className="flex items-center justify-between text-sm mb-1">
                    <div>
                        <p>Funcionários: <span className="font-medium">{funcionariosCount}</span>
                        </p>
                    </div>
                    <div>
                        <p>Chamados Total: <span className="font-medium">{chamadosData.TOTAL}</span>
                        </p>
                    </div>
                </div>
                <div className="text-sm mt-2 space-y-1">
                    <div className="flex ">
                        <p>
                            <span>Pendentes: </span>
                            <span className="font-medium">{chamadosData.PENDENTE}</span>
                        </p>
                    </div>
                    <div className="flex">
                        <p>
                            <span>Em andamento: </span>
                            <span className="font-medium">{chamadosData.EM_ANDAMENTO}</span>
                        </p>
                    </div>
                    <div className="flex ">
                        <p>
                            <span>Concluídos: </span>
                            <span className="font-medium">{chamadosData.CONCLUIDO}</span>
                        </p>         
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecretariaCard;