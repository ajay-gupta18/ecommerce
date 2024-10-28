import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';

const AddProduct = () => {
  
    const [inputValues, setInputValues] = useState({
        id: "",
        title: "",
        description: "",
        category: "",
        price: "",
        rating: "",
        image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"
    });
    const [errors, setErrors] = useState({});
    const { addProduct } = useContext(DataContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        let formIsValid = true;
        const newErrors = {};

        Object.keys(inputValues).forEach((key) => {
            if (!inputValues[key].trim()) {
                newErrors[key] = 'This field is required.';
                formIsValid = false;
            }
        });

        setErrors(newErrors);

        if (formIsValid) {
            console.log("Form submitted:", inputValues);
            addProduct(inputValues)
            setInputValues({ id: "", title: "", description: "", category: "", price: "", rating: "", image: "" });

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));


        if (value.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ""
            }));
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label htmlFor="id">Id</label>
                    <input type="number" name="id" value={inputValues.id} onChange={handleChange} id="id" />
                    {errors.id && <p>{errors.id}</p>}
                </div>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={inputValues.title} onChange={handleChange} id="title" />
                    {errors.title && <p>{errors.title}</p>}
                </div>
                <div className="input-field">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" value={inputValues.description} onChange={handleChange} id="description" />
                    {errors.description && <p>{errors.description}</p>}
                </div>
                <div className="input-field">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" value={inputValues.price} onChange={handleChange} id="price" />
                    {errors.price && <p>{errors.price}</p>}
                </div>
                <div className="input-field">
                    <label htmlFor="category">Category</label>
                    <select name="category" value={inputValues.category} onChange={handleChange}>
                        <option value="">--select--</option>
                        <option value="men's clothing">Men's clothing</option>
                        <option value="women's clothing">Women's clothing</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="electronics">Electronics</option>
                    </select>
                    {errors.category && <p>{errors.category}</p>}
                </div>
                <div className="input-field">
                    <label htmlFor="rating">Rating</label>
                    <input type="number" max={5} min={0} name="rating" value={inputValues.rating} onChange={handleChange} id="rating" />
                    {errors.rating && <p>{errors.rating}</p>}
                </div>
                <button className="submit-button" type="submit">Add product</button>
            </form>
        </div>
    );
};

export default AddProduct;
