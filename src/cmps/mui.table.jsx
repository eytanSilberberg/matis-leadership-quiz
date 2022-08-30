import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { RowPreview } from './row.preview.jsx'




export const MuiTable = ({ forms, isWindowLarge }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    const cellStyling = { padding: { xs: 1, sm: 2, md: 2 }, minWidth: 30, fontSize: { xs: 11, sm: 14, md: 15 } }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer dir='rtl' sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' sx={{ ...cellStyling }} >שם</TableCell>
                            <TableCell align='center' sx={{ ...cellStyling }} >אימייל</TableCell>
                            {isWindowLarge && <React.Fragment>
                                <TableCell align='center' sx={{ ...cellStyling }} >אחריות</TableCell>
                                <TableCell align='center' sx={{ ...cellStyling }} >קבלה עצמית</TableCell>
                                <TableCell align='center' sx={{ ...cellStyling }} >קבלה של אחרים</TableCell>
                                <TableCell align='center' sx={{ ...cellStyling }} >עצמאות רגשית</TableCell>
                                <TableCell align='center' sx={{ ...cellStyling }} >חוסן תודעתי</TableCell>
                                <TableCell align='center' sx={{ ...cellStyling }} >מיקוד תודעתי</TableCell>
                            </React.Fragment>}
                            {!isWindowLarge && <TableCell align='center' sx={{ ...cellStyling }}>נקודות</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {forms
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(form => {
                                return <RowPreview isWindowLarge={isWindowLarge} form={form} key={form._id} />
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage={"מספר שורות בעמוד"}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={forms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ width: '100%' }}
            />
        </Paper>
    );
}
