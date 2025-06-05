import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateF(props) {
        const {num} = useParams();
    
    const [form, setForm] = useState({
        num: '',
        name:'',
        price:'',
        color:'',
        country:''
    });

    const navigate = useNavigate();

    useEffect (()=> {
        axios.get(`https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/goods/fruits/${num}`)
        .then(res=> {
            console.log('서버 응답값 : ', res.data);
            setForm(res.data);
        })
        .catch(err=>console.log('조회 오류 : ',err));
    },[num]);

    const handleChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit=(e)=>{  
        e.preventDefault();
    
        axios.put(`https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/goods/fruits/update/${num}`,{
            name:form.name, 
            price:form.price,
            color:form.color, 
            country:form.country, 
        })
        .then(()=>{ //통신이 성공하면
            alert('상품 정보가 수정 완료되었습니다.');
            navigate('/fruits'); //goods페이지로 이동
        })//통신이 실패하면
        .catch(err=> console.log('수정 오류 : ',err));
    }

    return (
        <div>
            <h3>Books 주문 내역 수정 페이지 입니다</h3>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor='num'>Num : </label>
                    <input name='num' id='num' value={form.num} readOnly></input>
                </p>
                
                <p>
                    <label htmlFor='name'>과일명 : </label>
                    <input name='name' id='name' value={form.name} required onChange={handleChange}></input>
                </p>

                <p>
                    <label htmlFor='price'>가격 : </label>
                    <input type='number' name='price' id='price' value={form.price} required onChange={handleChange}></input>
                </p>

                <p>
                    <label htmlFor='color'>색상 : </label>
                    <input name='color' id='color' value={form.color} required onChange={handleChange}></input>
                </p>

                <p>
                    <label htmlFor='country'>원산지 : </label>
                    <input name='country' id='country' value={form.country} required onChange={handleChange}></input>
                </p>
                <button type='submit'>수정하기</button>
            </form>
        </div>
    );
}

export default UpdateF;
