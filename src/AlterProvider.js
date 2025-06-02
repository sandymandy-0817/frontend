// AlterProvider.js
import React, { createContext, useState } from 'react';

export const AlterContext = createContext();

export function AlterProvider({ children }) {
    const [goodsCount, setGoodsCount] = useState(0);
    const [booksCount, setBooksCount] = useState(0);
    const [fruitsCount, setFruitsCount] = useState(0);
    return (
        <AlterContext.Provider value={{ goodsCount, setGoodsCount, booksCount, setBooksCount, fruitsCount, setFruitsCount }}>
        {children}
        </AlterContext.Provider>
    );
}