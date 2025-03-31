import React, { SetStateAction, useEffect } from "react";
import styles from "@styles/TableFooter.module.css";

function TableFooter<T>(range: number[], setPage: React.Dispatch<SetStateAction<number>>, page: number, slice: T[]): JSX.Element {
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
                    onClick={() => setPage(index + 1)}
                >
                    {el}
                </button>
            ))}
        </div>
   );
};







export default TableFooter;