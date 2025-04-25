import { useParams } from "react-router-dom";
import { getModels } from "../../../api/models.api";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/ui/Loading";
import { EditModelDialog } from "../../../components/ui/dialogs/edit/EditModelDialog";
import { ModelCard } from "../../../components/ui/ModelCard";

export const ModelsPage = () => {
    const { brand } = useParams();
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedModel, setSelectedModel] = useState(null);
    const [editOpen, setEditOpen] = useState(false);

    const fetchModels = async () => {
        try {
            const res = await getModels(brand);
            console.log(res.data);
            setModels(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);

    useEffect(() => {
        fetchModels();
    }, [setEditOpen]);

    const handleEdit = (model) => {
        setSelectedModel(model);
        setEditOpen(true);
    };

    const handleDelete = (model) => {
        setSelectedModel(model);
        setDeleteOpen(true);
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="p-10">
                    <h2 className="text-4xl font-bold mb-8 text-center">Modelos</h2>

                    {models.length === 0 ? (
                        <p className="text-center text-gray-500 text-lg mt-10">No hay modelos disponibles</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {models.map((model) => (
                                <ModelCard
                                    key={model.id}
                                    model={model}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
            <EditModelDialog
                open={editOpen}
                setOpen={setEditOpen}
                model={selectedModel}
            />
        </>
    );
};
