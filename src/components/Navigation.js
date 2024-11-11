import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ClockIcon } from '../assets/ic-clock.svg';
import { ReactComponent as AssignmentIcon } from '../assets/ic-assignment.svg';


function Navigation() {
    return (
        <div className="flex gap-6 justify-center pb-4">
            <NavLink to="/">
                {({ isActive }) => (
                    <ClockIcon className={isActive ? "text-onBackground fill-current" : "text-onSurface fill-current"} />
                )}
            </NavLink>
            <NavLink to="/assignment">
                {({ isActive }) => (
                    <AssignmentIcon className={isActive ? "text-onBackground fill-current" : "text-onSurface fill-current"} />
                )}
            </NavLink>
        </div>
    )
}

export default Navigation;