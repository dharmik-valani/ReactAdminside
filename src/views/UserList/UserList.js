import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import WithListLoading from './ListLoading';
import { UsersToolbar, UsersTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));



const UserList = () => {
  const ListLoading = WithListLoading(UsersTable);
  const [feedbacks,setFeedbacks] = useState({
    loading: false,
    repos: [],
  });



  const classes = useStyles();
 // Similar to componentDidMount and componentDidUpdate:
 useEffect(() => {
   setFeedbacks({ loading: true });
    console.log('UseEffect');
    axios.get('http://localhost:4000/feedbacks/')
    .then(response => {
      setFeedbacks({loading: false,repos:response.data});
      console.log(response.data);
    })
    .catch(function (error){
        console.log(error);
    })
    
  },[setFeedbacks]);

console.log("Feedback :"+ JSON.stringify(feedbacks.repos))
const [users] = useState(mockData);
  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
         <ListLoading isLoading={feedbacks.loading} users={feedbacks.repos} />  
      </div>
    </div>
  );
};

export default UserList;
