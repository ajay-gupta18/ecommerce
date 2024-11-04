import React, { useContext, useEffect, useId, useRef, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import { useNavigate, useParams } from 'react-router-dom';


const AddProduct = () => {
    const { id } = useParams();
    const uniqueId = useId();
    const navigate = useNavigate();
    const { data, addProduct, editProduct } = useContext(DataContext);

    const [inputValues, setInputValues] = useState({
        id: uniqueId,
        title: "",
        description: "",
        category: "",
        price: "",
        rating: "",
        image: ""
    });
    const [errors, setErrors] = useState({});
    const [imagePreview,setImagePreview] = useState(null)

    const titleRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const ratingRef = useRef();
    const refs = [titleRef, descriptionRef, categoryRef, priceRef, ratingRef];

    useEffect(() => {
        if (id) {
            const productToEdit = data.find(product => product.id === id);
            if (productToEdit) {
                setInputValues(productToEdit);
                setImagePreview(productToEdit.image);
            }
        }
    }, [id, data]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let formIsValid = true;
        const newErrors = {};

        Object.keys(inputValues).forEach((key) => {
            if (!inputValues[key].trim() && key !== 'image') {
                newErrors[key] = 'This field is required.';
                formIsValid = false;
            }
        });

        setErrors(newErrors);

        if (formIsValid) {
            const titleExists = data.some(product => product.title === inputValues.title && product.id !== id);
            if (titleExists) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    title: 'This title already exists. Please enter a different title.'
                }));
                return;
            }

            if (id) {
                editProduct(inputValues, id);
            } else {
                addProduct(inputValues);
                setInputValues({ id: uniqueId, title: "", description: "", category: "", price: "", rating: "", image: "" });
            }

            navigate('/');
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image' && files[0]) {
            const file = files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setInputValues((prevValues) => ({
                    ...prevValues,
                    [name]: reader.result
                }));
                setImagePreview(reader.result)
            };
            reader.readAsDataURL(file);
        } else {
            setInputValues((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
        }

        if (value.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: ""
            }));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (index < refs.length - 1) {
                refs[index + 1].current.focus();
            }
        }
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" ref={titleRef} name="title" value={inputValues.title} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 0)} id="title" />
                    <div className="error-container">
                        {errors.title && <p className='error'>{errors.title}</p>}
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" value={inputValues.description} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 1)}></textarea>
                    <div className="error-container">
                        {errors.description && <p className='error'>{errors.description}</p>}
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="price">Price</label>
                    <input type="number" min={0} ref={priceRef} name="price" value={inputValues.price} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 2)} id="price" />
                    <div className="error-container">
                        {errors.price && <p className='error'>{errors.price}</p>}
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="category">Category</label>
                    <select name="category" ref={categoryRef} value={inputValues.category} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 3)}>
                        <option value="">--select--</option>
                        <option value="men's clothing">Men's clothing</option>
                        <option value="women's clothing">Women's clothing</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="electronics">Electronics</option>
                    </select>
                    <div className="error-container">
                        {errors.category && <p className='error'>{errors.category}</p>}
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="rating">Rating</label>
                    <input type="number" ref={ratingRef} max={5} min={0} name="rating" value={inputValues.rating} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, 4)} id="rating" />
                    <div className="error-container">
                        {errors.rating && <p className='error'>{errors.rating}</p>}
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="image">Image</label>
                    {imagePreview && <img src={imagePreview} alt='product preview' style={{ maxWidth: '30%', marginBottom: '10px' }} onChange={handleChange}/>}
                    <input type="file" name="image" onChange={handleChange} id="image" />
                    <div className="error-container">
                        {errors.image && <p className='error'>{errors.image}</p>}
                    </div>
                </div>
                <button className="submit-button" type="submit">{id ? "Update Product" : "Add Product"}</button>
            </form>
        </div>
    );
};

export default AddProduct;
