import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useProductRatings } from '../../../hooks/useProductRatings';
import ProductRatingsView from './ProductRatings.view';
import RatingForm from './RatingForm';

const ProductRatingsContainer = ({ productId }) => {

    

    const { isAuthenticated } = useAuth();

    const {
        ratings,
        userRating,
        loading,
        error,
        addRating,
        deleteRating, 
    } = useProductRatings(productId);

    const [editing, setEditing] = useState(false);

    const handleSubmit = async ({rating, comment}) => {
        try {
            await addRating(rating, comment);
        } finally {
            setEditing(false);
        }
    };

    const handleDeleteRating = async () => {
        console.log("Deleting rating...");
        await deleteRating();
    };

    const handleEdit = () => setEditing(true);
    const handleCancelEdit = () => setEditing(false);

    return (
        <ProductRatingsView
            ratings={ratings}
            myRating={userRating}
            editing={editing}
            loading={loading}
            error={error}
            canRate={isAuthenticated}
            RatingForm={RatingForm}
            onDeleteRating={handleDeleteRating}
            onEdit={handleEdit}
            onCancelEdit={handleCancelEdit}
            onSubmit={handleSubmit}
            isAuthenticated={isAuthenticated}
        />
    );
};

export default ProductRatingsContainer;