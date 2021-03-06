import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  nav: {
    display: "flex",
    justifyContent: "space-between",
    zIndex: '20'
  },
  navBar: {
    position: "fixed",
    boxShadow: "none",
    zIndex:'20'
  },
  cartContainer: {
    position: "fixed",
    zIndex: "50",
    top: "0",
    right: "0",
    width: "100vw",
    height: "100vh",
  },
  menu: {
    marginTop: '2em'
  }, 
  nested: {
    paddingLeft: '3em',
    '&:hover': {
      backgroundColor: '#e8e8e8'
    }
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'inherit'
  }
});
