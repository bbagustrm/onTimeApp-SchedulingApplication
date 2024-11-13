import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ClockIcon } from '../assets/ic-clock.svg';
import { ReactComponent as AssignmentIcon } from '../assets/ic-assignment.svg';
import { ReactComponent as BookIcon } from '../assets/ic-book.svg';


function Navigation() {
    return (
        <div className="flex gap-6 justify-center">
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
            <NavLink to="/matakuliah">
                {({ isActive }) => (
                    <BookIcon className={isActive ? "text-onBackground fill-current" : "text-onSurface fill-current"} />
                )}
            </NavLink>
        </div>
    )
}

export default Navigation;