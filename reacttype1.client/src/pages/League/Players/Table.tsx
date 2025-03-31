import { useState } from "react";
import UpdateFormData from '@pages/League/Players/UpdateFormData.tsx';
import { Link } from 'react-router-dom';

import useTable from '@hooks/useTable';
import styles from "@styles/Table.module.css";
import TableFooter from "@components/TableFooter";

//https://dev.to/franciscomendes10866/how-to-create-a-table-with-pagination-in-react-4lpd
const Table = ({ data, rowsPerPage, allowed} : TableType ) => {
    const [page, setPage] = useState<number>(1);
    const { slice, tableRange } = useTable<UpdateFormData>(data, page, rowsPerPage);
    const Html: JSX.Element = TableFooter<UpdateFormData>(tableRange, setPage, page, slice);
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
                            <td> <Link to="/league/Players/Delete" state={el.id.toString()}>Delete</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {Html}
        </>
    );
}

interface TableType {
    data: UpdateFormData[],
    rowsPerPage: number,
    allowed: boolean
}



export default Table;