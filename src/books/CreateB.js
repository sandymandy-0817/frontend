import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/create.css';

function CreateB(props) {
    const [form, setForm ] = useState({
        name:'',
        area1:'',
        area2:'',
        area3:'',
        BOOK_CNT:'',
        owner_nm:'',
        tel_num:''
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
        axios.post('https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/goods/books', form)
            .then(()=>{
                alert('주문 내역이 등록 되었습니다');
                navigate('/books');
            })
            .catch(err=>console.log(err));
    }

    return (
        <div>
            <h2 style={{textAlign: 'center', fontSize: '24px', borderBottom: '2px solid #ccc', paddingBottom: '20px', width: '30%', margin: '0 auto', marginBottom: '40px'}}>Books 주문 내역 추가</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>서점명 : </label>
                    <select name='name' value={form.name} onChange={handleChange} required>
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
                    <label>지역1 : </label>
                    <input name='area1' value={form.area1} onChange={handleChange} required />
                </p>

                <p>
                    <label>지역2 : </label>
                    <input name='area2' value={form.area2} onChange={handleChange} required />
                </p>

                <p>
                    <label>지역3 : </label>
                    <input name='area3' value={form.area3} onChange={handleChange} required />
                </p>

                <p>
                    <label>주문량 : </label>
                    <input type='number' name='BOOK_CNT' value={form.BOOk_CNT} onChange={handleChange} required/>
                </p>

                <p>
                    <label>주문자명 : </label>
                    <input name='owner_nm' value={form.owner_nm} onChange={handleChange} required />
                </p>

                <p>
                    <label>전화번호 : </label>
                    <input name='tel_num' value={form.tel_num} onChange={handleChange} required />
                </p>
                <button type='submit'>신규 상품 등록하기</button>
            </form>
        </div>
    );
}

export default CreateB;
