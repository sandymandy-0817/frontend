import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/create.css';

const CreateF = (props) => {
    const [form, setForm ] = useState({
        name:'',
        price:'',
        color:'',
        country:''
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
        axios.post('https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/fruits', form)
            .then(()=>{
                alert('상품이 등록 되었습니다');
                navigate('/fruits');
            })
            .catch(err=>console.log(err));
    }

    return (
        <div>
            <h2 style={{textAlign: 'center', fontSize: '24px', borderBottom: '2px solid #ccc', paddingBottom: '20px', width: '30%', margin: '0 auto', marginBottom: '40px'}}>Fruits 주문 내역 추가</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor='name'>과일명 : </label>
                    <input id='name' name='name' value={form.name} onChange={handleChange} required />
                </p>

                <p>
                    <label htmlFor='price'>가격 : </label>
                    <input type='number' id='price' name='price' value={form.price} onChange={handleChange} required/>
                </p>

                <p>
                    <label htmlFor='color'>색상 : </label>
                    <input id='color' name='color' value={form.color} onChange={handleChange} required />
                </p>

                <p>
                    <label htmlFor='country'>원산지 : </label>
                    <select id='country' name='country' value={form.country} onChange={handleChange} required>
                        <option value=''>원산지를 선택하세요</option>
                        <option value='대한민국'>대한민국</option>
                        <option value='필리핀'>필리핀</option>
                        <option value='중국'>중국</option>
                        <option value='미국'>미국</option>
                        <option value='일본'>일본</option>
                        <option value='말레이시아'>말레이시아</option>
                        <option value='베트남'>베트남</option>
                    </select>
                </p>
                <button type='submit'>신규 상품 등록하기</button>
            </form>
        </div>
    );
}

export default CreateF;