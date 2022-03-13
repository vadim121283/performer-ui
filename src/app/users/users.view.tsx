import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import React from 'react';
import { User } from '../../common/domain/entity/User';
import { UsersViewModel } from './users.view.model';

function createData(login: string, name: string, surname: string) {
  return { login, name, surname };
}

const rows = [
  createData('Frozen yoghurt', 'rrr', 'wwww'),
  createData('Ice cream sandwich', 'ccc', 'jjjj'),
];

export const UsersView = ({
  model,
}: {
  model: UsersViewModel;
}): JSX.Element => {
  const { users } = model;

  function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Login</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Surname</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.login}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.login}
                </TableCell>
                <TableCell align='right'>{row.name}</TableCell>
                <TableCell align='right'>{row.surname}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (users) {
    return (
      <>
        {users.map((user: User) => (
          <div key={user.guid}>
            <p>
              {user.login}: {user.guid}
            </p>
          </div>
        ))}
        <BasicTable />
      </>
    );
  } else {
    return <></>;
  }
};
