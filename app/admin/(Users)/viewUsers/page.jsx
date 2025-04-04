/** @format */

"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const data = [
  {
    id: "1",
    username: "superadmin",
    email: "superadmin@example.com",
    role: "SUPER_ADMIN",
  },
  {
    id: "2",
    username: "admin1",
    email: "admin1@example.com",
    role: "ADMIN",
  },
  {
    id: "3",
    username: "admin2",
    email: "admin2@example.com",
    role: "ADMIN",
  },
  {
    id: "4",
    username: "user1",
    email: "user1@example.com",
    role: "USER",
  },
  {
    id: "5",
    username: "akash",
    email: "user2@example.com",
    role: "USER",
  },
];

export default function ViewUsersPage() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterChange, setFilterChange] = useState("");
  const [addUserModal, setAddUserModal] = useState(false);

  const RoleSelect = ({ row }) => {
    const [role, setRole] = useState(row.getValue("role"));

    const handleChange = async (newRole) => {
      setRole(newRole);

      // Update the role in your backend or state management
      try {
        await axios.put(`/api/updateUserRole/${row.original.id}`, {
          role: newRole,
        });
      } catch (error) {
        console.error("Error updating role", error);
      }
    };

    return (
      <Select value={role} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Roles</SelectLabel>
            <SelectItem value="SUPER_ADMIN">SUPER_ADMIN</SelectItem>
            <SelectItem value="ADMIN">ADMIN</SelectItem>
            <SelectItem value="USER">USER</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "username",
      header: "User Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("username")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <RoleSelect row={row} />,
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const handleEdit = () => {
          // Add your edit logic here
        };

        const handleDelete = () => {
          // Add your delete logic here
        };

        return (
          <div className="flex gap-5 space-x-2">
            <button
              type="button"
              onClick={handleEdit}
              className="text-[#f76918] hover:text-black"
              aria-label="Edit"
            >
              <FaEdit />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-900"
              aria-label="Delete"
            >
              <FaTrashAlt />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: filterChange,
    },
    onGlobalFilterChange: setFilterChange,
  });

  const handleUserDialogClose = () => {
    setAddUserModal(false);
  };

  return (
    <>
      <Dialog open={addUserModal}>
        <DialogContent
          className="w-96 z-[100]"
          onClick={handleUserDialogClose}
          showCloseButton
        >
          <div>
            <h1>Create User</h1>
            <Input type="text" placeholder="Enter username" className="mt-4" />
            <Input
              type="text"
              placeholder="Enter user email address"
              className="mt-4"
            />
            <Input
              type="password"
              placeholder="Enter user password"
              className="mt-4"
            />
            <Select>
              <SelectTrigger className="w-full mt-4">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="SUPER_ADMIN">SUPER_ADMIN</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                  <SelectItem value="USER">USER</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="w-full my-3 flex justify-center items-center">
              <Button className=" disabled:bg-opacity-85">Create User</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="w-[70%] mx-auto py-10">
        <div className="flex items-center py-4 justify-between">
          <div className="search_filter flex gap-2">
            <Input
              placeholder="Search by emails or username or role"
              value={filterChange}
              onChange={(e) => setFilterChange(e.target.value)}
              className="max-w-md"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Filters <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="add_user">
            <button
              className="bg-[#f76918] text-white text-sm p-2 rounded-md"
              onClick={() => setAddUserModal(true)}
            >
              Add User
            </button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
