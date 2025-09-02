// components/Navbar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Book,
  BookOpen,
  ChevronRight,
  Compass,
  FileQuestion,
  History,
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  Search,
  Settings,
  TrendingUp,
  User2Icon,
  UserCircle,
  UserCircle2,
  UserPlus,
  X,
} from "lucide-react";
import { browses, subjects } from "@/constants/home";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubjectsExpanded, setIsSubjectsExpanded] = useState(false);
  const [isBrowseExpanded, setIsBrowseExpanded] = useState(false);

  const user = true;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubjects = () => {
    setIsSubjectsExpanded(!isSubjectsExpanded);
  };

  const toggleBrowse = () => {
    setIsBrowseExpanded(!isBrowseExpanded);
  };

  return (
    <nav className="bg-white p-2 shadow-xl border-b border-gray-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Section 1: Logo & Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image src="/logo.svg" alt="Logo" width={32} height={32} />
              </div>
              <span className="text-2xl font-bold hero-font bg-gradient-to-r from-[#12263A] to-[#037971] bg-clip-text text-transparent tracking-wide">
                Growth Tubes
              </span>
            </Link>
          </div>

          {/* Section 2: Navigation Links (Desktop) */}
          <div className="hidden lg:flex flex-grow justify-center">
            <ul className="flex space-x-8 items-center">
              <li>
                <Link
                  href="/"
                  className="text-gray-800 hover:text-blue-600 transition-all duration-200 font-medium relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>

              {/* Subjects Dropdown */}
              <li className="relative group">
                <span className="text-gray-700 hover:text-blue-600 transition-all duration-200 cursor-pointer font-medium flex items-center gap-1">
                  Subjects
                  <ChevronRight className="w-4 h-4 rotate-90 group-hover:rotate-180 transition-transform duration-200" />
                </span>
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-[600px] bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Explore Subjects
                      </h3>
                      <p className="text-sm text-gray-600">
                        Choose from our comprehensive range of academic subjects
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {subjects.map((subject) => {
                        const Icon = subject.icon;
                        return (
                          <Link
                            key={subject.name}
                            href={`/subjects/${subject.name
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="group/item p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 border border-transparent hover:border-blue-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover/item:from-blue-500 group-hover/item:to-purple-500 transition-all duration-200">
                                <Icon className="w-5 h-5 text-blue-600 group-hover/item:text-white transition-colors duration-200" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 group-hover/item:text-blue-700 transition-colors duration-200">
                                  {subject.name}
                                </h4>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                                  {subject.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link
                        href="/subjects"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        View All Subjects <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              {/* Browse Dropdown */}
              <li className="relative group">
                <span className="text-gray-700 hover:text-blue-600 transition-all duration-200 cursor-pointer font-medium flex items-center gap-1">
                  Browse
                  <ChevronRight className="w-4 h-4 rotate-90 group-hover:rotate-180 transition-transform duration-200" />
                </span>
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-[650px] bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Browse Learning Materials
                      </h3>
                      <p className="text-sm text-gray-600">
                        Discover various types of educational content
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {browses.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={`/browse/${item.name.toLowerCase()}`}
                            className="group/item p-3 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-200 border border-transparent hover:border-green-200"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center group-hover/item:from-green-500 group-hover/item:to-blue-500 transition-all duration-200">
                                <Icon className="w-5 h-5 text-green-600 group-hover/item:text-white transition-colors duration-200" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-900 group-hover/item:text-green-700 transition-colors duration-200">
                                    {item.name}
                                  </h4>
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium group-hover/item:bg-green-200 transition-colors duration-200">
                                    {item.count}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link
                        href="/browse"
                        className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200"
                      >
                        Explore All Content <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium relative group"
                >
                  Explore
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium relative group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Search and Buttons (Desktop) and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden xl:flex relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {user ? (
              <>
                <div className="hidden lg:flex items-center space-x-3">
                  <Link
                    href="/learnings"
                    className="px-5 py-2 text-sm font-bold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
                  >
                    <BookOpen size={16} />
                    My Learnings
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div>
                        <Avatar className="cursor-pointer">
                          <AvatarFallback>U</AvatarFallback>
                          <AvatarImage
                            src="/mike.jpg"
                            alt="user Image"
                            className="h-full w-full object-cover"
                          />
                        </Avatar>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-80 mt-2 p-4 text-gray-300"
                      align="end"
                      forceMount
                    >
                      {/* User Profile Section */}
                      <div className="flex flex-col items-center justify-center space-y-2 mb-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/mike.jpg" alt="@username" />
                          <AvatarFallback>
                            {/* {user.name.slice(0, 2)} */}C
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <p className="text-lg font-bold text-black">
                            {/* {user.name} */}
                            Sahil Sahu
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {/* {user.email} */}
                            sahilsahu123@gmail.com
                          </p>
                        </div>
                      </div>

                      <DropdownMenuSeparator />

                      {/* Menu Items with Icons */}
                      <DropdownMenuLabel className="sr-only">
                        Menu
                      </DropdownMenuLabel>
                      <div className="space-y-1 mt-2 p-1">
                        <Link href="/user/profile">
                          <DropdownMenuItem className="flex items-center space-x-2 p-2 text-black border-none hover:bg-blue-400 hover:text-black cursor-pointer rounded">
                            <UserCircle2 className="h-4 w-4" />
                            <span>Profile</span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="flex items-center space-x-2 p-2 text-black border-none hover:bg-blue-400 hover:text-black cursor-pointer rounded">
                          <Book className="h-4 w-4" />
                          <span>My Learning</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 p-2 text-black border-none hover:bg-blue-400 hover:text-black cursor-pointer rounded">
                          <FileQuestion className="h-4 w-4" />
                          <span>My Quizzes</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 p-2 text-black border-none hover:bg-blue-400 hover:text-black cursor-pointer rounded">
                          <History className="h-4 w-4" />
                          <span>History</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 p-2 text-black border-none hover:bg-blue-400 hover:text-black cursor-pointer rounded">
                          <UserPlus className="h-4 w-4" />
                          <span>Invite a friend</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 p-2 text-black border-none hover:bg-blue-400 hover:text-black cursor-pointer rounded">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </div>

                      <DropdownMenuSeparator />

                      {/* Logout Button */}
                      <DropdownMenuItem
                        className="flex items-center mt-5 space-x-2 p-2 bg-red-600 text-white hover:bg-red-700 cursor-pointer rounded justify-center"
                        onSelect={(event) => event.preventDefault()} // Prevents dropdown from closing on click
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <div className="hidden lg:flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <UserPlus size={16} />
                    Sign Up
                  </Link>
                </div>
              </>
            )}
            <div className="lg:hidden">
              <button
                onClick={toggleSidebar}
                className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2 rounded-lg transition-colors duration-200"
              >
                <Menu className="h-6 w-6 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white z-50 flex flex-col transition-transform duration-300 transform ease-in-out shadow-2xl ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center h-16 px-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            </div>
            <span className="text-2xl font-bold hero-font bg-gradient-to-r from-[#12263A] to-[#037971] bg-clip-text text-transparent tracking-wide">
              Growth Tubes
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-900 p-2 rounded-lg hover:bg-white/50 transition-all duration-200"
          >
            <X className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="flex-grow px-2 py-4 space-y-2 overflow-y-auto">
          <Link
            href="/"
            onClick={toggleSidebar}
            className="px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 flex items-center gap-3"
          >
            <Home size={18} /> Home
          </Link>

          <div>
            <button
              onClick={toggleSubjects}
              className="flex justify-between cursor-pointer items-center w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
            >
              <span className="flex items-center gap-3">
                <Book size={18} /> Subjects
              </span>
              <ChevronRight
                size={18}
                className={`transition-transform duration-200 ${
                  isSubjectsExpanded ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`pl-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                isSubjectsExpanded
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {subjects.map((subject) => {
                const Icon = subject.icon;
                return (
                  <Link
                    key={subject.name}
                    href={`/subjects/${subject.name
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    onClick={toggleSidebar}
                    className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 flex items-center gap-3"
                  >
                    <Icon size={16} />
                    {subject.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <button
              onClick={toggleBrowse}
              className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200"
            >
              <span className="flex items-center gap-3">
                <Compass size={18} /> Browse
              </span>
              <ChevronRight
                size={18}
                className={`transition-transform duration-200 ${
                  isBrowseExpanded ? "rotate-90" : ""
                }`}
              />
            </button>
            <div
              className={`pl-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                isBrowseExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {browses.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={`/browse/${item.name.toLowerCase()}`}
                    onClick={toggleSidebar}
                    className=" px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all duration-200 flex items-center gap-3"
                  >
                    <Icon size={16} />
                    <span className="flex-1">{item.name}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <Link
            href="/about"
            onClick={toggleSidebar}
            className=" px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 flex items-center gap-3"
          >
            <Info size={18} /> About
          </Link>
          <Link
            href="/explore"
            onClick={toggleSidebar}
            className=" px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 flex items-center gap-3"
          >
            <TrendingUp size={18} /> Explore
          </Link>
        </div>

        {/* Buttons Pinned to the Bottom */}
        {user ? (
          <>
            <div className="p-4 border-t border-gray-200 flex flex-col space-y-3 bg-gray-50">
              <Link
                href="/user"
                onClick={toggleSidebar}
                className="w-full text-center px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition-all duration-200 flex items-center gap-2 justify-center"
              >
                <UserCircle2 size={18} /> My Account
              </Link>
              <Button
                 variant={"destructive"}
                onClick={toggleSidebar}
                className="w-full text-center gap-4 px-4 py-3 text-sm font-medium hover:bg-red-500 transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                <LogOut size={18} /> Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 border-t border-gray-200 flex flex-col space-y-3 bg-gray-50">
              <Link
                href="/login"
                onClick={toggleSidebar}
                className="w-full text-center px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition-all duration-200 flex items-center gap-2 justify-center"
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                href="/signup"
                onClick={toggleSidebar}
                className="w-full text-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center gap-2 justify-center"
              >
                <UserPlus size={18} /> Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
