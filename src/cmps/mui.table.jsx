import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { RowPreview } from './row.preview.jsx'

const categories = [' אחריות', 'קבלה עצמית', 'קבלת אחרים', 'עצמאות רגשית', 'חוסן תודעתי', 'מיקוד תודעתי', 'אינטרני', 'אקסטרני']
const cellStyling = { padding: { xs: 1, sm: 2, md: 2 }, minWidth: 30, fontSize: { xs: 13, sm: 14, md: 14 } }

export const MuiTable = ({ forms, windowSize, onViewUsersForm }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer dir='rtl' sx={{ maxHeight: 440, overflowX: 'hidden' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' sx={{ ...cellStyling, width: 'fit-content' }}>תאריך</TableCell>
                            <TableCell align='center' sx={{ ...cellStyling }} >שם</TableCell>
                            {windowSize !== 'sm' && <TableCell align='center' sx={{ ...cellStyling }}>אימייל</TableCell>}
                            {(windowSize === 'lg' || windowSize === 'xl') && <>
                                {categories.map((category, idx) => <React.Fragment key={idx}> <TableCell align='center' sx={{ ...cellStyling }}>{category}</TableCell></React.Fragment>)}
                            </>}
                            {(windowSize === 'sm' || windowSize === 'med') && <TableCell align='center' sx={{ ...cellStyling }}>נקודות</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {forms
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(form => {
                                return <RowPreview windowSize={windowSize} form={form} key={form._id} onViewUsersForm={onViewUsersForm} />
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage={''}
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={forms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ width: '100%' }}
            />
        </Paper >
    );
}
