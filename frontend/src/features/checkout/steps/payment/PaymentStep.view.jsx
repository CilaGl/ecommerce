import Button from "../../../../components/ui/Button";

const PaymentStepView = ({ data, errors = {}, onChange, onNext, onPrev  }) => {
    console.log("PaymentStepView renderizado con data: ", data);
    const handleChange = (e) =>{
        const { name, value } = e.target;
        console.log("Input change:", name, value);
        onChange({[name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(); // 👈 reducer valida método y datos
    };

    const formatCardNumber = (value) => {
        return value
            .replace(/\D/g, "")          // solo números
            .slice(0, 16)                // máximo 16 dígitos
            .replace(/(.{4})/g, "$1 ")   // espacio cada 4
            .trim();
    };

    const formatExpiry = (value) => {
        const numbers = value.replace(/\D/g, "").slice(0, 4);

        if (numbers.length <= 2) return numbers;
        return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    };

    const cleanCardNumber = (value) => value.replace(/\s/g, ""); // quitar espacios para almacenar

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold">
                Método de pago
            </h2>

             {/* MÉTODO */}
             <div className="space-y-3">
                <label className="flex items-center gap-3">
                    <input 
                        type="radio"
                        name="method"
                        value="card"
                        checked={data.method === "card"}
                        onChange={handleChange}
                    />
                    <span>Tarjeta de crédito </span>
                </label>
                <label className="flex items-center gap-3">
                    <input 
                        type="radio"
                        name="method"
                        value="paypal"
                        checked={data.method === "paypal"}
                        onChange={handleChange}
                    />
                    <span>PayPal</span>
                </label>
            </div>

                {/* TARJETA */}
                {data.method === "card" && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Número de tarjeta
                            </label>
                            <input 
                                type="text"
                                name="cardNumber"
                                placeholder="4242 4242 4242 4242"
                                value={formatCardNumber(data.cardNumber || "")}
                                onChange={(e) =>
                                        onChange({
                                        cardNumber: cleanCardNumber(e.target.value),
                                        })
                                            }
                                className={`w-full border rounded-md p-2 ${
                                        errors.cardNumber ? "border-red-500" : ""
                                 }`}
                            />
                            {errors.cardNumber && (
                                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Fecha de expiración
                                </label>
                                <input 
                                    type="text"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={formatExpiry(data.expiry || "")}
                                            onChange={(e) =>
                                                onChange({
                                                expiry: e.target.value.replace(/\D/g, "").slice(0, 4),
                                                })
                                            }
                                    className="w-full border rounded-md p-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    CVC
                                </label>
                                <input 
                                    type="password"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={data.cvv || ""}
                                    onChange={handleChange}
                                    className="w-full border rounded-md p-2"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* PAYPAL */}

                {data.method === "paypal" && (
                    <div className="bg-gray-50 border rounded-md p-4 text-sm text-gray-700">
                        Al continuar, serás redirigida a PayPal para completar tu pago
                        de forma segura.
                    </div>
                )}

                 {/* ACTIONS */}
                <div className="flex justify-between pt-6">
                    <Button type="button" variant="outline" onClick={onPrev}>
                        Regresar
                    </Button>
                    <Button type="submit">
                        Continuar
                    </Button>

            </div>

        </form>
    );
};

export default PaymentStepView;