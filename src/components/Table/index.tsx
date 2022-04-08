import { FC, ReactNode, useMemo } from 'react';
import { Container, TableHead } from './styles';

interface TableProps {
    columns: string[];
    children?: ReactNode;
}

const Table: FC<TableProps> = ({columns, children}: TableProps) => {

    const TableColumns = useMemo(
        () => columns.map((name) => <th key={name}>{name}</th>),
        [columns],
    );

    return (
        <Container>
            <TableHead>
            <tr>{TableColumns}</tr>
            </TableHead>
            {children}
        </Container>
    );
};

export default Table;