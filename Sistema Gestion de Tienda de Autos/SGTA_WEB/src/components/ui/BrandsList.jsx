import { useState, useEffect } from "react";
import { getBrands } from "../../api/brand.api";
import { BrandCard } from "../../components/ui/BrandCard";
import { EditBrandDialog} from "../../components/ui/dialogs/edit/EditBrandDialog"
import { Loading } from "../../components/ui/Loading";

export const BrandsList = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [editOpen, setEditOpen] = useState(false);

    const fetchBrands = async () => {
        try {
            const res = await getBrands();
            setBrands(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, [editOpen]);

    const handleEdit = (brand) => {
        setSelectedBrand(brand);
        setEditOpen(true);
    };

    return (
        <div className="p-10">
            <h2 className="text-4xl font-bold mb-8 text-center">Marcas</h2>

            {loading ? (
                <Loading />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {brands.map((brand) => (
                        <BrandCard key={brand.id} brand={brand} onEdit={handleEdit} />
                    ))}
                </div>
            )}

            <EditBrandDialog
                open={editOpen}
                setOpen={setEditOpen}
                brand={selectedBrand}
            />
        </div>
    );
};
