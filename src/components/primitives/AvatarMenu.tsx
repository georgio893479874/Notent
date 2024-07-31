import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { supabase } from '@/services/SupabaseClientService';
import { Link, useNavigate } from 'react-router-dom';
import { RiAccountCircleLine } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [firstName, setFirstName] = useState<string>('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (user) {
        setFirstName(user.user_metadata.first_name || '');
      } 
      
      else {
        setFirstName('');
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        navigate('/');
      }
    };
  
    checkAuth();
  }, [navigate]);  

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
      
      localStorage.removeItem("userLoggedIn");

      navigate("/signin");
    } 
    
    catch (error) {
      throw error;
    }
  };
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='fixed top-1 right-2'>
      <IconButton onClick={handleClick} size="small">
        <Avatar className="text-black dark:text-white" sx={{ fontSize: "26px" }}>
          {firstName[0]}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleClose} className="text-black dark:text-white gap-2">
          <RiAccountCircleLine className="w-5 h-5"/>
          <Link to="/profile" className="text-black dark:text-white">My account</Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className="text-black dark:text-white gap-2">
          <IoSettings className="w-5 h-5"/>
          <Link to="/settings" className="text-black dark:text-white">Settings</Link>
        </MenuItem>
        <MenuItem onClick={handleSignOut} className="text-black dark:text-white gap-2">
          <FiLogOut className='w-5 h-5'/>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AvatarMenu;


