import {useState, useEffect } from 'react';
import RatingFormView from './RatingForm.view';

const RatingFormContainer = ({ initialValues, onSubmit, onCancel, onDelete }) => {
    const [rating, setRating] = useState(initialValues?.rating ?? 0);
    const [comment, setComment] = useState(initialValues?.comment ?? '');

    useEffect(() => {
        setRating(initialValues?.rating ?? 0);
        setComment(initialValues?.comment ?? '');
    }, [initialValues]);

    const isEdit = Boolean(initialValues);
    const canDelete = Boolean(initialValues && onDelete);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(rating < 1 || rating > 5) {
            setError('Seleccione una calificación entre 1 y 5.');
            return;
        }

        try{

            setSubmitting(true);
            setError(null);

            await onSubmit({ rating, comment });

            // Reset form
            if(!initialValues){
                setRating(0);
                setComment('');
            }

        }catch(err){
            setError(err.message || "Error al enviar reseña. Inténtelo de nuevo.");
        } finally{
            setSubmitting(false);
        }
    };

    return (
        <RatingFormView
            rating={rating}
            comment={comment}
            error={error}
            submitting={submitting}
            isEdit={isEdit}
            canDelete={canDelete}
            onDelete={onDelete}
            onRatingChange={setRating}
            onCommentChange={setComment}
            onSubmit={handleSubmit}
            />
    );
};

export default RatingFormContainer;