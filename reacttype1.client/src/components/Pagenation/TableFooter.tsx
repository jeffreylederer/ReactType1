import React, { useEffect, SetStateAction } from "react";
import styles from "./TableFooter.module.css";

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

interface FooterType {
    range: [],
    setPage: React.Dispatch<SetStateAction<number>>,
    page: number,
    slice: []
}




export default TableFooter;