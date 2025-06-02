import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import {AlterContext, AlterProvider} from './AlterProvider';
import Main from './Main';
import Goods from './goods/Goods';
import Update from './goods/Update';
import Create from './goods/Create';
import Books from './books/Books';
import UpdateB from './books/UpdateB';
import CreateB from './books/CreateB';
import Fruits from './fruits/Fruits';
import UpdateF from './fruits/UpdateF';
import CreateF from './fruits/CreateF';
import Qna from './Qna';
import Login from './Login';
import Login2 from './Login2';
import Register from './Register';
import Register2 from './Register2';

function App() {
  const [qnaCount, setQnaCount] = useState(0);

  // 질문 개수 불러오는 함수
  const fetchQnaCount = useCallback(() => {
    fetch('http://localhost:9070/qna/count')
      .then(res => res.json())
      .then(data => setQnaCount(data.count))
      .catch(() => setQnaCount(0));
  }, []);

  useEffect(() => {
    fetchQnaCount();
  }, [fetchQnaCount]);

  // AlterProvider 내부에서만 useContext 사용!
  return (
    <AlterProvider>
      <BrowserRouter>
        <AppContent qnaCount={qnaCount} fetchQnaCount={fetchQnaCount} />
      </BrowserRouter>
    </AlterProvider>
  );
}

// AlterProvider 내부에서만 useContext 사용!
function AppContent({ qnaCount, fetchQnaCount }) {
  const {goodsCount, booksCount, fruitsCount} = React.useContext(AlterContext);

  return (
    <>
      <header>
        <h1>Frontend Setting - React + MySQL 메인페이지</h1>
        <nav>
          <Link to='/'>HOME</Link>&nbsp;&nbsp;
          <Link to='/goods'>Goods{goodsCount>0&&(<span style={{display:'inline-block', marginLeft: '6px', backgroundColor:'#f00', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', fontSize: '14px', textAlign: 'center', lineHeight: 'center', fontWeight: 'bold'}}>{goodsCount}</span>)}</Link>&nbsp;&nbsp;
          <Link to='/books'>Books{booksCount>0&&(<span style={{display:'inline-block', marginLeft: '6px', backgroundColor:'#f00', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', fontSize: '14px', textAlign: 'center', lineHeight: 'center', fontWeight: 'bold'}}>{booksCount}</span>)}</Link>&nbsp;&nbsp;
          <Link to='/fruits'>Fruits{fruitsCount>0&&(<span style={{display:'inline-block', marginLeft: '6px', backgroundColor:'#f00', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', fontSize: '14px', textAlign: 'center', lineHeight: 'center', fontWeight: 'bold'}}>{fruitsCount}</span>)}</Link>
          <Link to='/qna' style={{position: 'relative', display: 'inline-block', marginLeft: '10px'}}>
            Q&A
            {qnaCount > 0 && (
              <span style={{fontWeight:'bold', color:'#fff'}}>({qnaCount.toLocaleString()})</span>
            )}
          </Link>
          <Link to='/login'>LogIn</Link>
          <Link to='/login2'>LogIn2</Link>
          <Link to='/register2'>Register2</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/goods' element={<Goods />} />
          <Route path='/goods/update/:g_code' element={<Update />} />
          <Route path='/goods/create' element={<Create />} />
          <Route path='/books' element={<Books />} />
          <Route path='/books/update/:num' element={<UpdateB />} />
          <Route path='/books/create' element={<CreateB />} />
          <Route path='/fruits' element={<Fruits />} />
          <Route path='/fruits/create' element={<CreateF />} />
          <Route path='/fruits/update/:num' element={<UpdateF />} />
          <Route path='/qna' element={<Qna fetchQnaCount={fetchQnaCount} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login2' element={<Login2 />} />
          <Route path='/register' element={<Register />} />
          <Route path='/register2' element={<Register2 />} />
        </Routes>
      </main>
      <footer>
        <address>
          Copyright&copy;2025 Backend&Frontend allrights reserved.
        </address>
      </footer>
    </>
  );
}

export default App;