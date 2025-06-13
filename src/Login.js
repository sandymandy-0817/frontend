import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [login, setLogin ] = useState ({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLogin({...login, [e.target.name]:e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // console.log(login.id, login.password);
        try{
            const res = await axios.post('https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/login', login);
            localStorage.setItem('token', res.data.token); //사용자 인증이 끝나면 '토큰' 발급
            alert('로그인 성공');
            navigate('/');
            setLogin({username: '', password: ''});
        }catch(err) {
            setError('로그인 실패 : 아이디와 패스워드를 다시 확인하세요');
        }
    }
    return (
        <section>
            <h2 style={{fontSize: '30px'}}>로그인</h2>
            <form onSubmit={handleSubmit} style={{width: '500px', margin: '0 auto'}}>
                <p>
                    <label htmlFor="username">아이디 : </label>
                    <input id='username' name='username' value={login.username} required onChange={handleChange}/>
                </p>
                <p>
                    <label htmlFor="password">비밀번호 : </label>
                    <input type='password' id='password' name='password' value={login.password} required onChange={handleChange}/>
                </p>
                <p style={{width: '270px', margin: '0 auto'}}>
                    아이디 찾기 | 비밀번호 찾기 | 
                    <Link to='/register' style={{textDecoration:'none', color: '#000'}}>&nbsp;회원가입</Link>
                </p>
                <p>
                    <button type='submit' style={{backgroundColor: '#333', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', marginTop: '20px', fontSize: '20px', width: '400px', margin: '0 auto'}}>로그인</button>
                </p>
                {error&&<p style={{color:'#f00'}}>{error}</p>}

                <h3 style={{marginTop: '20px', borderBottom: 'none', width: '270px'}}>간편가입</h3>
                <ul style={{listStyle:'none', paddingLeft:'0px', width: '350px', textAlign:'center', margin: '0 auto'}}>
                    <li><img src={`${process.env.PUBLIC_URL}/images/kakao_login.png`} /></li>
                    <li><img src={`${process.env.PUBLIC_URL}/images/naver_login.png`} style={{width: '180px'}}/></li>
                    <li><img src={`${process.env.PUBLIC_URL}/images/google_login.png`} style={{width: '180px'}}/></li>
                </ul>
            </form>

            <dl style={{margin: '0 auto', width: '500px', marginTop: '20px'}}>
                <dt>로그인 구현 전체 구성</dt>
                <dd>프론트엔드(React) : 로그인 폼 작성, 인증 요청</dd>
                <dd>백엔드(Node.js + Express)</dd>
                <dd>데이터베이스 (MySQL) : DB입/출력</dd>
                <dd>비밀번호는 brcypt로 암호화, JWT로 인증을 유지</dd>
            </dl>
            <script src="https://accounts.google.com/gsi/client" async></script>
        </section>
    );
}

export default Login;