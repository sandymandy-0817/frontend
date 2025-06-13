import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {AlterContext} from '../AlterProvider';

function Fruits(props) {
    const [item, setItem] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const {setFruitsCount} = useContext(AlterContext);

    const loadData = () => {
        axios
        .get('https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/fruits')
        .then(res=>{
            setItem(res.data)
            setFruitsCount(res.data.length);
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=> {
        loadData();
    },[]);

    const deleteData = (num) => {
        console.log('삭제할 num:', num);
        if(window.confirm('정말 삭제하시겠습니까?')) {
            axios
                .delete(`https://port-0-backend-mbha4admd1f88f85.sel4.cloudtype.app/fruits/${num}`)
                .then(() => {
                    alert('삭제되었습니다');
                    loadData();

                    if((currentPage -1)*itemsPerPage >= item.length -1 && currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }
                })
                .catch(err => console.log(err));
        }
    }

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = item.slice(indexOfFirst, indexOfLast);
    const totalPage = Math.ceil(item.length/itemsPerPage);
    let startPage = Math.max(1, currentPage-2);
    let lastPage = Math.min(totalPage, startPage+4);
    const pageNumber = Array.from({length:lastPage - startPage + 1},(_,i)=> startPage + i);

    return (
        <section>
            <h2>Fruits 데이터</h2>
            <div style={{height:'305px'}}>
                <table style={{width:'70%'}}>
                    <caption>Fruits Data</caption>
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Color</th>
                            <th>Country</th>
                            <th>삭제/수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(item=>(
                            <tr key={item.num}>
                                <td>{item.num}</td>
                                <td style={{width:'15%'}}>{item.name}</td>
                                <td>{Number(item.price).toLocaleString()}</td>
                                <td>{item.color}</td>
                                <td>{item.country}</td>
                                <td className='btn'>
                                    <button className='update' onClick={()=>navigate(`/fruits/update/${item.num}`)}>수정</button>
                                    <button className='delete' onClick={() => {deleteData(item.num)}}>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

            <p style={{textAlign:'right', width:'85%'}}>
                <button onClick={()=>navigate('./create')} className='create'>상품 등록</button>
            </p>

            <div style={{marginTop:'20px', textAlign:'center', width:'450px', margin:'0 auto'}}>
                {currentPage > 1 && (
                    <button onClick={()=>setCurrentPage(currentPage-1)} style={{marginRight: '5px',backgroundColor:'#333', color:'#fff', border:'1px solid #333', padding: '5px 10px', borderRadius: '4px'}}>이전</button>
                )}
                {pageNumber.map((number, i) => (
                    <button key={number} onClick={() => setCurrentPage(number)} style={{marginRight: '5px', backgroundColor: currentPage === number ? '#333' : '#f0f0f0', color: currentPage === number ? '#fff' : '#000', padding: '5px 10px', border: currentPage === number ? '1px solid #333':'1px solid #ccc', borderRadius: '4px'}}>{number}</button>
                ))}
                {currentPage < totalPage && (
                    <button onClick={()=>setCurrentPage(currentPage+1)} style={{marginRight: '5px',backgroundColor:'#333', color:'#fff', border:'1px solid #333', padding: '5px 10px', borderRadius: '4px'}}>다음</button>
                )}
            </div>
        </section>
    );
}

export default Fruits;