/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Header() {
  const {user, isSignedIn} = useUser()

  return (
    <div className="flex p-3 px-5 justify-between shadow-md">
      <Link to={"/"}>
        <img src='/logo.svg' alt='Logo' width={100} height={100} />
      </Link>

      {isSignedIn ? 
        <div className="flex gap-5 items-center">
          <Link to={'/dashboard'}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>  
        :
        <Link to={'/auth/sign-in'}>
          <Button>Get Started</Button>
         </Link>
      }   
    </div>
  )
}
