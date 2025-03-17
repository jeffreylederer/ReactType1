import { useState } from "react";
import { UpdateFormData } from '@pages/Membership/UpdateFormData.tsx';
import { Link } from 'react-router-dom';
import useTable from '@hooks/useTable';
import styles from "../Table.module.css";
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
                        <th className={styles.tableHeader}>Short Name</th>
                        <th className={styles.tableHeader}>Nick Name</th>
                        <th className={styles.tableHeader}>Wheelchair</th>
                        <th hidden={allowed}></th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.id}>
                            <td className={styles.tableCell}>{el.fullName}</td>
                            <td className={styles.tableCell}>{el.shortname}</td>
                            <td className={styles.tableCell}>{el.nickName}</td>
                            <td className={styles.tableCell}>{el.wheelchair ? "yes" : "no"}</td>
                            <td hidden={allowed}><Link to="/Membership/Update" state={el.id.toString()}>Update</Link>|
                                <Link to="/Membership/Delete" state={el.id.toString()}>Delete</Link>
                            </td>
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