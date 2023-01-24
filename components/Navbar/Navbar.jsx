import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { magic } from "@/lib/magic-client";
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // fnx for handling dropdown
  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };


const [username, setUsername] = useState("");
  const router = useRouter();

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
     try {
  await magic.user.logout();

  console.log(await magic.user.isLoggedIn()); // => `false`
  router.push("/Login");
} catch(error) {
  console.log("logOut error occurred",error);
}
    
  };
 

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    }
    getUsername();
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width="128"
              height="34"
            />
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                width="24"
                height="24"
                alt="expand"
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link
                    href="/Login"
                    onClick={handleLogout}
                    className={styles.linkName}
                  >
                    Sign out
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
