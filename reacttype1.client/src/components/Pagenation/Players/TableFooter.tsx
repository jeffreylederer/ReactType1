import React, { useEffect, SetStateAction } from "react";
import styles from "../TableFooter.module.css";
import { UpdateFormData } from '@pages/League/Players/UpdateFormData.tsx';

const TableFooter = ({ range, setPage, page, slice }: FooterType ) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);
    return (
        <div className={styles.tableFooter}>
            {range.map((el, index) => (
                <button
                    key={index}
                    className={`${styles.button} ${page === el ? styles.activeButton : styles.inactiveButton}`}
                    onClick={() => setPage(index+1)}
                >
                    {el}
                </button>
            ))}
        </div>
    );
};

type FooterType = {
    range: number[],
    setPage: React.Dispatch<SetStateAction<number>>,
    page: number,
    slice: UpdateFormData[]
}




export default TableFooter;