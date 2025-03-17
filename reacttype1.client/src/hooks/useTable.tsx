import { useState, useEffect } from "react";

function useTable<T>(data: T[], page: number, rowsPerPage: number) {
    const [tableRange, setTableRange] = useState<number[]>([]);
    const [slice, setSlice] = useState<T[]>([]);

    useEffect(() => {
        const range: number[] = calculateRange(data, rowsPerPage);
        setTableRange([...range]);

        const slice: T[] = sliceData(data, page, rowsPerPage);
        setSlice([...slice]);
    }, [data, setTableRange, page, setSlice, rowsPerPage]);

    return { slice,  tableRange };
};


const calculateRange = (data: T[], rowsPerPage: number): number[] => {
    const range: number[] = [];
    const num: number = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
};

const sliceData = (data: T[], page: number, rowsPerPage: number): T[] => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export default useTable;