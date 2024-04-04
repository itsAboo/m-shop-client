import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSignOut } from "../../hooks/user.hook";
import { useLocation, useNavigate } from "react-router-dom";

export default function MyAccountNavMobile() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleChange = (e: SelectChangeEvent) => {
    if (e.target.value === "signout") {
      return signOut();
    }
    navigate(e.target.value);
  };
  useEffect(() => {
    setValue(location.pathname);
  }, [location]);
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <FormControl size="small" fullWidth focused={false}>
      {innerWidth > 768 ? null : (
        <Select variant="filled" onChange={handleChange} value={value}>
          <MenuItem value={"/myaccount/profile"}>Personal Data</MenuItem>
          <MenuItem value={"/myaccount/order"}>Order History</MenuItem>
          <MenuItem value={"/wishlist"}>My favorite</MenuItem>
          <MenuItem value="signout">Sign out</MenuItem>
        </Select>
      )}
    </FormControl>
  );
}
