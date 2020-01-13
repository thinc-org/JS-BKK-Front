import React from 'react';
import { observer } from 'mobx-react-lite';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Link from 'next/link'
const Schedule: React.FC = observer(() => {
    const d = new Date();
    const task = [
        {
            hours: "08",
            minutes: "00",
            name: "Registration"
        },
        {
            hours: "09",
            minutes: "00",
            name: "Agenda A"
        },
        {
            hours: "10",
            minutes: "00",
            name: "Agenda B"
        },
        {
            hours: "11",
            minutes: "00",
            name: "Agenda C"
        },
    ]
    return (
        <div>
            <div className="flex ml-40px">
                <Link href="/portal">
                    <div className="mt-3">
                        <ArrowBackIcon />
                    </div>
                </Link>
                <div className="flex ml-5 text-4xl">
                    Schedule
                </div>
                <div className="ml-auto mr-40px text-4xl">
                    {d.getHours()}:{d.getMinutes()}
                </div>


            </div>

        </div>
    )
})
export default Schedule; 