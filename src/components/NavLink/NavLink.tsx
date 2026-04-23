import { forwardRef } from "react";
import { NavLink as BaseNavLink, NavLinkProps } from "react-router-dom";

interface BaseNavLinkProps extends Omit<NavLinkProps, "className" | "style"> {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  activeStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}

const NavLink = forwardRef<HTMLAnchorElement, BaseNavLinkProps>(
  ({ activeStyle, activeClassName = "active", ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [props.className, isActive ? activeClassName : null]
            .filter(Boolean)
            .join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null),
        })}
      />
    );
  },
);

export default NavLink;

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
