import React from 'react';
import { observer } from 'mobx-react-lite';
import Boxx from './box';
import Link from 'next/link'

const Portal: React.FC = observer(() => {
    return (
        <div>
            <div className="w-screen flex justify-center">
                <Boxx name={"Logo"} />
            </div>
            <div className="flex justify-center mt-100px">
                <Link href="/schedule">
                    <div>
                        <Boxx name={"Schedule"} />
                    </div>
                </Link>
                <div className="ml-20px">
                    <Boxx name={"Order Food"} />
                </div>
            </div>
            <div className="flex justify-center mt-26px">
                <div>
                    <Boxx name={"Networking"} />
                </div>
                <div className="ml-20px">
                    <Boxx name={"Log out"} />
                </div>
            </div>

        </div>
    )
})
export default Portal;