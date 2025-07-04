import { forwardRef } from "react";
import { NavLink as BaseNavLink } from "react-router-dom";

const NavLink = forwardRef(({ activeStyle, activeClassName = "active", ...props }, ref) => {
    return (
        <BaseNavLink
            ref={ref}

            {...props}

            className={({ isActive }) => [
                props.className,
                isActive ? activeClassName : null
            ].filter(Boolean).join(' ')}

            style={({ isActive }) => ({
                ...props.style,
                ...(isActive ? activeStyle : null),
            })}
        />
    )
})

// const NavLink = ({ to, children, className, ...props }) => {
//     return (
//         <BaseNavLink
//             to={to}
//             className={({ isActive }) => `${className} ${isActive ? 'header__menu-item_active' : ''}`}
//             {...props}
//         >
//             {children}
//         </BaseNavLink>
//     );
// }

export default NavLink;