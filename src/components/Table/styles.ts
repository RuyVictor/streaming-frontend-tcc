import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
	text-align: center;
	vertical-align: middle;

  thead {
    background-color: #333;
    color: white;
  }

  th, td {
    border: 1px solid black;
    padding: 8px;
  }

  thead th {
    width: 25%;
  }

`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border-radius: 3px 3px 0 0;
  color: ${({ theme }) => theme.colors.white};

  th {
    text-align: center;
  }
`;