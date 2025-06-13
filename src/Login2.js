import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login2(props) {
    const [login2, setLogin2 ] = useState ({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLogin2({...login2, [e.target.name]:e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // console.log(login.id, login.password);
        try{
            const res = await axios.post('https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/login2', login2);
            localStorage.setItem('token', res.data.token); //사용자 인증이 끝나면 '토큰' 발급
            alert('로그인 성공');
            navigate('/');
            setLogin2({username: '', password: ''});
        }catch(err) {
            setError('로그인 실패 : 아이디와 패스워드를 다시 확인하세요');
        }
    }

    return (
        <section>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="username">아이디 : </label>
                    <input id='username' name='username' required value={login2.username} onChange={handleChange}/>
                </p>
                <p>
                    <label htmlFor="password">비밀번호 : </label>
                    <input id='password' type='password' name='password' required value={login2.password} onChange={handleChange}/>
                </p>
                <p style={{width: '270px', margin: '0 auto'}}>
                    아이디 찾기 | 비밀번호 찾기 | 
                    <Link to='/register2' style={{textDecoration:'none', color: '#000'}}>&nbsp;회원가입</Link>
                </p>
                <p>
                    <button type='submit' style={{backgroundColor: '#333', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', marginTop: '20px', fontSize: '20px', width: '400px', margin: '0 auto'}}>로그인</button>
                </p>
                {error&&<p style={{color:'#f00'}}>{error}</p>}
                <h3 style={{marginTop: '20px', borderBottom: 'none', width: '270px'}}>간편가입</h3>
                <ul style={{listStyle:'none', paddingLeft:'0px', textAlign: 'center'}}>
                    <li><img src={`${process.env.PUBLIC_URL}/images/kakao_login.png`} style={{width: '180px'}}/></li>
                    <li><img src={`${process.env.PUBLIC_URL}/images/naver_login.png`} style={{width: '180px'}}/></li>
                    <li><img src={`${process.env.PUBLIC_URL}/images/google_login.png`} style={{width: '180px'}}/></li>
                </ul>
            </form>
            <script src="https://accounts.google.com/gsi/client" async></script>
        </section>
    );
}

export default Login2;