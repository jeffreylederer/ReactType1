import { useState, useEffect } from "react";
import { UpdateFormData } from '@pages/Membership/UpdateFormData.tsx';

const useTable = (data: UpdateFormData[], page: number, rowsPerPage: number) => {
    const [tableRange, setTableRange] = useState<number[]>([]) ;
    const [slice, setSlice] = useState<UpdateFormData[]>([]);

    useEffect(() => {
        const range: number[] = calculateRange(data, rowsPerPage);
        setTableRange([...range]);

        const slice: UpdateFormData[] = sliceData(data, page, rowsPerPage);
        setSlice([...slice]);
    }, [data, setTableRange, page, setSlice, rowsPerPage]);

    return { slice, range: tableRange };
};


const calculateRange = (data: UpdateFormData[], rowsPerPage:number):number[] => {
    const range: number[] = [];
    const num:number = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
};

const sliceData = (data: UpdateFormData[], page: number, rowsPerPage: number): UpdateFormData[] => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export default useTable;