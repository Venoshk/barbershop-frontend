import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type LinkComponentProps = {
    children: ReactNode;
    rota: string;
}

export function LinkComponent({children, rota}:LinkComponentProps){
    return(
       <Link to={rota}>
        {children}
       </Link>
    );
}