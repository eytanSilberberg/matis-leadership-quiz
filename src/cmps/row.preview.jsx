import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useState } from "react";




export const RowPreview = ({ form, isWindowLarge }) => {

    const [isScoresOpen, setIsScoresOpen] = useState(false)

    const onToggleScores = (boolean) => {
        setIsScoresOpen(boolean)
    }

    const cellStyling = { padding: { xs: 1.5, sm: 2, md: 2, lg: 4 }, minWidth: 30, fontSize: { xs: 11, sm: 13, md: 15 }, textAlign: 'center' }
    const rowStyling = { position: 'relative' }
    return <TableRow sx={{ ...rowStyling }}>
        <TableCell sx={{ ...cellStyling }}>{form.name}</TableCell>
        <TableCell sx={{ ...cellStyling }}>{form.email}</TableCell>
        {isWindowLarge && <React.Fragment>
            <TableCell sx={{ ...cellStyling }}>{form.scores.responsibility}</TableCell>
            <TableCell sx={{ ...cellStyling }}>{form.scores.selfAcceptance}</TableCell>
            <TableCell sx={{ ...cellStyling }}>{form.scores.acceptanceOfOthers}</TableCell>
            <TableCell sx={{ ...cellStyling }}>{form.scores.emotionalIndependency}</TableCell>
            <TableCell sx={{ ...cellStyling }}>{form.scores.creatibilityAndResilienceOfMind}</TableCell>
            <TableCell sx={{ ...cellStyling }}>{form.scores.creatibilityAndFocusOfConsciousness}</TableCell>
        </React.Fragment>}
        {!isWindowLarge && <TableCell sx={{ ...cellStyling }}><button onClick={() => onToggleScores(true)}>הצג</button></TableCell>}
        {!isWindowLarge && <div className={`scores-wrapper ${isScoresOpen ? 'open' : 'closed'}`}>
            <button onClick={() => onToggleScores(false)}>X</button>
            <div className='scores-container'>

                <div><span>{form.scores.responsibility}</span><strong><span>אחריות</span></strong></div>
                <div><span>{form.scores.selfAcceptance}</span><strong><span>קבלה עצמית</span></strong></div>
                <div><span>{form.scores.acceptanceOfOthers}</span><strong><span>קבלה של אחרים</span></strong></div>
                <div><span>{form.scores.emotionalIndependency}</span><strong><span>עצמאות רגשית</span></strong></div>
                <div><span>{form.scores.creatibilityAndResilienceOfMind}</span><strong><span>חוסן תודעתי</span></strong></div>
                <div><span>{form.scores.creatibilityAndFocusOfConsciousness}</span><strong><span>מיקוד תודעתי</span></strong></div>
            </div>

        </div>}
    </TableRow>
}