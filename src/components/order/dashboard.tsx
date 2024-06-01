"use client";
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  TooltipProvider
} from "@/components/ui/tooltip"
import React, { useState } from "react"
import { StudentRecentOrdersList } from "../students/recent-orders-list";
import { useSession } from "next-auth/react";

function CustomDialog({ isOpen, onClose }) {
  const [showPDF, setShowPDF] = useState(false);

  const handlePDFPreview = () => {
    setShowPDF(true);
  };


  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-3/4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-3 text-black">Student Credentials</h2>
            <button onClick={onClose}>Close</button>
          </div>
          <div className="py-2 ">
            {isOpen && (
              <iframe
                src="https://taleemdostforum.com/Transcript.pdf"
                className="w-full h-96"
                title="PDF Preview"
              ></iframe>
            )}
          </div>
          <div className="flex justify-end mt-3">
            <Button className="px-4 py-2 bg-gray-700 text-white hover:bg-white hover:text-gray-700 border border-gray-600" onClick={() => { setShowPDF(false); onClose(); }}>Close</Button>
          </div>
        </div>
      </div>
    )
  );
}

export function OrderingDashboard() {
  const session = useSession()
  const credentialData = [
    {
      fileName: "Transcript.pdf",
      name: "John Smith",
      email: "john@smith.com",
      recipientUniversity: "Adword",
      status: 'Approved',
      submittionDate: "6-2-2022"
    },
    {
      fileName: "My Document.pdf",
      name: "Jane Doe",
      email: "jane@doe.com",
      recipientUniversity: "Bing",
      status: 'Pending',
      submittionDate: "7-5-2024"
    },
    {
      fileName: "Credential.pdf",
      name: "Michael Johnson",
      email: "michael@johnson.com",
      recipientUniversity: "Yahoo",
      status: 'Failed',
      submittionDate: "1-9-2021"
    },
    {
      fileName: "Data.pdf",
      name: "Emily Davis",
      email: "emily@davis.com",
      recipientUniversity: "Google",
      status: 'Approved',
      submittionDate: "8-3-2020"
    }
  ];

  const [showDialog, setShowDialog] = React.useState(false);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card
                  className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Introducing Our Dynamic Orders Dashboard for Seamless
                      Management and Insightful Analysis.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    {/* <Button>Create New Order</Button> */}
                    <Link href="/student/order">
                      <Button>Create New Order</Button>
                    </Link>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                  <CardHeader className="pb-2">
                    <CardDescription>This Week</CardDescription>
                    <CardTitle className="text-4xl">12</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      This is the reports within 1 week
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={25} aria-label="25% increase" />
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                  <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle className="text-4xl">$5,329</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      +10% from last month
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={12} aria-label="12% increase" />
                  </CardFooter>
                </Card>
              </div>
              <Tabs defaultValue="week">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    {/* <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger> */}
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Fulfilled
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Declined
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Refunded
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <File className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                  </div>
                </div>
                <TabsContent value="week">
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                      <CardTitle>Orders</CardTitle>
                      <CardDescription>
                        Recent orders from your store.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Institution</TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Type
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                              Status
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Date
                            </TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <StudentRecentOrdersList session={session}/>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              <div>

                <h2 className="text-3xl font-bold">My Credentials:</h2>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {credentialData.map((item, index) => (
                    <div key={index} className="border border-gray-600 bg-card rounded-md p-4 space-y-2">
                      <h3>{item.fileName}</h3>
                      <Separator className="bg-gray-700" />
                      <div className="flex space-x-2">
                        <h3 className="text-xs text-gray-400">Name:</h3>
                        <h3 className="text-xs">{item.name}</h3>
                      </div>
                      <div className="flex space-x-2">
                        <h3 className="text-xs text-gray-400">Recipient University:</h3>
                        <h3 className="text-xs">{item.recipientUniversity}</h3>
                      </div>
                      <div className="flex space-x-2">
                        <h3 className="text-xs text-gray-400">Submition Date:</h3>
                        <h3 className="text-xs">{item.submittionDate}</h3>
                      </div>
                      <div className="flex space-x-2">
                        <h3 className="text-xs text-gray-400">Status:</h3>
                        <h3 className="text-xs">{item.status}</h3>
                      </div>
                      <Separator className="bg-gray-700" />
                      <div className="text-right">
                        <button className="py-1 px-4 text-xs rounded-sm border border-gray-600 hover:text-black hover:bg-white transition-all text-gray-100" onClick={toggleDialog}>Preview</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Card
                className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
              >
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Order Oe31b70H
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy Order ID</span>
                      </Button>
                    </CardTitle>
                    <CardDescription>Date: November 23, 2023</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                        Track Order
                      </span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline" className="h-8 w-8">
                          <MoreVertical className="h-3.5 w-3.5" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Order Details</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Glimmer Lamps x <span>2</span>
                        </span>
                        <span>$250.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Aqua Filters x <span>1</span>
                        </span>
                        <span>$49.00</span>
                      </li>
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>$299.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>$5.00</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>$25.00</span>
                      </li>
                      <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Total</span>
                        <span>$329.00</span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                      <div className="font-semibold">Shipping Information</div>
                      <address className="grid gap-0.5 not-italic text-muted-foreground">
                        <span>Liam Johnson</span>
                        <span>1234 Main St.</span>
                        <span>Anytown, CA 12345</span>
                      </address>
                    </div>
                    <div className="grid auto-rows-max gap-3">
                      <div className="font-semibold">Billing Information</div>
                      <div className="text-muted-foreground">
                        Same as shipping address
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Customer Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Customer</dt>
                        <dd>Liam Johnson</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>
                          <a href="mailto:">liam@acme.com</a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Phone</dt>
                        <dd>
                          <a href="tel:">+1 234 567 890</a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Payment Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <CreditCard className="h-4 w-4" />
                          Visa
                        </dt>
                        <dd>**** **** **** 4532</dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                  </div>
                  <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <Button size="icon" variant="outline" className="h-6 w-6">
                          <ChevronLeft className="h-3.5 w-3.5" />
                          <span className="sr-only">Previous Order</span>
                        </Button>
                      </PaginationItem>
                      <PaginationItem>
                        <Button size="icon" variant="outline" className="h-6 w-6">
                          <ChevronRight className="h-3.5 w-3.5" />
                          <span className="sr-only">Next Order</span>
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
      <CustomDialog isOpen={showDialog} onClose={toggleDialog} />
    </TooltipProvider>
  )
}
