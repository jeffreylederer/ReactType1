import { useState } from "react";
import { UpdateFormData } from '@pages/League/Players/UpdateFormData.tsx';
import { Link } from 'react-router-dom';

import useTable from "./useTable";
import styles from "../Table.module.css";
import TableFooter from "./TableFooter";

//https://dev.to/franciscomendes10866/how-to-create-a-table-with-pagination-in-react-4lpd
const Table = ({ data, rowsPerPage, allowed} : TableType ) => {
    const [page, setPage] = useState<number>(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>Name</th>
                        <th hidden={allowed}></th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.id}>
                            <td className={styles.tableCell}>{el.fullName}</td>
                             <td> <Link to="/Players/Delete" state={el.id.toString()}>Delete</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
           <TableFooter range={range} setPage={setPage} page={page} slice={slice}   />
        </>
    );
}

interface TableType {
    data: UpdateFormData[],
    rowsPerPage: number,
    allowed: boolean
}



export default Table;