import React from 'react'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Logincontext } from '../context/Contextprovider';
import { makeStyles } from '@material-ui/core';
import "./rightheader.css";
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const RightHeader = ({userlog}) => {

  const imgd = "/india.png"

  const { account, setAccount } = useContext(Logincontext);
  const [dropen, setDropen] = useState(false);
  return (
    <div className="rightheader">
    <div className="right_nav">
        {
            account ?
                <Avatar className="avtar2"
                     title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar> :
                <Avatar className="avtar"
             />
        }
        {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
    </div>
    <div className="nav_btn" onClick={() => setDropen(false)}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Shop By Category</NavLink>
        <Divider style={{ width: "100%", marginLeft: -20 }} />
      
        {
            account ? <NavLink to="/buynow">Your Order</NavLink> : <NavLink to="/login">Your Order</NavLink>
        }
        <Divider style={{ width: "100%", marginLeft: -20 }} />
        <div className="flag">
            <NavLink to="" style={{ marginTop: 14 }}>Settings</NavLink>
            <img src={imgd} alt="india flag" style={{ width: 35, marginLeft: 10 }} />
        </div>

        {
            account ?
                <div className="flag">
                    <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                    <h3 onClick={() => userlog()} style={{ cursor: "pointer", fontWeight: 500 }}> Log Out</h3>
                </div>
                : <NavLink to="/login">Sign in</NavLink>
        }


    </div>
</div>
  )
}

export default RightHeader;
