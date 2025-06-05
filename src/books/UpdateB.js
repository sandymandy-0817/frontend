import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateB(props) {
    const {num} = useParams();
    
    const [form, setForm] = useState({
        num: '',
        name:'',
        area1:'',
        area2:'',
        area3:'',
        BOOK_CNT:'',
        owner_nm:'',
        tel_num:''
    });

    const navigate = useNavigate();

    useEffect (()=> {
        axios.get(`https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/goods/${num}`)
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
    
        axios.put(`https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/goods/books/update/${num}`,{
            name:form.name, 
            area1:form.area1,
            area2:form.area2, 
            area3:form.area3, 
            BOOK_CNT:form.BOOK_CNT, 
            owner_nm:form.owner_nm, 
            tel_num:form.tel_num 
        })
        .then(()=>{ //통신이 성공하면
            alert('주문내역이 수정 완료되었습니다.');
            navigate('/books'); //goods페이지로 이동
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
                    <label htmlFor='name'>서점명 : </label>
                    <select name='name' id='name' value={form.name} required onChange={handleChange}>
                        <option value='YES24'>YES24</option>
                        <option value='교보문고'>교보문고</option>
                        <option value='알라딘'>알라딘</option>
                        <option value='인터파크'>인터파크</option>
                        <option value='리브로'>리브로</option>
                        <option value='G마켓'>G마켓</option>
                        <option value='11번가'>11번가</option>
                    </select>
                </p>
                
                <p>
                    <label htmlFor='area1'>지역1 : </label>
                    <input name='area1' id='area1' value={form.area1} required onChange={handleChange}></input>
                </p>

                <p>
                    <label htmlFor='area2'>지역2 : </label>
                    <input name='area2' id='area2' value={form.area2} required onChange={handleChange}></input>
                </p>

                <p>
                    <label htmlFor='area3'>지역3 : </label>
                    <input name='area3' id='area3' value={form.area3} required onChange={handleChange}></input>
                </p>

                <p>
                    <label htmlFor='BOOK_CNT'>주문량 : </label>
                    <input name='BOOK_CNT' id='BOOK_CNT' type='number' value={form.BOOK_CNT} required onChange={handleChange}></input>
                </p>

                <p>
                    <label htmlFor='owner_nm'>주문자명 : </label>
                    <input name='owner_nm' id='owner_nm' value={form.owner_nm} required onChange={handleChange}></input>
                </p>

                <p>
                    <label htmlFor='tel_num'>전화번호 : </label>
                    <input name='tel_num' id='tel_num' value={form.tel_num} required onChange={handleChange}></input>
                </p>
                <button type='submit'>수정하기</button>
            </form>
        </div>
    );
}

export default UpdateB;
