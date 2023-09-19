import { React, useContext ,useEffect ,useState } from "react";
import "./NavBar.css";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from "@mui/material/Badge";
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Logincontext } from "../context/Contextprovider";
import RightHeader from "../header1/Rightheader";
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import {getProducts} from "../redux/action/action"
import { useSelector, useDispatch } from "react-redux";

function Navigation() {
  const { account, setAccount } = useContext(Logincontext);
  const [dropen, setDropen] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState();
  const [liopen, setLiopen] = useState(true);
  const history = useNavigate("");

  const { products } = useSelector(state => state.getproductsdata);
  console.log(account+"nav bar hi");
  const getdetailsvaliduser = async () => {
    const res = await fetch("/validuser", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const data = await res.json();
     console.log(data +"navigation");

    if (res.status !== 201) {
        console.log("first login");
    } else {
        // console.log("cart add ho gya hain");
        setAccount(data);
    }
}



useEffect(() => {
  getdetailsvaliduser();
}, []);

    // for logout
    const logoutuser = async () => {
      const res2 = await fetch("/logout", {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          credentials: "include"
      });

      const data2 = await res2.json();
      // console.log(data2);

      if (!res2.status === 201) {
          const error = new Error(res2.error);
          throw error;
      } else {
        console.log("hey from right menu")
          setAccount(false);
          setOpen(false)
          toast.success("user Logout !", {
              position: "top-center"
          });
          history("/");
      }
  }

const handleClick = (event) => {
  setOpen(event.currentTarget);
};

const handelopen = () => {
  setDropen(true);
}
const handleClose = () => {
  setDropen(false);
};

const handleClosedr = () => {
  console.log('Closing drawer')
 setDropen(false)
}

const getText = (text) => {
  setText(text)
  setLiopen(false)
}
  return (
    <div className="header">
      <IconButton className="hamburgur" onClick={handelopen}>
        <MenuIcon style={{ color: "#fff" }} />
        <Drawer open={dropen} onClick={() => setDropen(false)} >
          <RightHeader  userlog={logoutuser} logClose={handleClosedr} />
        </Drawer>
      </IconButton>

      <NavLink to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </NavLink>

      <div className="header__search" >
        
        <input className="header__searchInput" type="text"   onChange={(e) => getText(e.target.value)} placeholder="search Items"/>
        <SearchIcon className="header__searchIcon" />

        
        
        {
                            text &&
                            <List className="extrasearch" hidden={liopen}>
                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }

      </div>

      <div className="header__nav">
        <div className="header__option">
          {
            account? <span className="header__optionLineOne">Hello {account.fname}</span>:<span className="header__optionLineOne">Hello Guest</span>
          }
          
          <span className="header__optionLineTwo">
            {account ? <NavLink logoutuser style={{ color: "white" }} to="/logout">
              Logout
            </NavLink> :<NavLink style={{ color: "white" }} to="/login">
              Sign in
            </NavLink>}
            
          </span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <div className="header__optionBasket">
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="secondary">
                  <i className="fas fa-shopping-cart" id="icon"></i>
                </Badge>
              </NavLink>
            )}
          </div>
          {account ? (
            <Avatar className="avatar2">
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avtar"></Avatar>
          )}

{ <div className="menu_div">
                        <Menu
                            anchorEl={open}
                            open={Boolean(open)}
                            onClose={handleClose}
                            
                        >
                            <MenuItem onClick={handleClose} style={{ margin: 10 }}>My account</MenuItem>
                            {account ? <MenuItem onClick={handleClose} style={{ margin: 10 }} ><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />   Logout</MenuItem> : ""}
                        </Menu>
                    </div> }
        </div>
      </div>
    </div>
  );
}

export default Navigation;
