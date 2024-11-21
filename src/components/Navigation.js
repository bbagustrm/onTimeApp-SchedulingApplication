import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ClockIcon } from '../assets/ic-clock.svg';
import { ReactComponent as AssignmentIcon } from '../assets/ic-assignment.svg';
import { ReactComponent as BookIcon } from '../assets/ic-book.svg';
import { ReactComponent as UserIcon } from '../assets/ic-user.svg'; // Ikon untuk Profil

function Navigation() {
    return (
        <nav className="sticky top-0 py-6 bg-background z-10">
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
                <NavLink to="/profile">
                    {({ isActive }) => (
                        <UserIcon className={isActive ? "text-onBackground fill-current" : "text-onSurface fill-current"} />
                    )}
                </NavLink>
            </div>
        </nav>
    );
}

export default Navigation;
