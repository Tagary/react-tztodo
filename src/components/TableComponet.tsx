import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import { ITable } from '../types/types';

const TableComponet = () => {
  const tableInfo = [
    {
      id: 1,
      data: '21.01.1997',
      name: 'FirstName',
      amount: 27,
      distance: 1000,
    },
    {
      id: 2,
      data: '25.02.1997',
      name: 'SecondName',
      amount: 112,
      distance: 12,
    },
    {
      id: 3,
      data: '28.08.1997',
      name: 'ThirdName',
      amount: 27,
      distance: 32,
    },
    {
      id: 4,
      data: '21.10.1997',
      name: 'FourthName',
      amount: 76,
      distance: 38,
    },
    {
      id: 5,
      data: '21.11.1997',
      name: 'FivthName',
      amount: 44,
      distance: 258923,
    },
    {
      id: 6,
      data: '21.03.1997',
      name: 'SixName',
      amount: 54,
      distance: 3999,
    },
  ];

  const [value, setValue] = React.useState('');
  const [firstDropDown, setFirstDropDown] = React.useState<string>('Name');
  const [secondDropDown, setSecondDropDown] = React.useState<string>('Equals');
  const [dataSource, setDataSource] = React.useState(tableInfo);
  const [tableFilter, setTableFilter] = React.useState<ITable[] | any[]>([]);

  const handlerFirstDropDown = (e: { target: HTMLSelectElement }) => {
    setFirstDropDown(e.target.value);
  };

  const handleSecondDropDown = (e: { target: HTMLSelectElement }) => {
    setSecondDropDown(e.target.value);
  };

  const handleFilterData = (e: { target: HTMLInputElement }) => {
    if (e.target.value != '') {
      setValue(e.target.value);
      if (secondDropDown == 'Equals') {
        switch (firstDropDown) {
          case 'Name':
            const filterName = tableInfo.filter((info) => info.name == e.target.value);
            setTableFilter([...filterName]);
            break;
          case 'Amount':
            const filterAmount = tableInfo.filter((info) => info.amount == Number(e.target.value));
            setTableFilter([...filterAmount]);
            break;
          case 'Distance':
            const filterDistance = tableInfo.filter(
              (info) => info.distance == Number(e.target.value),
            );
            setTableFilter([...filterDistance]);
            break;

          default:
            break;
        }
      }
      if (secondDropDown == 'Contain') {
        switch (firstDropDown) {
          case 'Name':
            const filterName = tableInfo.filter((info) =>
              Object.keys(info).some(() =>
                info.name.toLowerCase().includes(e.target.value.toLowerCase()),
              ),
            );
            setTableFilter([...filterName]);
            break;
          case 'Amount':
            const filterAmount = tableInfo.filter((info) =>
              Object.keys(info).some(() =>
                String(info.amount).toLowerCase().includes(e.target.value.toLowerCase()),
              ),
            );
            setTableFilter([...filterAmount]);
            break;
          case 'Distance':
            const filterDistance = tableInfo.filter((info) =>
              Object.keys(info).some(() =>
                String(info.distance).toLowerCase().includes(e.target.value.toLowerCase()),
              ),
            );
            setTableFilter([...filterDistance]);
            break;

          default:
            break;
        }
      }
      if (secondDropDown == 'More') {
        switch (firstDropDown) {
          case 'Amount':
            const filterAmount = tableInfo.filter((info) => info.amount > Number(e.target.value));
            setTableFilter([...filterAmount]);
            break;
          case 'Distance':
            const filterDistance = tableInfo.filter(
              (info) => info.distance > Number(e.target.value),
            );
            setTableFilter([...filterDistance]);
            break;

          default:
            break;
        }
      }
      if (secondDropDown == 'Less') {
        switch (firstDropDown) {
          case 'Amount':
            const filterAmount = tableInfo.filter((info) => info.amount < Number(e.target.value));
            setTableFilter([...filterAmount]);
            break;
          case 'Distance':
            const filterDistance = tableInfo.filter(
              (info) => info.distance < Number(e.target.value),
            );
            setTableFilter([...filterDistance]);
            break;

          default:
            break;
        }
      }
    } else {
      setValue(e.target.value);
      setDataSource([...dataSource]);
    }
  };

  return (
    <div>
      <div className="search__input">
        <select name="" id="" value={firstDropDown} onChange={handlerFirstDropDown}>
          <option value="Name">Name</option>
          <option value="Amount">Amount</option>
          <option value="Distance">Distance</option>
        </select>
        <select name="" id="" value={secondDropDown} onChange={handleSecondDropDown}>
          <option value="Equals">Equals</option>
          <option value="Contain">Contain</option>
          {firstDropDown == 'Name' ? (
            <></>
          ) : (
            <>
              <option value="More">More</option>
              <option value="Less">Less</option>
            </>
          )}
        </select>
        <input type="text" value={value} onChange={handleFilterData} />
      </div>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Distanse</th>
          </tr>
        </thead>
        <tbody>
          {value.length > 0
            ? tableFilter.map((first) => (
                <tr key={first.id}>
                  <td>{first.data}</td>
                  <td>{first.name}</td>
                  <td>{first.amount}</td>
                  <td>{first.distance}</td>
                </tr>
              ))
            : dataSource.map((first) => (
                <tr key={first.id}>
                  <td>{first.data}</td>
                  <td>{first.name}</td>
                  <td>{first.amount}</td>
                  <td>{first.distance}</td>
                </tr>
              ))}
        </tbody>
      </Table>
      <div className="pagination"></div>
    </div>
  );
};

export default TableComponet;
