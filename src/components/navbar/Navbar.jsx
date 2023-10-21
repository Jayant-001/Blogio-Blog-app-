"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import ThemeToggle from "../common/ThemeToggle";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [searchText, setSearchText] = useState("");

    const { status } = useSession();

    const navLinks = [
        {
            name: "Blogs",
            url: "/blogs",
        },
        {
            name: "Trending",
            url: "/trending",
        },
        {
            name: "Top",
            url: "/bloggers",
        },
    ];
    const profileLinks = [
        {
            name: "Dashboard",
            url: "/dashboard",
        },
        {
            name: "Account",
            url: "/user",
        },
        {
            name: "Write",
            url: "/write",
        },
    ];

    const handleSearch = (e) => {
        e.preventDefault();

        alert("You searched for", searchText);
    };

    return (
        <nav
            className="navbar flex-no-wrap sticky top-0 z-10 flex w-full items-center justify-between border-b py-2 shadow-md shadow-black/5  dark:shadow-black/10 md:flex-wrap md:justify-start md:py-4"
            data-te-navbar-ref
        >
            <div className="flex w-full flex-wrap items-center justify-between">
                {/* <!-- Hamburger button for mobile view --> */}
                <button
                    className="block border-0 bg-transparent hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0  md:hidden"
                    type="button"
                    data-te-collapse-init
                    data-te-target="#navbarSupportedContent1"
                    aria-controls="navbarSupportedContent1"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setShowMenu((prev) => !prev)}
                >
                    {/* <!-- Hamburger icon --> */}
                    <span className="[&>svg]:w-7">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>

                {/* <!-- Collapsible navigation container --> */}
                <div
                    className={`!visible ${
                        showMenu ? "" : "hidden"
                    } flex-grow basis-[100%] items-center md:!flex md:basis-auto`}
                    id="navbarSupportedContent1"
                    data-te-collapse-item
                >
                    {/* <!-- Logo --> */}
                    <Link
                        className="mb-4 ml-2 mr-5 mt-3 flex items-center md:mb-0 md:mt-0"
                        href="/"
                        onClick={() => setShowMenu((prev) => !prev)}
                    >
                        <img
                            src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                            style={{ height: "15px" }}
                            alt="TE Logo"
                            loading="lazy"
                        />
                    </Link>
                    {/* <!-- Left navigation links --> */}
                    <ul
                        className="list-style-none mr-auto flex flex-col pl-0 md:flex-row"
                        data-te-navbar-nav-ref
                    >
                        {navLinks.map((link, id) => {
                            return (
                                <li
                                    key={id}
                                    className="mb-4 md:mb-0 md:pr-2"
                                    data-te-nav-item-ref
                                >
                                    {/* <!-- Dashboard link --> */}
                                    <Link
                                        className=" transition duration-200  hover:ease-in-out   motion-reduce:transition-none  md:px-2"
                                        href={link.url}
                                        data-te-nav-link-ref
                                        onClick={(e) =>
                                            setShowMenu((prev) => !prev)
                                        }
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="mr-[5%] hidden md:inline-block">
                    <div className="relative flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className="relative m-0 -mr-0.5 block w-48 lg:w-fit min-w-[50px] flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6]  outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:focus:border-primary"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon3"
                            value={searchText}
                            onChange={(e) =>
                                setSearchText((prev) => e.target.value)
                            }
                        />

                        {/* <!--Search button--> */}
                        <button
                            className="relative z-[2] rounded-r border-2 border-primary px-3 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                            type="button"
                            id="button-addon3"
                            data-te-ripple-init
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* <!-- Right elements --> */}
                <div className="relative flex items-center">
                    {/* Theme toggle button */}
                    <ThemeToggle />
                    {status === "authenticated" ? (
                        // {/*  <!-- Container with two dropdown menus --> */}

                        // {/*  <!-- Second dropdown container --> */}
                        <div className="relative" data-te-dropdown-ref>
                            {/* {/* <!-- Second dropdown trigger --> */}
                            <div
                                className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                                role="button"
                                data-te-dropdown-toggle-ref
                                aria-expanded="false"
                                onClick={(e) => setShowProfile((prev) => !prev)}
                            >
                                {/* <!-- User avatar --> */}
                                <img
                                    src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                                    className="rounded-full"
                                    style={{ height: "30px", width: "30px" }}
                                    alt=""
                                    loading="lazy"
                                />
                            </div>

                            {/* <!-- Second dropdown menu --> */}
                            <ul
                                className={`absolute left-auto right-0 z-[1000] float-left m-0 mt-1 ${
                                    showProfile ? "" : "hidden"
                                } min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block`}
                                aria-labelledby="dropdownMenuButton2"
                                data-te-dropdown-menu-ref
                            >
                                {/* {/* <!-- Second dropdown menu items --> */}

                                {profileLinks.map((link, id) => {
                                    return (
                                        <li
                                            key={id}
                                            onClick={(e) =>
                                                setShowProfile((prev) => !prev)
                                            }
                                        >
                                            <Link
                                                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal  hover:bg-neutral-100 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                                href={link.url}
                                                data-te-dropdown-item-ref
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                                <li>
                                    <p
                                        onClick={signOut}
                                        className="block w-full cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal  hover:bg-neutral-100 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                        data-te-dropdown-item-ref
                                    >
                                        Logout
                                    </p>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link
                            className="mr-2 px-2 py-1 border rounded shadow"
                            href="/login"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
