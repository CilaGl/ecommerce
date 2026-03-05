import PaymentStepView from "./PaymentStep.view";

const PaymentStepContainer = ({ 
    data, 
    errors = {}, 
    onChange, 
    onNext, 
    onPrevious 
}) => {

    const handleChange = (values) =>{
        onChange(values);
    };

    const handleSubmit = () => {
        onNext(); // 👈 reducer valida método y datos
    };

    return (
        <PaymentStepView 
            data={data}
            errors={errors}
            onChange={handleChange}
            onNext={handleSubmit}
            onPrev={onPrevious}
        />
    );

};
export default PaymentStepContainer;