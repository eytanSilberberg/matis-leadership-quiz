import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { makeDate } from "../services/basic/util.service";



const cellStyling = { padding: { xs: 1.5, sm: 2, md: 2, lg: 4 }, minWidth: 30, fontSize: { xs: 13, sm: 13, md: 14 }, textAlign: 'center' }
const rowStyling = { position: 'relative' }

export const RowPreview = ({ form, windowSize, onViewUsersForm }) => {
    const dateFormatted = makeDate(form.dateFilled)
    return (
        <TableRow sx={{ ...rowStyling }}>
            <TableCell sx={{ ...cellStyling }}>{dateFormatted}</TableCell>
            <TableCell sx={{ ...cellStyling }}>{form.name}</TableCell>
            {windowSize !== 'sm' && <TableCell sx={{ ...cellStyling }}>{form.email}</TableCell>}
            {(windowSize === 'lg' || windowSize === 'xl') && <React.Fragment>
                {Object.keys(form.scores).map((key, idx) => {
                    return <React.Fragment key={idx}><TableCell sx={{ ...cellStyling }}>{form.scores[key]}</TableCell></React.Fragment>
                })}
            </React.Fragment>}
            {(windowSize === 'sm' || windowSize === 'med') && <TableCell sx={{ ...cellStyling }}><button onClick={() => onViewUsersForm(form)}>הצג</button></TableCell>}

        </TableRow>
    )
}