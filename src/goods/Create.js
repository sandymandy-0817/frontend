import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create(props) {
    const [form, setForm ] = useState({
        g_name:'',
        g_cost:''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/goods', form)
            .then(()=>{
                alert('상품이 등록 되었습니다');
                navigate('/goods');
            })
            .catch(err=>console.log(err));
    }

    return (
        <div>
            <h2>goods 상품 추가</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>상품명 : </label>
                    <input name='g_name' value={form.g_name} onChange={handleChange} required />
                </p>

                <p>
                    <label>가격 : </label>
                    <input type='number' name='g_cost' value={form.g_cost} onChange={handleChange} required/>
                </p>
                <button type='submit'>신규 상품 등록하기</button>
            </form>
        </div>
    );
}

export default Create;<h2>goods 상품 추가</h2>
