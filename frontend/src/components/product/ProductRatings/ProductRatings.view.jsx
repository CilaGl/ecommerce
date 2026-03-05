import { Star, Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";

const ProductRatingsView = ({
    ratings,
    myRating,
    editing,
    loading,
    error,
    canRate,
    RatingForm,
    onDeleteRating,
    onEdit,
    onCancelEdit,
    onSubmit,
    isAuthenticated,
}) => {

    const canCreateRating = canRate && !myRating && !editing;
    const canEditRating = myRating && !editing;

    if(loading) {
        return <div className="py-6"> Cargando reseñas...</div>
    }

    if(error) {
        return <div className="py-6 text-red-600"> Error al cargar reseñas: {error} </div>
    }

    return (
        <section className="mt-12 border-t pt-8">
            <h3 className="text-xl font-bold mb-6">
                Reseñas ({ratings.length})
            </h3>

            {/* 🚫 No hay sesión */}
            {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-6">
                <p className="text-yellow-800 text-sm">
                    Inicia sesión para dejar tu reseña
                </p>
                </div>
            )}

            {ratings.length === 0 && (
                <p className="text-gray-500">
                    Este producto aún no tiene reseñas. Sé el primero en calificarlo.
                </p>
            )}

             {/* ⭐ TU RESEÑA */}
             {canEditRating && (
                <div className="border-2 border-gray-800 bg-gray-50 rounded-lg p-4 mb-6 w-4/12">
                    <p className="font-semibold mb-1">Tu reseña</p>
                    <p className="text-sm mb-2">⭐ {myRating.rating}</p>
                    <p className="text-gray-700 mb-3">{myRating.comment}</p>

                    <Button 
                        onClick={onEdit}
                        className="text-blue-600 text-sm hover:underline"
                    >
                        Editar reseña
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onDeleteRating}
                        className="ml-4 text-red-600 text-sm hover:underline"
                    >
                        Eliminar reseña
                    </Button>
                    <p className="text-xs text-gray-500 mt-3">
                        Puedes editar o eliminar tu reseña cuando quieras.
                    </p>
                </div>
                
             )}

              {/* ✏️ FORMULARIO DE EDICIÓN */}
                {editing && (
                <RatingForm
                    initialValues={myRating} // o null
                    onSubmit={onSubmit}
                    onCancel={onCancelEdit}
                    onDelete={canEditRating ? onDeleteRating : null}
                />
                )}
            <div className="space-y-4">
                <ul className="space-y-6">
                    {ratings
                    .filter((r)=> r.id !== myRating?.id)
                    .map((rating) => (
                        <li key={rating.id} className="border p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={rating.user?.avatar}
                                        alt={rating.user?.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="font-semibold">{rating.user?.name}</span>
                                </div>

                                <div className="flex items-center"> 
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 transition-colors duration-150 ${
                                                i < rating.rating ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                            fill={i < rating.rating ? "currentColor" : "none"}
                                        />
                                    ))}
                                </div>
                            </div>

                            { rating.comment && (
                                <p className="mt-3 text-gray-700">
                                    {rating.comment}
                                </p>
                            )}

                            { canRate && (
                                <Button
                                    onClick={onDeleteRating}
                                    className="mt-3 text-gray-700"
                                    variant="danger"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Eliminar mi reseña
                                </Button>
                            )}
                        </li>
                    ))}     
                </ul>
            </div>

            {  canCreateRating && (
                 <RatingForm 
                    initialValues={null} // o null
                    onSubmit={onSubmit}
                    onCancel={onCancelEdit}
                    onDelete={null}
                 />
            )}

                
        </section>
    );

};

export default ProductRatingsView;