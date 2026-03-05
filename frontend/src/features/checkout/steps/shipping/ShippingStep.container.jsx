import ShippingStepView from "./ShippingStep.view";

const ShippingStepContainer = ({ shipping, errors = {}, onUpdateShipping, onNext }) => {
    const handleChange = (values) => {
        onUpdateShipping(values);
    };

    const handleSubmit = () => {
        onNext();  // 👈 el reducer valida antes de avanzar
    };  

    return (
        <ShippingStepView 
            data={shipping}
            errors={errors}
            onChange={handleChange}
            onNext={handleSubmit}
        />  
    );


};

export default ShippingStepContainer;