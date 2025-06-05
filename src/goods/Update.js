import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/update.css';

function Update(props) {
    const {g_code} = useParams();
    
    const [form, setForm] = useState({
        g_code:'',
        g_name:'',
        g_cost:''
    });

    const navigate = useNavigate();

    useEffect (()=> {
        axios.get(`https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/goods/${g_code}`)
        .then(res=> {
            console.log('서버 응답값 : ', res.data);
            setForm(res.data);
        })
        .catch(err=>console.log('조회 오류 : ',err));
    },[g_code]);

    const handleChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit=(e)=>{  
        e.preventDefault();
    
        axios.put(`https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/goods/goods/update/${g_code}`,{
          g_name:form.g_name, //상품명 저장
          g_cost:form.g_cost //상품가격 저장
        })
        .then(()=>{ //통신이 성공하면
            alert('상품정보가 수정 완료되었습니다.');
            navigate('/goods'); //goods페이지로 이동
        })//통신이 실패하면
        .catch(err=> console.log('수정 오류 : ',err));
    }

    return (
        <div>
            <h3>goods 상품 수정 페이지 입니다</h3>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor='g_code'>코드번호 : </label>
                    <input name='g_code' id='g_code' value={form.g_code} readOnly></input>
                </p>

                <p>
                    <label htmlFor='g_name'>상품명 : </label>
                    <input name='g_name' id='g_name' value={form.g_name} required onChange={handleChange}></input>
                </p>
                
                <p>
                    <label htmlFor='g_cost'>가격 정보 : </label>
                    <input name='g_cost' id='g_cost' type='number' value={form.g_cost} required onChange={handleChange}></input>
                </p>
                <button type='submit'>수정하기</button>
            </form>
        </div>
    );
}

export default Update;
