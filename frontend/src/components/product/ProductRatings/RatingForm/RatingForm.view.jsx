import { Star } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { useState } from "react";

const RatingFormView = ({
    rating,
    comment,
    error,
    submitting,
    isEdit,
    canDelete,
    onDelete,
    onRatingChange,
    onCommentChange,
    onSubmit
}) => {
    const [hover, setHover] = useState(null);
    
    return (
        <form onSubmit={onSubmit} className="mt-6 border rounded-lg p-4">
            <h4 className="font-semibold mb-4">
                {isEdit ? "Edita tu reseña" : "Escribe tu reseña"} 
            </h4>

            {error && <p className="text-red-500 mb-3">{error}</p>}

             {/* Stars */}
             <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                    <Button
                        key={value}
                        type="button"
                        aria-label={`Calificar con ${value} estrellas`}
                        onClick={() => onRatingChange(value)}
                        
                    >
                        <Star 
                            className={`h-6 w-6 ${
                                value <= (hover  ?? rating ) 
                                ? "text-yellow-400" 
                                : "text-gray-300"
                            }`}
                            onMouseEnter={() => setHover(value)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </Button>
                ))}
                {rating === 0 && (
                    <p className="text-sm text-gray-500 mb-2">
                        Selecciona una calificación para continuar
                    </p>
                )}
             </div>

            {/* Comment */}
            <textarea
                disabled={submitting}
                value={comment}
                onChange={(e)=> onCommentChange(e.target.value)}
                rows={3}
                 placeholder="Escribe tu reseña (opcional)"
                className="w-full border rounded-md p-2 mb-4"
            />

            <Button 
                type="submit"
                disabled={submitting || rating === 0}
                className="w-full"
            >
                { submitting 
                    ? "Guardando..."
                    : isEdit
                        ? "Actualzar reseña"
                        : "Enviar reseña"
                }
                
            </Button>
            { canDelete && (
                <Button 
                    type="button"
                    variant="danger"
                    onClick={onDelete}
                    disabled={submitting}
                    className="w-full mt-3"
                    >
                    Eliminar mi reseña
                </Button>
            )}

        </form>
    );
};

export default RatingFormView;