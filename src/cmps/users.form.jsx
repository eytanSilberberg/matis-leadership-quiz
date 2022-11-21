import React, { useRef } from "react";
import { makeDate } from "../services/basic/util.service"
import XIcon from './icons/xIcon'

export const UsersForm = ({ userInfo, isUserInfoOpen, onExitUsersForm }) => {
    let formattedDate
    if (!userInfo) formattedDate = null
    else formattedDate = makeDate(userInfo.dateFilled)


    return <div className={`users-info ${isUserInfoOpen ? 'open' : ''} `}>
        {userInfo && <>
            <button className='flex flex-center' onClick={() => onExitUsersForm(false)}><XIcon /></button>
            <h1>פרטי המשתמש</h1>
            <p className='user-info'>
                <span className='user-details'>שם: <span>{userInfo.name}</span></span>
                <span className='user-details'>מייל: <span>{userInfo.email}</span></span>
                <span className='user-details'>תאריך מילוי: <span>{formattedDate}</span></span>
            </p>
            <div className='scores-wrapper'>
                <h2>ניקוד</h2>
                <ul className='scores'>
                    <li><span>{userInfo.scores.responsibility}</span><span>אחריות</span></li>
                    <li><span> {userInfo.scores.selfAcceptance}</span><span>קבלה עצמית</span></li>
                    <li><span> {userInfo.scores.acceptanceOfOthers}</span><span>קבלת אחרים</span></li>
                    <li><span> {userInfo.scores.emotionalIndependency}</span><span>עצמאות רגשית</span></li>
                    <li><span>{userInfo.scores.creatibilityAndResilienceOfMind}</span><span>חוסן תודעתי</span></li>
                    <li><span>{userInfo.scores.creatibilityAndFocusOfConsciousness}</span><span>מיקוד תודעתי</span></li>
                    <li><span>{userInfo.scores.responsibility}</span><span>אינטרני</span></li>
                    <li><span>{userInfo.scores.responsibility}</span><span>אקסטרני</span></li>
                </ul>
            </div>
        </>}
    </div>
}