import React from 'react';
import { Menu } from './entities';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

interface Props {
    menus: Menu[];
}

function MenuList(props: Props) {
    const handleClick = (event: React.MouseEvent, menu: Menu) => {
        alert(menu.Id);
    };

    return (
        <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Meal</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.menus.map(row => (
              <TableRow 
                hover
                key={row.Id}
                onClick={event => handleClick(event, row)}>
                <TableCell component="th" scope="row">
                  {row.MenuName}
                </TableCell>
                <TableCell>{row.Meal}</TableCell>
                <TableCell>{row.Start.toDateString()}</TableCell>
                <TableCell>{row.End.toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
}

export default MenuList;
