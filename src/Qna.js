import React, {useState} from 'react';
import axios from 'axios';

function Qna({ fetchQnaCount }) {
    const [formData, setFormData] = useState({
        name : '',
        tel : '',
        email : '',
        content : ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]:value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/qna', formData);
            alert('질문이 등록되었습니다');
            setFormData({name:'', tel: '', email: '', content: ''});
            if (fetchQnaCount) fetchQnaCount(); // 등록 성공 시 개수 갱신
        } catch {
            alert('오류가 발생되었습니다.');
        }
    }
    return (
        <section style={{width:'1224px', margin: '0 auto'}}>
            <h2 style={{textAlign:'center', fontSize:'36px', marginTop: '60px'}}>정성을 다해 답변을 해드리겠습니다</h2>
            <div style={{display:'flex'}}>
                <img src={`${process.env.PUBLIC_URL}/images/qna.jpg`} style={{width:'40%', height: '40vh'}}/>
                <form onSubmit={handleSubmit} style={{width: '50%'}}>
                    <p>
                        <label htmlFor="name">성함</label>
                        <input id='name' name='name' placeholder='성함을 입력해주세요' required onChange={handleChange} value={formData.name}/>
                    </p>
                    <p>
                        <label htmlFor="tel">전화번호</label>
                        <input id='tel' name='tel' placeholder='전화번호를 입력해주세요' required onChange={handleChange} value={formData.tel}/>
                    </p>
                    <p>
                        <label htmlFor="email">이메일</label>
                        <input  id='email' name='email' placeholder='이메일을 입력해주세요' required onChange={handleChange} value={formData.email}/>
                    </p>
                    <p>
                        <label htmlFor="content">내용</label>
                        <textarea name="content" id="content" cols='50' rows='10' placeholder='내용을 입력해주세요' required onChange={handleChange} value={formData.content}></textarea>
                    </p>
                    <p style={{marginLeft: '100px'}}>
                        <input type='checkbox' required id='agree' style={{width: '20px'}}/>
                        <label htmlFor="agree" style={{width: '45%'}}>개인정보처리방침에 동의합니다</label>
                    </p>
                    <button type='submit'>SEND</button>
                </form>
            </div>
            
        </section>
    );
}

export default Qna;