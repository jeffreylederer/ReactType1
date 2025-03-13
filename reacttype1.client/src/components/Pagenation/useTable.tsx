import { useState, useEffect } from "react";

const useTable = ( data: [], page: number, rowsPerPage: number) => {
    const [tableRange, setTableRange] = useState<number[]>([]) ;
    const [slice, setSlice] = useState<[]>([]);

    useEffect(() => {
        const range: number[] = calculateRange(data, rowsPerPage);
        setTableRange([...range]);

        const slice: [] = sliceData(data, page, rowsPerPage);
        setSlice([...slice]);
    }, [data, setTableRange, page, setSlice, rowsPerPage]);

    return { slice, range: tableRange };
};


const calculateRange = (data:[], rowsPerPage:number):number[] => {
    const range: number[] = [];
    const num:number = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
};

const sliceData = (data:[], page: number, rowsPerPage: number): [] => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export default useTable;