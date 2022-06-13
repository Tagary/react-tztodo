import axios from 'axios';
import React from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { ITable } from '../types/types';
import dataTodo from '../testingArray/db.json';

const TableComponet = () => {
  const tableInfo = dataTodo;
  const [value, setValue] = React.useState('');
  const [firstDropDown, setFirstDropDown] = React.useState<string>('Name');
  const [secondDropDown, setSecondDropDown] = React.useState<string>('Equals');
  const [dataSource, setDataSource] = React.useState(tableInfo);
  const [tableFilter, setTableFilter] = React.useState<ITable[] | any[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [todosPage] = React.useState<number>(5);
  const pageNumbers = [];
  const totalTodo = tableInfo.length;

  // PostgreSQL did't work
  // React.useEffect(() => {
  //   async function fetchTakeTodo() {
  //     try {
  //       const respons = await axios.get('');
  //       setDataSource(respons.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchTakeTodo();
  // });
  React.useEffect(() => {}, [tableInfo]);

  const indexLastTodo = currentPage * todosPage;
  const indexFirstTodo = indexLastTodo - todosPage;
  const currentTodo = dataSource.slice(indexFirstTodo, indexLastTodo);

  const handlerFirstDropDown = (e: { target: HTMLSelectElement }) => {
    setFirstDropDown(e.target.value);
  };

  const handleSecondDropDown = (e: { target: HTMLSelectElement }) => {
    setSecondDropDown(e.target.value);
  };
  for (let i = 1; i <= Math.ceil(totalTodo / todosPage); i++) {
    pageNumbers.push(i);
  }

  const handleFilterData = (e: { target: HTMLInputElement }) => {
    if (e.target.value != '') {
      setValue(e.target.value);
      if (secondDropDown == 'Equals') {
        switch (firstDropDown) {
          case 'Name':
            const filterName = tableInfo.filter((info) => info.name == String(e.target.value));

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
        for (let i = 1; i < Math.ceil(tableFilter.length / todosPage); i++) {
          pageNumbers.push(i + 1);
        }
      }
    } else {
      for (let i = 1; i < Math.ceil(tableFilter.length / todosPage); i++) {
        pageNumbers.push(i + 1);
      }
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
            : currentTodo.map((first) => (
                <tr key={first.id}>
                  <td>{first.data}</td>
                  <td>{first.name}</td>
                  <td>{first.amount}</td>
                  <td>{first.distance}</td>
                </tr>
              ))}
        </tbody>
      </Table>
      <div>
        <ul className="paginaton">
          {value.length > 0
            ? ''
            : pageNumbers.map((numPage) => (
                <li className="paginationLi" onClick={() => setCurrentPage(numPage)}>
                  {numPage}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default TableComponet;
