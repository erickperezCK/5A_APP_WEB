import { CarCard } from "./CarCard";

export const CatalogPanel = ({ items }) => {
    console.log(items);

    return (
        <>
            {items.length ? (
                <div className="mx-auto p-6 -mt-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <p className="text-xl text-gray-500">No hay autos disponibles.</p>
                </div>
            )}
        </>
    );
};
