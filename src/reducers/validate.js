const validate = (values) => {
    console.log("Enter validate function");
    const errors = { name: 'default message'};

    if(!values.amount) {
        errors.amount = "Amount is mandatory";
    }

    return errors;
};

export default validate