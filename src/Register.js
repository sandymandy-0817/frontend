import React, {useState} from 'react';
import axios from 'axios';

function Register(props) {
    const [signIn, setSignIn] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setSignIn({...signIn, [e.target.name]:e.target.value});
        setError('');
        setSuccess('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if(signIn.password!==signIn.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다');
            return;
        } try {
            const res = await axios.post('https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/register', {
                username: signIn.username,
                password: signIn.password
            });
            setSuccess('회원가입이 완료되었습니다!');
            setSignIn({username: '', password: '', confirmPassword: ''});
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
                    <input id='username' name='username'  placeholder='아이디' value={signIn.username} onChange={handleChange} required/>
                </p>
                <p>
                    <label htmlFor="password" style={{width:'105px'}}>비밀번호 : </label>
                    <input type='password' id='password' name='password' placeholder='비밀번호' value={signIn.password} onChange={handleChange} required />
                </p>
                <p>
                    <label htmlFor="confirmPassword" style={{width:'105px'}}>비밀번호 확인 : </label>
                    <input type='password' id='confirmPassword' name='confirmPassword' placeholder='비밀번호 확인' value={signIn.confirmPassword} onChange={handleChange} required />
                </p>
                <p>
                    <button type='submit' style={{backgroundColor: '#333', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', width: '100%', marginTop: '20px', fontSize: '20px'}}>회원가입</button>
                </p>
                {error&&<p style={{color:'#f00'}}>{error}</p>}
                {success&&<p style={{color:'green'}}>{success}</p>}
            </form>
        </section>
    );
}

export default Register;