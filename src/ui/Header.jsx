import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header>
      <Link to="/"><h1>Fast React Pizza Co.</h1></Link>
      <SearchOrder />
      <p>kamlesh</p>
    </header>
  );
}

export default Header;
