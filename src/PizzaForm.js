import React, { useState, useEffect } from "react";
import * as Yup from 'yup';
import Schema from './Schema'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function PizzaForm(props) {
    const history = useHistory();
    const initialFormState = {
        name: '',
        size: '',
        pepperoni: false,
        sausage: false,
        ham: false,
        pineapple: false,
        special: ''
    };
    const initialFormErrors = {
        name: '',
        size: ''
    }
    const [form, setForm] = useState(initialFormState)
    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({initialFormErrors});

    const onChange = e => {
            validate(e)
            const { name, type, value, checked } = e.target
            const updatedInfo = type === 'checkbox' ? checked : value
            setForm({...form, [name]: updatedInfo })
    };

    const validate = e => {
            const { name, value } = e.target
            Yup.reach(Schema, name)
            .validate(value)
            .then(() => {
                setErrors({...errors, [name]: ''})
            })
            .catch(err => {
                setErrors({...errors, [name]: err.errors[0]})
            })
        setForm({...form, [name]: value})
    };

    useEffect(() => {
        Schema.isValid(form).then((valid) => {
            setButton(!valid)
        })
    }, [form]);

    
    const handleCheck = e => {
        setForm({...form, [e.target.name]: e.target.checked})
    }

    const onSubmit = e => {
        e.preventDefault()
        setForm(form)
        console.log(form)
        axios.post('https://reqres.in/api/orders', form) 
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error))
        props.setOrder(form)
        history.push('/Confirmed')
    };

    return (
        
        <form id='pizza-form' onSubmit={onSubmit}>
            <div>
                <h1>Pizza Order</h1>
                <label>
                    Name
                    <input 
                    id='name-input'
                    value={form.name}
                    onChange={onChange}
                    name='name'
                    type='text' />
                </label>
                <label>
                    <select 
                    id='size-dropdown'
                    name='size'
                    value={form.size}
                    onChange={onChange}>
                        <option>Select a size!</option>
                        <option value='s'>Small</option>
                        <option value='m'>Medium</option>
                        <option value='l'>Large</option>
                        <option value='xl'>X-Large</option>
                    </select>
                </label>
                <h2>Choose your toppings</h2>
                <label>
                    Pepperoni 
                    <input
                        id='pepperoni'
                        type='checkbox'
                        name='pepperoni'
                        checked={form.pepperoni===true}
                        onChange={handleCheck} />
                </label>
                <label>
                    Sausage 
                    <input
                        id='sausage'
                        type='checkbox'
                        name='sausage'
                        checked={form.sausage===true}
                        onChange={handleCheck} />
                </label>
                <label>
                    Ham 
                    <input
                        id='ham'
                        type='checkbox'
                        name='ham'
                        checked={form.ham===true}
                        onChange={handleCheck} />
                </label>
                <label>
                    Pineapple 
                    <input
                        id='pineapple'
                        type='checkbox'
                        name='pineapple'
                        checked={form.pineapple===true}
                        onChange={handleCheck} />
                </label>
            
            <h2>Special Instructions</h2>
                <textarea
                    id='special-text'
                    name='special'
                    value={form.special}
                    onChange={onChange}
                    placeholder='Any special instructions?' />
            <div>
                <button 
                    id='order-button'
                    type='submit' 
                    disabled={button}
                    >Add to Order</button>
            </div>
            </div>
            <div>
                <p>{errors.name}</p>
                <p>{errors.size}</p>
            </div>
        </form>
    )
}


