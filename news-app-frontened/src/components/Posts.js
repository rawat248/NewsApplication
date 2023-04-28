import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
} from "@mui/material";
import { deleteUser } from "../Service/api";
// import {getDetails, deleteUser} from '../store/userSlice';
// import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 20px;
    background: #000000;
    color: #ffffff;
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 18px;
  }
`;
const LIMIT = 4;

const totalPagesCalculator = (total, limit) => {
  const pages = [];
  for (let x = 1; x <= parseInt(total) / limit; x++) {
    pages.push(x);
  }

  return pages;
};
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  // const dispatch = useDispatch();
  // const item = useSelector((state)=>state.app)
  // const {post} = item

  useEffect(() => {
    // dispatch(getDetails());
    getAllUsers();
  }, [activePage]);

  const deleteNews = async (id) => {
    await deleteUser(id);
    // dispatch(deleteUser(id))
    getAllUsers();
  };

  const getAllUsers = () =>
    axios
      .get("http://localhost:8080/post", {
        params: {
          page: activePage,
          size: LIMIT,
        },
      })
      .then(({ data }) => {
        setUsers(data.records);
        setTotalUsers(data.total);
      })
      .catch((error) => {
        console.log(error.response);
      });

  return (
    <div>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Actions</TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.title}</TableCell>

              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginBottom: 10 }}
                  component={Link}
                  to={`/edit-news/${user._id}`}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => deleteNews(user._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          ))}
        </TableBody>
      </StyledTable>
      <ul>
        {totalPagesCalculator(totalUsers, LIMIT).map((page) => (
          <li key={page}>
            <a href="#" onClick={() => setActivePage(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
