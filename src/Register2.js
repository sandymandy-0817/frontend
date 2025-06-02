import React, {useState} from 'react';
import axios from 'axios';

function Login2(props) {
    const [register2, setRegister2] = useState({
        username: '',
        password: '',
        password2: '',
        tel: '',
        email: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setRegister2({...register2, [e.target.name]:e.target.value});
        setError('');
        setSuccess('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if(register2.password!==register2.password2) {
            setError('비밀번호가 일치하지 않습니다');
            return;
        } try {
            const res = await axios.post('http://localhost:9070/register2', {
                username: register2.username,
                password: register2.password,
                email: register2.email,
                tel: register2.tel
            });
            setSuccess('회원가입이 완료되었습니다!');
            setRegister2({username: '', password: '', password2: '', email: '', tel: ''});
        } catch {
            setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다.');
        }
    }

    return (
        <section>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="username" style={{width:'105px'}}>아이디 : </label>
                    <input id='username' name='username' required onChange={handleChange}/>
                </p>
                <p>
                    <label htmlFor="password" style={{width:'105px'}}>비밀번호 : </label>
                    <input type='password' id='password' name='password' required onChange={handleChange}/>
                </p>
                <p>
                    <label htmlFor="password2" style={{width:'105px'}}>비밀번호 확인 : </label>
                    <input type='password' id='password2' name='password2' required onChange={handleChange}/>
                </p>
                <p>
                    <label htmlFor="tel" style={{width:'105px'}}>연락처 : </label>
                    <input id='tel' name='tel' required onChange={handleChange}/>
                </p>
                <p>
                    <label htmlFor="email" style={{width:'105px'}}>이메일 : </label>
                    <input type='email' id='eamil' name='email' required onChange={handleChange}/>
                </p>
                <p>
                    <button type='submit' style={{backgroundColor: '#333', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', width: '100%', marginTop: '20px', fontSize: '20px'}}>회원가입</button>
                </p>
                {error&&<p style={{color:'#f00'}}>{error}</p>}
                {success&&<p style={{color:'green'}}>{success}</p>}
            </form>
            <ul>
                <li>로그인폼을 작성하고 '회원가입'클릭하면 회원가입 페이지로 이동</li>
                <li>회원가입시 username, password, tel, email을 입력후 할 수 있도록 함</li>
                <li>사용자가 username과 password를 입력하여 로그인 클릭시 인증 요청</li>
                <li>사용자가 입력한 id, pw를 post 방식으로 받아 db조회하여 일치하는지 여부에 따라 로그인 처리를 하고 JWT토큰을 발급</li>
                <li>비밀번호는 bcrypt로 암호화, JWT로 인증을 유지</li>
            </ul>
            <pre>
                CREATE TABLE users2 (
                    id int PRIMARY KEY AUTO_INCREMENT,
                    username varchar(100) UNIQUE NOT NULL,
                    password varchar(255) NOT NULL,
                    email varchar(255) NOT NULL,
                    tel varchar(255) NOT NULL,
                    datetime timestamp NOT NULL DEFAULT current_timestamp()
                );
            </pre>
        </section>
    );
}

export default Login2;